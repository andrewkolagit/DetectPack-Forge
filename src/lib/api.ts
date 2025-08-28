import type { DetectionResult } from '@/types/detection';

export async function generateDetections(input: {
  mode: 'describe' | 'logs';
  text?: string;
  logs?: string;
}): Promise<DetectionResult> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('N8N_WEBHOOK_URL not configured. Please set VITE_N8N_WEBHOOK_URL in your environment.');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add optional DPF key if configured
  const dpfKey = import.meta.env.VITE_DPF_KEY;
  if (dpfKey) {
    headers['x-dpf-key'] = dpfKey;
  }

  const requestPayload = {
    mode: input.mode,
    [input.mode === 'describe' ? 'text' : 'logs']: input.mode === 'describe' ? input.text : input.logs
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Backend error ${response.status}: ${errorText}`);
  }

  return response.json();
}