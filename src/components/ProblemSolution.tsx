'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Users, TrendingUp } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-poppins font-bold text-gray-900">
                The Problem
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-red-800 font-medium">
                  Millions of students struggle because educational content is locked in one language
                </p>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Students miss out on quality educational resources due to language barriers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Traditional translation tools lack educational context and accuracy</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>No integrated tools for practice and comprehension testing</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-3xl font-poppins font-bold text-gray-900">
                Our Solution
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-r-lg">
                <p className="text-primary-800 font-medium">
                  LinguaLearn AI makes learning inclusive and accessible in any language
                </p>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>AI-powered translation that understands educational context</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Natural text-to-speech for better comprehension and pronunciation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Auto-generated quizzes to test understanding and retention</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">2.1B+</div>
            <div className="text-gray-600">Students worldwide need multilingual education</div>
          </div>
          
          <div className="text-center">
            <div className="bg-secondary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">85%</div>
            <div className="text-gray-600">Improvement in comprehension with native language learning</div>
          </div>
          
          <div className="text-center">
            <div className="bg-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-accent-600" />
            </div>
            <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">100+</div>
            <div className="text-gray-600">Languages supported by our AI models</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}