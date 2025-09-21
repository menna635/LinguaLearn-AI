'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Trash2, Languages } from 'lucide-react';

interface InputPanelProps {
  content: string;
  setContent: (content: string) => void;
  targetLanguage: string;
  setTargetLanguage: (language: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
];

export default function InputPanel({
  content,
  setContent,
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  isLoading
}: InputPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
      };
      reader.readAsText(file);
    }
  };

  const clearContent = () => {
    setContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary-600" />
          Input Content
        </h2>
        {content && (
          <button
            onClick={clearContent}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Clear content"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg p-6 text-center transition-colors group"
        >
          <Upload className="h-8 w-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
          <p className="text-gray-600 group-hover:text-primary-600">
            Click to upload a file or drag and drop
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Supports .txt, .md, .doc, .docx files
          </p>
        </button>
      </div>

      {/* Text Input */}
      <div className="flex-1 mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your study material here..."
          className="w-full h-full min-h-[300px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Languages className="h-4 w-4 inline mr-1" />
          Translate to:
        </label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Translate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onTranslate}
        disabled={!content.trim() || isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Translating...
          </div>
        ) : (
          'Translate Content'
        )}
      </motion.button>
    </div>
  );
}