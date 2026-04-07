import FAQs from '@/components/Landing/Faqs';
import Features from '@/components/Landing/Features';
import Hero from '@/components/Landing/Hero'
import Team from '@/components/Landing/Team';
import TechStack from '@/components/Landing/TechStack'
import VotingTimeline from '@/components/Landing/VotingTimeline';

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Features />
      <VotingTimeline />
      <Team />
      <FAQs />
    </main>
  );
}
