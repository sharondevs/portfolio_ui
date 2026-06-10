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
const API_BASE_URL = import.meta.env.VITE_ECHO_CHAT_API || 'http://localhost:8000'

// ECHO-SRE agentic incident-investigation service (same SSE contract, separate host).
const SRE_API_BASE_URL = import.meta.env.VITE_ECHO_SRE_API || 'http://localhost:8000'



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

// ECHO-SRE per-request configuration (how the agent sources telemetry).
export interface SREConfig {
  sre_mode: 'demo' | 'custom' | 'live'
  scenario?: unknown            // custom synthetic incident (JSON)
  prometheus_url?: string       // live backend
  loki_url?: string
  alertmanager_url?: string
}

export const streamChat = async (
  message: string,
  mode: 'resume' | 'documents' | 'sre',
  sessionId: string | null,
  onChunk: (chunk: StreamChunk) => void,
  sreConfig?: SREConfig
): Promise<void> => {
  const requestBody: Record<string, unknown> = {
    message,
    mode,
    session_id: sessionId,
  }

  // SRE mode streams from the ECHO-SRE agentic service; other modes use ECHO chat.
  const baseUrl = mode === 'sre' ? SRE_API_BASE_URL : API_BASE_URL
  if (mode === 'sre' && sreConfig) {
    Object.assign(requestBody, sreConfig)
  }

  try {
    const response = await fetch(`${baseUrl}/stream-chat`, {
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