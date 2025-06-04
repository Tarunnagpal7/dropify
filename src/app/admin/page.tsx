"use client";

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import PageVisitTracker from '@/components/PageVisitTracker';

export default function AdminPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [automationFile, setAutomationFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [automationName, setAutomationName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !imageFile || !automationFile) {
      toast("Please fill in all fields and select files before submitting.");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload image to storage
      const imageExt = imageFile.name.split('.').pop();
      const imageFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${imageExt}`;
      const { error: imageUploadError, data: imageData } = await supabase.storage
        .from('automations')
        .upload(`images/${imageFileName}`, imageFile);

        console.log('Image upload result:', imageData);
        console.log('Image upload error:', imageUploadError); 
      
      if (imageUploadError) {
        throw new Error('Error uploading image: ' + imageUploadError.message);
      }
      
      // Get public URL for image
      const { data: imageUrl } = supabase.storage
        .from('automations/images')
        .getPublicUrl(imageFileName);
      
      // Upload automation file to storage
      const fileExt = automationFile.name.split('.').pop();
      const automationFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const { error: fileUploadError } = await supabase.storage
        .from('automations')
        .upload(`files/${automationFileName}`, automationFile);
      
      if (fileUploadError) {
        throw new Error('Error uploading automation file: ' + fileUploadError.message);
      }
      
      // Get public URL for automation file
      const { data: fileUrl } = supabase.storage
        .from('automations/files')
        .getPublicUrl(automationFileName);

      console.log({ name, description, imageUrl, fileUrl });

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('automations')
        .insert({
          name,
          description,
          image_url: imageUrl.publicUrl,
          file_url: fileUrl.publicUrl
        });
        
      if (dbError) {
        throw new Error('Error saving to database: ' + dbError.message);
      }
      
      toast("Automation has been uploaded successfully.");
      
      // Reset form
      setName('');
      setDescription('');
      setImageFile(null);
      setAutomationFile(null);
      setImageName('');
      setAutomationName('');
      
      // Refresh the page to see the new automation
      router.refresh();
      
    } catch (error) {
      console.error('Error in upload process:', error);
      toast( error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageName(file.name);
    }
  };
  
  const handleAutomationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAutomationFile(file);
      setAutomationName(file.name);
    }
  };
  
  return (
    <>
      <PageVisitTracker pagePath="/admin" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Upload and manage automation files
              </p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upload New Automation</CardTitle>
              <CardDescription>
                Add a new automation file to the collection.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Automation Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter automation name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this automation does"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Preview Image</Label>
                    <div className="border rounded-md p-4 text-center">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {imageName ? (
                          <>
                            <FileCheck className="h-8 w-8 text-green-600" />
                            <span className="text-sm font-medium truncate max-w-full">
                              {imageName}
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload image
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        className="mt-4 w-full"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Select Image
                      </Button>
                    </div>
                  </div>
                  
                  {/* Automation File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="automationFile">Automation File</Label>
                    <div className="border rounded-md p-4 text-center">
                      <input
                        id="automationFile"
                        type="file"
                        accept=".json,.xml,.yaml,.n8n"
                        className="hidden"
                        onChange={handleAutomationFileChange}
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {automationName ? (
                          <>
                            <FileCheck className="h-8 w-8 text-green-600" />
                            <span className="text-sm font-medium truncate max-w-full">
                              {automationName}
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload file
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        className="mt-4 w-full"
                        onClick={() => document.getElementById('automationFile')?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Warning about missing Supabase config */}
                <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-amber-800 dark:text-amber-300">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mr-3" />
                  <div className="text-sm">
                    <p>This form requires Supabase configuration to work properly. Ensure you've connected Supabase and created the necessary tables and storage buckets.</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Automation'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}