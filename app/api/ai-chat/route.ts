import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: 'You are a helpful AI assistant specialized in real estate. You help real estate agents with property descriptions, client communications, market analysis, contract advice, and general real estate business questions. Be professional, knowledgeable, and concise in your responses.',
      prompt: message,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}
