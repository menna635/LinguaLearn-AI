'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-gray-900">
              LinguaLearn AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="/app" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/app" 
                className="btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}