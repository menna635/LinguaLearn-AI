import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
    
    if (!HF_API_KEY) {
      // Fallback response for demo purposes
      return NextResponse.json({
        translatedText: `[Demo Mode] This is a simulated translation of your content to ${targetLanguage}. To enable real translations, add your Hugging Face API key to the environment variables.`
      });
    }

    // Use Hugging Face Translation API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/m2m100_418M',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            src_lang: 'en',
            tgt_lang: targetLanguage,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Translation API request failed');
    }

    const result = await response.json();
    const translatedText = result[0]?.translation_text || result.generated_text || text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}