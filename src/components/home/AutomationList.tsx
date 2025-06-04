"use client";

import { useState } from 'react';
import { Automation } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Search, FileDown, Tag, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { trackDownload } from '@/lib/analytics';
import Image from 'next/image';

type AutomationListProps = {
  automations: Automation[];
};

export function AutomationList({ automations }: AutomationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setHoveredId] = useState<string | null>(null);
  
  const filteredAutomations = automations.filter((automation) => 
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    automation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (automation: Automation) => {
    await trackDownload(automation.id);
    const response = await fetch(automation.file_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const extension = automation.file_url.split('.').pop()?.split('?')[0] || 'zip';
    a.download = `${automation.name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20" id="automations">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
              <Zap className="h-4 w-4" />
              <span>POWER YOUR WORKFLOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-tight">
              Automation Library
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover and deploy pre-built automation solutions to streamline your processes.
            </p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-auto"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or description..."
                className="pl-10 h-12 text-base bg-background/80 backdrop-blur-lg border-2 focus-visible:ring-2 focus-visible:ring-primary/30 hover:border-primary/30 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </motion.div>
        
        {filteredAutomations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-muted/20 rounded-xl backdrop-blur-sm border border-muted/50"
          >
            <FileDown className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-medium mb-3">No automations found</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {automations.length === 0 
                ? "We're constantly adding new automation files. Check back soon!"
                : "Try a different search term or browse our full collection."}
            </p>
            {automations.length > 0 && searchTerm && (
              <Button 
                variant="outline" 
                size="lg"
                className="mt-6 group"
                onClick={() => setSearchTerm('')}
              >
                <span>View All Automations</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAutomations.map((automation, index) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredId(automation.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  <div className="relative h-60 overflow-hidden bg-muted/50 z-10">
                    <Image
                      src={automation.image_url}
                      alt={automation.name}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {automation.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                      {automation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow z-10">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>{automation.downloads || 0} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="z-10">
                    <Button 
                      className="w-full h-11 group"
                      onClick={() => handleDownload(automation)}
                    >
                      <span className="relative overflow-hidden">
                        <span className="block group-hover:-translate-y-6 transition-transform duration-300">
                          Download Now
                        </span>
                        <span className="absolute left-0 top-0 flex items-center justify-center w-full h-full translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                          <Download className="h-4 w-4 mr-2" />
                          GET
                        </span>
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}