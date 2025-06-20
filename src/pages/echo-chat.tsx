import React, { useState, useRef, useEffect } from 'react'
import { 
  Box,
  Button,
  Container,
  Flex,
  Text,
  Textarea,
  VStack,
  HStack,
  Avatar,
  IconButton,
  useColorModeValue,
  Alert,
  AlertIcon,
  Badge,
  Spinner,
  useToast,
  Heading,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@chakra-ui/react'
import { Upload, Send, MessageCircle, FileText, User, Bot, AlertCircle, X, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { uploadDocuments, streamChat, cleanupSession } from '../api/echo-chat'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  sources?: string[]
  timestamp: Date
}

type QueryMode = 'resume' | 'documents'

function EchoChatApp() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<QueryMode>('resume')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const toast = useToast()

  // Theme colors
  const bgColor = useColorModeValue('terminal.bg', 'terminal.bg')
  const cardBg = useColorModeValue('terminal.cardBg', 'terminal.cardBg')
  const textColor = useColorModeValue('terminal.text', 'terminal.text')
  const accentColor = useColorModeValue('terminal.accent', 'terminal.accent')
  const borderColor = useColorModeValue('terminal.muted', 'terminal.muted')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleModeChange = async (newMode: QueryMode) => {
    if (newMode !== mode) {
      // Cleanup previous session if switching from documents mode
      if (mode === 'documents' && sessionId) {
        try {
          await cleanupSession(sessionId)
        } catch (error) {
          console.error('Error cleaning up session:', error)
        }
      }
      
      setMode(newMode)
      setMessages([])
      setUploadedFiles([])
      setSessionId(null)
      setError(null)
    }
  }

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return

    setError(null)
    setIsLoading(true)

    try {
      // Cleanup previous session before uploading new files
      if (sessionId) {
        await cleanupSession(sessionId)
      }

      const response = await uploadDocuments(files, sessionId)
      setSessionId(response.session_id)
      setUploadedFiles(files)
      setMessages([])
      
      toast({
        title: 'Documents uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload documents'
      setError(errorMessage)
      toast({
        title: 'Upload failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFileUpload(files)
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    if (newFiles.length === 0) {
      setSessionId(null)
      setMessages([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    // Check if documents mode requires uploaded files
    if (mode === 'documents' && uploadedFiles.length === 0) {
      setError('Please upload documents before asking questions in Documents mode.')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setError(null)

    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      type: 'assistant',
      content: 'processing...',
      sources: [],
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])

    // Use regular variables to accumulate content and sources
    let accumulatedContent = ''
    let accumulatedSources: string[] = []
    let hasReceivedContent = false
    
    // Debounced update function to batch rapid updates
    let updateTimeout: number | null = null
    const updateMessage = () => {
      console.log('Updating UI with content length:', accumulatedContent.length)
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { 
              ...msg, 
              content: accumulatedContent,
              sources: accumulatedSources
            }
          : msg
      ))
    }

    try {
      await streamChat(
        userMessage.content,
        mode,
        sessionId,
        (chunk) => {
          console.log('Received streaming chunk:', chunk)
          
          if (chunk.error) {
            console.error('Error in streaming chunk:', chunk.error)
            setError(chunk.error)
            return
          }

          // Accumulate content to avoid race conditions
          if (chunk.text) {
            // On first content, replace the "processing..." text
            if (!hasReceivedContent) {
              accumulatedContent = chunk.text
              hasReceivedContent = true
            } else {
              accumulatedContent += chunk.text
            }
            console.log('Accumulated content length:', accumulatedContent.length)
            console.log('Latest chunk text:', chunk.text)
          }
          
          // Update sources if provided
          if (chunk.sources && chunk.sources.length > 0) {
            accumulatedSources = chunk.sources
            console.log('Updated sources:', chunk.sources)
          }

          // Debounce updates to avoid too frequent re-renders
          if (updateTimeout) {
            clearTimeout(updateTimeout)
          }
          
          updateTimeout = window.setTimeout(updateMessage, 100) // Update every 100ms max
        }
      )
      
      // Final update to ensure we get the last chunk
      if (updateTimeout) {
        clearTimeout(updateTimeout)
      }
      console.log('Streaming completed. Final accumulated content:', accumulatedContent)
      console.log('Final sources:', accumulatedSources)
      updateMessage()
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      setError(errorMessage)
      toast({
        title: 'Chat error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const getWelcomeMessage = () => {
    if (mode === 'resume') {
      return "Hi! I am ECHO! I'm ready to answer any questions about Sharon's engineering journey. Ask away!"
    } else {
      return "Welcome to Documents mode! Please upload your documents and I'll be ready to answer questions about their content."
    }
  }

  const canChat = mode === 'resume' || (mode === 'documents' && uploadedFiles.length > 0)

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      {/* Header matching main portfolio style */}
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="80px"
        zIndex={1000}
                  bg="terminal.bg"
      >
        <Container maxW={{ base: "90%", md: "85%", lg: "85%" }} h="100%" py={4}>
          <Flex
            flexDir="row"
            alignItems="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
            pb={4}
            h="100%"
          >
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowLeft size={20} />}
                aria-label="Back to portfolio"
                variant="ghost"
                color={accentColor}
                size="sm"
                borderRadius="lg"
                border="1px solid"
                borderColor={accentColor}
                _hover={{ 
                  bg: 'terminal.success', 
                  color: 'terminal.bg',
                  transform: 'translateX(-2px)'
                }}
                transition="all 0.2s"
                onClick={() => navigate('/')}
              />
              <Text
                fontSize="lg"
                fontFamily="mono"
                bgGradient="linear(to-r, terminal.accent, terminal.success)"
                bgClip="text"
                fontWeight="bold"
              >
                sharon@echo-chat:~$
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Button
                variant={mode === 'resume' ? 'solid' : 'outline'}
                size="sm"
                leftIcon={<User size={16} />}
                onClick={() => handleModeChange('resume')}
                bg={mode === 'resume' ? accentColor : 'transparent'}
                borderColor={accentColor}
                borderRadius="lg"
                color={mode === 'resume' ? 'terminal.bg' : accentColor}
                _hover={{
                  bg: mode === 'resume' ? accentColor : 'terminal.secondary',
                }}
                fontFamily="mono"
                fontSize="sm"
              >
                resume
              </Button>
              <Button
                variant={mode === 'documents' ? 'solid' : 'outline'}
                size="sm"
                leftIcon={<FileText size={16} />}
                onClick={() => handleModeChange('documents')}
                bg={mode === 'documents' ? accentColor : 'transparent'}
                borderColor={accentColor}
                borderRadius="lg"
                color={mode === 'documents' ? 'terminal.bg' : accentColor}
                _hover={{
                  bg: mode === 'documents' ? accentColor : 'terminal.secondary',
                }}
                fontFamily="mono"
                fontSize="sm"
              >
                documents
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW={{ base: "90%", md: "85%", lg: "85%" }} pt="100px" pb={4}>
        <Flex direction="column" h="calc(100vh - 120px)" borderRadius="xl" overflow="hidden" boxShadow="0 4px 20px rgba(0,0,0,0.1)">
          {/* Main Content Container */}


          {/* File Upload Area (Documents Mode) */}
          {mode === 'documents' && (
            <Box 
              bg={cardBg} 
              borderBottom="1px solid" 
              borderColor={borderColor}
              borderRadius="lg"
              p={uploadedFiles.length > 0 ? 3 : 6}
              mb={4}
            >
              {uploadedFiles.length === 0 ? (
                // Large upload area when no files are uploaded
                <VStack spacing={4} align="stretch">
                                  <Text fontSize="sm" color="terminal.warning" fontFamily="mono" fontWeight="bold">
                  {'>'} document_upload --mode interactive
                </Text>
                  <Box
                    border="2px dashed"
                    borderColor={isDragOver ? 'terminal.warning' : 'terminal.muted'}
                    borderRadius="xl"
                    p={6}
                    textAlign="center"
                    cursor="pointer"
                    bg={isDragOver ? 'linear-gradient(135deg, terminal.warning, terminal.accent)' : 'linear-gradient(135deg, terminal.cardBg, terminal.secondary)'}
                    color={isDragOver ? 'terminal.bg' : textColor}
                    transition="all 0.3s ease"
                    _hover={{
                      borderColor: 'terminal.warning',
                      bg: 'linear-gradient(135deg, terminal.warning, terminal.accent)',
                      color: 'terminal.bg',
                      transform: 'scale(1.02)',
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <VStack spacing={3}>
                      <Upload size={24} color="currentColor" />
                      <Text fontSize="sm" fontFamily="mono" color={textColor}>
                        upload --files
                      </Text>
                      <Text fontSize="xs" color={borderColor} fontFamily="mono">
                        [.pdf .txt .docx] supported
                      </Text>
                    </VStack>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      display="none"
                      multiple
                      accept=".pdf,.txt,.docx,.doc"
                      onChange={handleFileInputChange}
                    />
                  </Box>
                </VStack>
              ) : (
                // Compact upload area when files are uploaded
                <VStack spacing={3} align="stretch">
                  <HStack spacing={3} align="center">
                    <Text fontSize="xs" color="terminal.success" fontFamily="mono" fontWeight="bold">
                      loaded_files:
                    </Text>
                    <Box
                      border="1px solid"
                      borderColor={isDragOver ? accentColor : borderColor}
                      borderRadius="lg"
                      px={3}
                      py={2}
                      cursor="pointer"
                      bg={isDragOver ? 'terminal.secondary' : 'transparent'}
                      transition="all 0.3s ease"
                      _hover={{
                        borderColor: accentColor,
                        bg: 'terminal.secondary',
                      }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <HStack spacing={2}>
                        <Upload size={14} color="currentColor" />
                        <Text fontSize="xs" fontFamily="mono" color={textColor}>
                          upload --replace
                        </Text>
                      </HStack>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        display="none"
                        multiple
                        accept=".pdf,.txt,.docx,.doc"
                        onChange={handleFileInputChange}
                      />
                    </Box>
                  </HStack>
                  
                  <Flex wrap="wrap" gap={2}>
                    {uploadedFiles.map((file, index) => (
                      <HStack
                        key={index}
                        bg="terminal.secondary"
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="lg"
                        p={2}
                        spacing={2}
                      >
                        <FileText size={12} />
                        <Text fontSize="xs" fontFamily="mono" color={textColor}>
                          {file.name}
                        </Text>
                        <IconButton
                          size="xs"
                          icon={<X size={10} />}
                          aria-label="Remove file"
                          variant="ghost"
                          color={borderColor}
                          borderRadius="md"
                          minW="auto"
                          h="auto"
                          p={1}
                          _hover={{ color: 'terminal.error' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                          }}
                        />
                      </HStack>
                    ))}
                  </Flex>
                </VStack>
              )}
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Alert 
              status="error" 
              bg="linear-gradient(135deg, terminal.error, terminal.warning)" 
              color="terminal.bg"
              border="2px solid"
              borderColor="terminal.error"
              borderRadius="xl"
              boxShadow="0 4px 15px rgba(247, 118, 142, 0.3)"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}

          {/* Messages Container */}
          <Box 
            flex="1" 
            overflow="auto" 
            p={6} 
            bg="terminal.bg"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: 'terminal.bg',
              boxShadow: `
                inset 0 20px 20px -20px rgba(0, 0, 0, 0.3),
                inset 0 -20px 20px -20px rgba(0, 0, 0, 0.3),
                inset 20px 0 20px -20px rgba(0, 0, 0, 0.2),
                inset -20px 0 20px -20px rgba(0, 0, 0, 0.2)
              `,
              borderRadius: 'md',
              zIndex: -1,
            }}
          >
            <VStack spacing={4} align="stretch">
              {messages.length === 0 && (
                <Box 
                  bg="linear-gradient(135deg, terminal.cardBg, terminal.secondary)"
                  border="2px solid" 
                  borderColor="terminal.accent"
                  borderRadius="xl"
                  p={4}
                  boxShadow="0 4px 15px rgba(122, 162, 247, 0.1)"
                >
                  <Text fontSize="sm" color={accentColor} fontFamily="mono" fontWeight="bold" lineHeight="1.2" mb={2}>
                    echo@chat:~$ status
                  </Text>
                  <Text fontSize="sm" color={textColor} fontFamily="mono">
                    {getWelcomeMessage()}
                  </Text>
                </Box>
              )}
              
                            {messages.map((message) => (
                <Box key={message.id} w="100%">
                  <HStack align="start" spacing={4} mb={3}>
                    <Text 
                      fontSize="sm" 
                      fontFamily="mono" 
                      color={message.type === 'user' ? 'terminal.success' : 'terminal.accent'}
                      fontWeight="bold"
                      minW="fit-content"
                      lineHeight="1.2"
                      pt={1}
                    >
                      {message.type === 'user' ? 'user@terminal:~$' : 'echo@assistant:~$'}
                    </Text>
                                        <Box 
                      flex="1" 
                      bg={message.type === 'user' 
                        ? 'linear-gradient(135deg, terminal.success, terminal.secondary)' 
                        : 'linear-gradient(135deg, terminal.cardBg, terminal.accent)'
                      }
                      border="1px solid"
                      borderColor={message.type === 'user' ? 'terminal.success' : 'terminal.accent'}
                      borderRadius="xl"
                      p={3}
                      boxShadow={message.type === 'user' 
                        ? '0 2px 10px rgba(158, 206, 106, 0.1)' 
                        : '0 2px 10px rgba(122, 162, 247, 0.1)'
                      }
                    >
                       <Box className="markdown-content">
                         {message.content === 'processing...' ? (
                           <HStack spacing={2}>
                             <Text fontSize="sm" fontFamily="mono" color={textColor}>
                               processing...
                             </Text>
                             <Spinner size="sm" color="terminal.warning" thickness="3px" />
                           </HStack>
                         ) : (
                           <ReactMarkdown remarkPlugins={[remarkGfm]}>
                             {message.content}
                           </ReactMarkdown>
                         )}
                        {message.sources && message.sources.length > 0 && (
                          <Box mt={3} pt={2} borderTop="2px solid" borderColor="terminal.warning">
                            <Text fontSize="xs" fontFamily="mono" color="terminal.warning" mb={2} fontWeight="bold">
                              --sources:
                            </Text>
                            <Flex wrap="wrap" gap={2}>
                              {message.sources.map((source, index) => (
                                <Text 
                                  key={index} 
                                  fontSize="xs" 
                                  fontFamily="mono"
                                  color="terminal.bg"
                                  bg="linear-gradient(135deg, terminal.success, terminal.accent)"
                                  border="1px solid"
                                  borderColor="terminal.success"
                                  borderRadius="lg"
                                  px={2}
                                  py={1}
                                  fontWeight="bold"
                                  _hover={{
                                    bg: 'linear-gradient(135deg, terminal.accent, terminal.warning)',
                                    transform: 'scale(1.05)',
                                  }}
                                  transition="all 0.2s"
                                >
                                  {source}
                                </Text>
                              ))}
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </HStack>
                </Box>
              ))}
              

              
              <div ref={messagesEndRef} />
            </VStack>
          </Box>

          {/* Input Container */}
          <Box 
            bg="linear-gradient(135deg, terminal.cardBg, terminal.secondary)"
            borderTop="2px solid" 
            borderColor="terminal.accent"
            borderRadius="lg"
            p={4}
            boxShadow="0 -2px 10px rgba(122, 162, 247, 0.1)"
          >
            <form onSubmit={handleSubmit}>
              <HStack spacing={4} align="center">
                <Text 
                  fontSize="sm" 
                  fontFamily="mono" 
                  bgGradient="linear(to-r, terminal.success, terminal.accent)"
                  bgClip="text"
                  fontWeight="bold"
                  minW="fit-content"
                  lineHeight="1"
                  flexShrink={0}
                >
                  user@terminal:~$
                </Text>
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    canChat 
                      ? "enter message..." 
                      : "upload documents first..."
                  }
                  disabled={!canChat || isLoading}
                  resize="none"
                  minH="40px"
                  maxH="120px"
                  bg="terminal.inputBg"
                  border="2px solid"
                  borderColor="terminal.muted"
                  borderRadius="lg"
                  color={textColor}
                  fontFamily="mono"
                  fontSize="sm"
                  flex="1"
                  _placeholder={{ color: 'terminal.muted' }}
                  _focus={{
                    borderColor: 'terminal.accent',
                    boxShadow: '0 0 0 2px rgba(122, 162, 247, 0.3)',
                  }}
                  _disabled={{
                    opacity: 0.6,
                    cursor: 'not-allowed'
                  }}
                />
                <IconButton
                  type="submit"
                  icon={isLoading ? <Spinner size="sm" thickness="3px" color="terminal.accent" /> : <Send size={20} />}
                  aria-label="Execute command"
                  size="md"
                  bg="linear-gradient(135deg, terminal.warning, terminal.accent)"
                  color="terminal.accent"
                  border="2px solid"
                  borderColor="terminal.accent"
                  borderRadius="lg"
                  isDisabled={!canChat || !inputValue.trim() || isLoading}
                  flexShrink={0}
                  alignSelf="center"
                  sx={{
                    '& svg': {
                      color: 'terminal.accent !important',
                      fill: 'terminal.accent !important',
                      stroke: 'terminal.accent !important',
                      strokeWidth: '2px !important'
                    }
                  }}
                  _hover={{
                    bg: 'linear-gradient(135deg, terminal.accent, terminal.success)',
                    borderColor: 'terminal.accent',
                    transform: 'translateY(-1px) scale(1.05)',
                    '& svg': {
                      color: 'terminal.accent !important',
                      fill: 'terminal.accent !important',
                      stroke: 'terminal.accent !important'
                    }
                  }}
                  _disabled={{
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    _hover: {
                      transform: 'none'
                    }
                  }}
                />
              </HStack>
            </form>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default EchoChatApp 