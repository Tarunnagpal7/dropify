"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {


  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background -z-10" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-primary underline decoration-sky-500 underline-offset-4 decoration-wavy decoration-2 ">N8N - MarketPlace</span>
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              <span className="text-primary">Drop.</span> <span className="text-blue-500">Download.</span> <span className="text-blue-600">Automate.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your one-click hub for AI automation files — simple, fast, free.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
              <Link href="/ai-agents">
            <Button 
              size="lg" 
              className="gap-2 group"
              >
              <span>Browse Automations</span>
            </Button>
            </Link>
            
            <Link href="/learn">
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}