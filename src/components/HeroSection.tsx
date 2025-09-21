'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, BookOpen, Headphones } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
          >
            <Globe className="w-4 h-4 mr-2" />
            Breaking Language Barriers in Education
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-gray-900 leading-tight"
          >
            Learn in{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Your Language
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Transform any study material into your preferred language. 
            Translate, listen, and practice with AI-powered tools designed for inclusive learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/app" className="btn-primary flex items-center group">
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="btn-secondary">
              See How It Works
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <div className="bg-primary-100 p-3 rounded-full">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <span className="font-medium">100+ Languages</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <div className="bg-secondary-100 p-3 rounded-full">
                <Headphones className="h-6 w-6 text-secondary-600" />
              </div>
              <span className="font-medium">AI Voice Synthesis</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <div className="bg-accent-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <span className="font-medium">Smart Quizzes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}