import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
    
    if (!HF_API_KEY) {
      // Fallback demo quizzes
      const demoQuizzes = [
        {
          question: "What is the main topic discussed in the content?",
          options: ["Education", "Technology", "Science", "History"],
          correctAnswer: 0
        },
        {
          question: "Which of the following best describes the content's purpose?",
          options: ["Entertainment", "Information", "Advertisement", "News"],
          correctAnswer: 1
        },
        {
          question: "What type of learning approach is mentioned?",
          options: ["Visual learning", "Audio learning", "Interactive learning", "All of the above"],
          correctAnswer: 3
        }
      ];

      return NextResponse.json({ quizzes: demoQuizzes });
    }

    // Use Hugging Face Text Generation API for quiz creation
    const prompt = `Based on the following content, generate 3 multiple choice questions with 4 options each. Format as JSON with question, options array, and correctAnswer index.

Content: ${content.substring(0, 1000)}

Generate questions that test comprehension and key concepts. Return only valid JSON.`;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Quiz generation API request failed');
    }

    const result = await response.json();
    
    // Try to parse the generated quiz, fallback to demo if parsing fails
    try {
      const generatedText = result[0]?.generated_text || result.generated_text;
      const quizzes = JSON.parse(generatedText);
      return NextResponse.json({ quizzes });
    } catch (parseError) {
      // Fallback to demo quizzes if parsing fails
      const demoQuizzes = [
        {
          question: "What is the main topic discussed in the content?",
          options: ["Education", "Technology", "Science", "History"],
          correctAnswer: 0
        },
        {
          question: "Which of the following best describes the content's purpose?",
          options: ["Entertainment", "Information", "Advertisement", "News"],
          correctAnswer: 1
        }
      ];
      return NextResponse.json({ quizzes: demoQuizzes });
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { error: 'Quiz generation failed' },
      { status: 500 }
    );
  }
}