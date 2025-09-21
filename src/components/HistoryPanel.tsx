'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Calendar, Languages } from 'lucide-react';

interface HistoryItem {
  id: string;
  originalContent: string;
  translatedContent: string;
  targetLanguage: string;
  timestamp: number;
}

interface HistoryPanelProps {
  onLoadSession: (item: HistoryItem) => void;
}

export default function HistoryPanel({ onLoadSession }: HistoryPanelProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('lingualearn-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('lingualearn-history');
    setHistory([]);
  };

  const deleteItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('lingualearn-history', JSON.stringify(updatedHistory));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'tr': 'Turkish',
    };
    return languages[code] || code;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-gray-900 flex items-center">
          <History className="h-5 w-5 mr-2 text-primary-600" />
          Session History
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Clear all history"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No translation history yet</p>
            <p className="text-sm mt-1">Your past translations will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer group"
                onClick={() => onLoadSession(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Languages className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">
                    Translated to {getLanguageName(item.targetLanguage)}
                  </span>
                </div>
                
                <p className="text-gray-800 text-sm line-clamp-2 mb-1">
                  {item.originalContent.substring(0, 100)}
                  {item.originalContent.length > 100 && '...'}
                </p>
                
                <p className="text-gray-600 text-xs line-clamp-1">
                  → {item.translatedContent.substring(0, 80)}
                  {item.translatedContent.length > 80 && '...'}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}