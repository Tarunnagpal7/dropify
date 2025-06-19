"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileDown, ArrowRight, Upload, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import PageVisitTracker from '@/components/PageVisitTracker';
import Link from 'next/link';
const steps = [
  {
    title: "Search for Automation",
    description: "Use the search bar to find the automation workflow you need. Browse through our curated collection of N8N automation files.",
    icon: Search,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
  },
  {
    title: "Download the File",
    description: "Click the download button to get the JSON or txt file. All our automations are free and ready to use.",
    icon: FileDown,
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
  },
  {
    title: "Import to N8N",
    description: "Open your N8N dashboard, go to Workflows, click Import from File, and select the downloaded JSON file.",
    icon: Upload,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
  },
  {
    title: "Start Automating",
    description: "Configure any necessary API keys or credentials, then activate your workflow to start automating!",
    icon: Check,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
  }
];

export default function LearnPage() {
  const [currentStep,] = useState(0);

  return (
    <>
      <PageVisitTracker pagePath="/learn" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How to Use Dropify</h1>
            <p className="text-xl text-muted-foreground">
              Follow these simple steps to get started with our automation files
            </p>
          </div>

          <div className="grid gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className={`${currentStep === index ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-3 rounded-lg ${step.color}`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <Link href="/ai-agents">
            <Button size="lg" className="gap-2">
              Browse Automations
              <ArrowRight className="h-4 w-4" />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}