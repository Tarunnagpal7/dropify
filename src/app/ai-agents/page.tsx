"use client";
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AutomationList } from '@/components/home/AutomationList';

function Page() {
  const [automations, setAutomations] = useState<any[]>([]);

  useEffect(() => {
    async function getAutomations() {
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching automations:', error);
        setAutomations([]);
      } else {
        setAutomations(data || []);
      }
    }
    getAutomations();
  }, []);

  return (
    <div>
      <AutomationList automations={automations} /> 
    </div>
  )
}

export default Page