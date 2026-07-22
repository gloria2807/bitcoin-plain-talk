import { Client } from '@gradio/client';

const SPACE_ID = process.env.HF_DEMO_SPACE || '<your-org>/bitcoin-plain-talk-sw-demo';

export interface DemoComparison {
  base: string;
  tuned: string;
}

let clientPromise: Promise<Client> | null = null;

function getClient(): Promise<Client> {
  if (!clientPromise) {
    const token = process.env.HF_TOKEN as `hf_${string}` | undefined;
    clientPromise = Client.connect(SPACE_ID, token ? { token } : undefined).catch((error) => {
      clientPromise = null;
      throw error;
    });
  }
  return clientPromise;
}

/**
 * Calls the hf-space/ Gradio app, which loads the base Qwen3 model once and
 * generates twice (LoRA adapter off, then on) so this is a real before/after
 * of the fine-tune rather than two separately hosted models.
 *
 * The endpoint name below ("/predict") is Gradio's default for a
 * single-function gr.Interface — confirm against the deployed Space's
 * "Use via API" page and adjust if it differs.
 */
export async function compareBitcoinAnswer(question: string): Promise<DemoComparison> {
  const client = await getClient();
  const result = await client.predict('/predict', [question]);
  const [base, tuned] = result.data as [string, string];
  return { base, tuned };
}
