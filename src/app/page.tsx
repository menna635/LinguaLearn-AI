import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import ProblemSolution from '@/components/ProblemSolution';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <ProblemSolution />
      <Footer />
    </main>
  );
}