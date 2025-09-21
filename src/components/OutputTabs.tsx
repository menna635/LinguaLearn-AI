'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Headphones, Brain, Play, Pause, Volume2 } from 'lucide-react';
import QuizCard from './QuizCard';

interface OutputTabsProps {
  translatedContent: string;
  quizzes: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  isTranslating: boolean;
  isGeneratingQuiz: boolean;
  onGenerateQuiz: () => void;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
}

export default function OutputTabs({
  translatedContent,
  quizzes,
  isTranslating,
  isGeneratingQuiz,
  onGenerateQuiz,
  onPlayAudio,
  isPlayingAudio
}: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState('translation');

  const tabs = [
    { id: 'translation', label: 'Translation', icon: Languages },
    { id: 'audio', label: 'Listen', icon: Headphones },
    { id: 'quiz', label: 'Practice', icon: Brain },
  ];

  const renderShimmer = (lines: number = 3) => (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="shimmer h-4 w-full"></div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-gray-100 p-6 pb-0">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'translation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isTranslating ? (
              <div className="space-y-4">
                <div className="flex items-center text-primary-600 mb-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  Translating content...
                </div>
                {renderShimmer(5)}
              </div>
            ) : translatedContent ? (
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Translated Content</span>
                    <button
                      onClick={onPlayAudio}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {isPlayingAudio ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      <span className="text-sm">Listen</span>
                    </button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {translatedContent}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Languages className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Your translated content will appear here</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'audio' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {translatedContent ? (
              <div className="text-center py-12">
                <div className="bg-primary-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Volume2 className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                  Listen to Translation
                </h3>
                <p className="text-gray-600 mb-6">
                  Click the button below to hear the translated content
                </p>
                <button
                  onClick={onPlayAudio}
                  disabled={isPlayingAudio}
                  className="btn-primary flex items-center mx-auto"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Play Audio
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Headphones className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Translate content first to enable audio playback</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isGeneratingQuiz ? (
              <div className="space-y-4">
                <div className="flex items-center text-primary-600 mb-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  Generating quiz questions...
                </div>
                {renderShimmer(3)}
              </div>
            ) : quizzes.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
                  Practice Questions
                </h3>
                {quizzes.map((quiz, index) => (
                  <QuizCard key={index} quiz={quiz} index={index} />
                ))}
              </div>
            ) : translatedContent ? (
              <div className="text-center py-12">
                <div className="bg-accent-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Brain className="h-12 w-12 text-accent-600" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                  Generate Practice Quiz
                </h3>
                <p className="text-gray-600 mb-6">
                  Test your understanding with AI-generated questions
                </p>
                <button onClick={onGenerateQuiz} className="btn-primary">
                  Generate Quiz
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Translate content first to generate practice questions</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}