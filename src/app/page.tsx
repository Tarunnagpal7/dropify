import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import PageVisitTracker from '@/components/PageVisitTracker';

// Fetch automations from Supabase


export default async function Home() {
  return (
    <>
      <PageVisitTracker pagePath="/" />
      <Hero />
      <Features />
    </>
  );
}