"use client";

import { supabase } from '@/lib/supabase';

// Track page visits
export const trackPageVisit = async (pagePath: string) => {
  try {
    const { data: ipData } = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json());
      
    const ipAddress = ipData?.ip || 'unknown';
    const userAgent = navigator.userAgent;
    
    await supabase.from('visits').insert({
      ip_address: ipAddress,
      user_agent: userAgent,
      page_path: pagePath,
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    // Fail silently to not disrupt user experience
  }
};

// Track downloads
export const trackDownload = async (automationId: string) => {
  try {
    // Start a Supabase transaction
      const { data: automation, error: selectError } = await supabase
      .from('automations')
      .select('downloads')
      .eq('id', automationId)
      .single();

    // Increment the downloads count
    const { error: updateError } = await supabase
      .from('automations')
      .update({ downloads: (automation?.downloads || 0) + 1 })
      .eq('id', automationId);

    if (updateError) throw updateError;

    // Record the download
    await supabase.from('downloads').insert({
      automation_id: automationId,
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    // Fail silently to not disrupt user experience
  }
};
