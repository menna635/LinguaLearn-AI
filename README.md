# LinguaLearn AI - Breaking Language Barriers in Education

A premium, production-ready fullstack web application that makes learning inclusive by allowing students to translate, listen, and practice their study material in their own language.

## 🚀 Features

- **AI-Powered Translation**: Translate educational content to 100+ languages using Hugging Face models
- **Text-to-Speech**: Natural voice synthesis for better comprehension and pronunciation
- **Smart Quiz Generation**: Auto-generate practice questions from translated material
- **Session History**: Save and revisit past translations and quizzes
- **Responsive Design**: Premium UI with smooth animations and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen-reader friendly

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Next.js API Routes** (Node.js)
- **Hugging Face Inference API** for AI models
- **LocalStorage** for session persistence

### AI Models
- **Translation**: `facebook/m2m100_418M` for multilingual translation
- **Text-to-Speech**: `facebook/mms-tts` for voice synthesis
- **Quiz Generation**: `google/flan-t5-large` for question generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Hugging Face API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lingualearn-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Hugging Face API key to `.env.local`:
   ```
   HUGGING_FACE_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Configuration

### Getting a Hugging Face API Key

1. Visit [Hugging Face](https://huggingface.co/settings/tokens)
2. Create a new access token
3. Copy the token to your `.env.local` file

### Supported Languages

The app supports 100+ languages including:
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)
- Arabic (ar)
- Hindi (hi)
- Turkish (tr)

## 📱 Usage

### 1. Landing Page
- Premium hero section with clear value proposition
- Feature showcase with smooth animations
- Problem/solution presentation
- Call-to-action buttons

### 2. Workspace (/app)
- **Input Panel**: Paste text or upload files (.txt, .md, .doc, .docx)
- **Translation Tab**: View AI-translated content with audio playback
- **Listen Tab**: Text-to-speech functionality
- **Practice Tab**: Auto-generated quizzes for comprehension testing
- **History Panel**: Access past translations and sessions

### 3. Key Features
- **File Upload**: Support for multiple document formats
- **Real-time Translation**: Instant AI-powered translation
- **Audio Playback**: Natural voice synthesis
- **Interactive Quizzes**: Multiple-choice questions with instant feedback
- **Session Management**: Automatic saving and loading of work

## 🎨 Design System

### Colors
- **Primary**: Emerald (#047857) - Trust and growth
- **Secondary**: Deep Blue (#1E3A8A) - Professionalism
- **Accent**: Warm Amber (#F59E0B) - Energy and warmth

### Typography
- **Headers**: Poppins (clean, modern)
- **Body**: Inter (readable, professional)

### Animations
- Smooth page transitions
- Staggered quiz animations
- Shimmer loading states
- Hover micro-interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - automatic builds on push

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for speed and user experience
- **SEO**: Comprehensive meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliant

## 🔒 Security

- API key protection with environment variables
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for AI model APIs
- [Vercel](https://vercel.com/) for hosting platform
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

For support, email support@lingualearn-ai.com or join our Discord community.

---

**LinguaLearn AI** - Making education accessible in every language 🌍