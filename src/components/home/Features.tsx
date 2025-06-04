"use client";

import { motion } from 'framer-motion';
import { Download, Zap, Infinity, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Download,
    title: 'One-Click Downloads',
    description: 'Get automation files instantly with a single click, no login required.',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    icon: ThumbsUp,
    title: 'Curated Collection',
    description: 'Handpicked automations verified by experts to ensure quality and security.',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    icon: Zap,
    title: 'Ready-to-Use',
    description: 'Pre-built automations that work immediately after download with minimal setup.',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    icon: Infinity,
    title: 'Free Forever',
    description: 'All automations are completely free to download and use, no strings attached.',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Streamline your AI workflows with our curated collection of automation files.
            Download and implement in minutes, not hours.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={item}
            >
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}