"use client";

import { useEffect } from 'react';
import { trackPageVisit } from '@/lib/analytics';

interface PageVisitTrackerProps {
  pagePath: string;
}

export default function PageVisitTracker({ pagePath }: PageVisitTrackerProps) {
  useEffect(() => {
    trackPageVisit(pagePath);
  }, [pagePath]);
  
  return null; // This component doesn't render anything
}