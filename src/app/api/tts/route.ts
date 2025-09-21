import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text || !language) {
      return NextResponse.json(
        { error: 'Text and language are required' },
        { status: 400 }
      );
    }

    const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
    
    if (!HF_API_KEY) {
      // Return a simple error response for demo mode
      return NextResponse.json(
        { error: 'TTS requires Hugging Face API key' },
        { status: 503 }
      );
    }

    // Use Hugging Face TTS API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/mms-tts-eng',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text.substring(0, 500), // Limit text length for TTS
        }),
      }
    );

    if (!response.ok) {
      throw new Error('TTS API request failed');
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Text-to-speech failed' },
      { status: 500 }
    );
  }
}