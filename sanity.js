import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'xpyv5u2i', // <-- Paste your exact project ID string here
  dataset: 'production',
  useCdn: true, // true for fast edge-cached responses
  apiVersion: '2026-06-30', // current date to ensure API version compliance
});