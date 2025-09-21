'use client';

import { motion } from 'framer-motion';
import { 
  Languages, 
  Headphones, 
  Brain, 
  History, 
  Upload, 
  Zap 
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Easy Content Input',
    description: 'Paste text or upload documents. Support for PDFs, Word docs, and plain text files.',
    color: 'primary'
  },
  {
    icon: Languages,
    title: 'AI-Powered Translation',
    description: 'Translate to 100+ languages with context-aware AI that understands educational content.',
    color: 'secondary'
  },
  {
    icon: Headphones,
    title: 'Natural Text-to-Speech',
    description: 'Listen to translations with high-quality, multilingual voice synthesis.',
    color: 'accent'
  },
  {
    icon: Brain,
    title: 'Smart Quiz Generation',
    description: 'Auto-generate practice questions and quizzes from your translated material.',
    color: 'primary'
  },
  {
    icon: History,
    title: 'Session History',
    description: 'Save and revisit your translations, quizzes, and learning progress.',
    color: 'secondary'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant translations and responses powered by cutting-edge AI models.',
    color: 'accent'
  }
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-100',
    icon: 'text-primary-600',
    border: 'border-primary-200'
  },
  secondary: {
    bg: 'bg-secondary-100',
    icon: 'text-secondary-600',
    border: 'border-secondary-200'
  },
  accent: {
    bg: 'bg-accent-100',
    icon: 'text-accent-600',
    border: 'border-accent-200'
  }
};

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful AI tools designed to make education accessible in any language
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card hover:border-${feature.color}-200 group`}
              >
                <div className={`${colors.bg} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}