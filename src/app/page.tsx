import FAQs from '@/components/Landing/Faqs';
import Features from '@/components/Landing/Features';
import Hero from '@/components/Landing/Hero'
import TechStack from '@/components/Landing/TechStack'

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Features />
      <FAQs />
    </main>
  );
}
