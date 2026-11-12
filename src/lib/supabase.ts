import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error('Supabase environment variables are not configured.');
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export interface ContactSubmission {
  name: string;
  email: string;
  company: string | null;
  agent_types: string[];
  message: string;
  source: string;
}

export const submitEnquiry = async (payload: ContactSubmission) => {
  const { error } = await supabase.from('contact_submissions').insert(payload);
  if (error) throw new Error(error.message);
};
