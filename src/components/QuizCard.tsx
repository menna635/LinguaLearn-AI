'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizCardProps {
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  index: number;
}

export default function QuizCard({ quiz, index }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card"
    >
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Question {index + 1}: {quiz.question}
        </h4>
      </div>

      <div className="space-y-2">
        {quiz.options.map((option, optionIndex) => {
          let buttonClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 ";
          
          if (!showResult) {
            buttonClass += "border-gray-200 hover:border-primary-300 hover:bg-primary-50";
          } else {
            if (optionIndex === quiz.correctAnswer) {
              buttonClass += "border-green-300 bg-green-50 text-green-800";
            } else if (optionIndex === selectedAnswer && selectedAnswer !== quiz.correctAnswer) {
              buttonClass += "border-red-300 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
            }
          }

          return (
            <button
              key={optionIndex}
              onClick={() => handleAnswerSelect(optionIndex)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <div>
                    {optionIndex === quiz.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {optionIndex === selectedAnswer && selectedAnswer !== quiz.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-lg ${
            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          <div className="flex items-center">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            <span className="font-medium">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {!isCorrect && (
            <p className="mt-1 text-sm">
              The correct answer is: {quiz.options[quiz.correctAnswer]}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}