'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, Sparkles, FileText, Home, Users } from 'lucide-react'

const quickPrompts = [
  {
    title: 'Property Description',
    description: 'Generate compelling property descriptions',
    icon: Home,
    prompt: 'Write a professional property description for a 2-bedroom apartment with modern amenities'
  },
  {
    title: 'Client Email',
    description: 'Draft professional client communications',
    icon: Users,
    prompt: 'Write a follow-up email to a potential client who viewed a property yesterday'
  },
  {
    title: 'Market Analysis',
    description: 'Get insights on market trends',
    icon: FileText,
    prompt: 'Analyze the current real estate market trends for rental properties'
  }
]

interface Message {
  id: number
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant for real estate. I can help you with property descriptions, client communications, market analysis, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Here you would integrate with OpenAI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: data.response || 'I apologize, but I\'m having trouble processing your request right now. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600">Get help with property descriptions, client communications, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common AI-powered tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                  >
                    <prompt.icon className="mr-3 h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{prompt.title}</div>
                      <div className="text-xs text-gray-500">{prompt.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex items-center mb-2">
                          <Sparkles className="mr-2 h-4 w-4 text-primary" />
                          <Badge variant="secondary" className="text-xs">AI Assistant</Badge>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about real estate..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => sendMessage(inputMessage)}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
