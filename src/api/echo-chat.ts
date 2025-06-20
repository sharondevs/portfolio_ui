/**
 * Echo Chat API Integration
 * 
 * This module handles communication with the Echo Chat backend API.
 * 
 * Features:
 * 1. Resume mode - Ask questions about Sharon's engineering background
 * 2. Documents mode - Upload and query custom documents
 * 3. Real-time streaming responses
 * 4. File upload support (PDF, TXT, DOCX)
 */

import axios from 'axios'

export interface DocumentUploadResponse {
  message: string
  file_count: number
  session_id: string
}

export interface StreamChunk {
  text?: string
  sources?: string[]
  metadata?: {
    session_id: string
    query_type: string
    model_used: string
  }
  error?: string
}

// Use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_ECHO_CHAT_API



const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

export const uploadDocuments = async (
  files: File[], 
  sessionId: string | null = null
): Promise<DocumentUploadResponse> => {
  const formData = new FormData()
  
  files.forEach(file => {
    formData.append('files', file)
  })
  
  if (sessionId) {
    formData.append('session_id', sessionId)
  }

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const streamChat = async (
  message: string,
  mode: 'resume' | 'documents',
  sessionId: string | null,
  onChunk: (chunk: StreamChunk) => void
): Promise<void> => {
  const requestBody = {
    message,
    mode,
    session_id: sessionId,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/stream-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('Failed to get response reader')
    }

    const decoder = new TextDecoder()
    
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break
      
      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            onChunk(data)
          } catch (error) {
            console.error('Error parsing SSE data:', error)
          }
        }
      }
    }
  } catch (error) {
    console.error('Stream chat error:', error)
    throw error
  }
}

export const cleanupSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/session/${sessionId}`)
}

export const getSessionInfo = async (sessionId: string) => {
  const response = await api.get(`/session/${sessionId}`)
  return response.data
}

export const healthCheck = async () => {
  const response = await api.get('/')
  return response.data
} 