'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import InputPanel from '@/components/InputPanel';
import OutputTabs from '@/components/OutputTabs';
import HistoryPanel from '@/components/HistoryPanel';

interface HistoryItem {
  id: string;
  originalContent: string;
  translatedContent: string;
  targetLanguage: string;
  timestamp: number;
}

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function AppPage() {
  const [content, setContent] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedContent, setTranslatedContent] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const saveToHistory = (original: string, translated: string, language: string) => {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      originalContent: original,
      translatedContent: translated,
      targetLanguage: language,
      timestamp: Date.now()
    };

    const existingHistory = JSON.parse(localStorage.getItem('lingualearn-history') || '[]');
    const updatedHistory = [historyItem, ...existingHistory].slice(0, 50); // Keep last 50 items
    localStorage.setItem('lingualearn-history', JSON.stringify(updatedHistory));
  };

  const handleTranslate = async () => {
    if (!content.trim()) return;

    setIsTranslating(true);
    setQuizzes([]); // Clear previous quizzes

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          targetLanguage: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedContent(data.translatedText);
      saveToHistory(content, data.translatedText, targetLanguage);
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback for demo purposes
      setTranslatedContent(`[Demo Translation] This is a simulated translation of your content to ${targetLanguage}. In production, this would be translated using Hugging Face AI models.`);
      saveToHistory(content, `[Demo Translation] This is a simulated translation of your content to ${targetLanguage}.`, targetLanguage);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!translatedContent) return;

    setIsGeneratingQuiz(true);

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: translatedContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Quiz generation failed');
      }

      const data = await response.json();
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error('Quiz generation error:', error);
      // Fallback demo quizzes
      const demoQuizzes: Quiz[] = [
        {
          question: "What is the main topic of the translated content?",
          options: ["Science", "History", "Literature", "Mathematics"],
          correctAnswer: 0
        },
        {
          question: "Which language was the content translated to?",
          options: ["French", "Spanish", "German", "Italian"],
          correctAnswer: targetLanguage === 'es' ? 1 : 0
        }
      ];
      setQuizzes(demoQuizzes);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!translatedContent || isPlayingAudio) return;

    setIsPlayingAudio(true);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: translatedContent,
          language: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('TTS failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      // Fallback: simulate audio playback
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 3000);
    }
  };

  const handleLoadSession = (item: HistoryItem) => {
    setContent(item.originalContent);
    setTranslatedContent(item.translatedContent);
    setTargetLanguage(item.targetLanguage);
    setQuizzes([]); // Clear quizzes when loading a session
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="font-poppins font-bold text-xl text-gray-900">
                  LinguaLearn AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-12rem)]"
        >
          {/* Input Panel */}
          <div className="lg:col-span-4">
            <InputPanel
              content={content}
              setContent={setContent}
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
              onTranslate={handleTranslate}
              isLoading={isTranslating}
            />
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-5">
            <OutputTabs
              translatedContent={translatedContent}
              quizzes={quizzes}
              isTranslating={isTranslating}
              isGeneratingQuiz={isGeneratingQuiz}
              onGenerateQuiz={handleGenerateQuiz}
              onPlayAudio={handlePlayAudio}
              isPlayingAudio={isPlayingAudio}
            />
          </div>

          {/* History Panel */}
          <div className="lg:col-span-3">
            <HistoryPanel onLoadSession={handleLoadSession} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}