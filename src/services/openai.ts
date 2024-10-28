import OpenAI from 'openai';
import { AI_AGENT } from '../config/ai';
import { OpenAIError } from '../types/chat';

let openaiClient: OpenAI | null = null;

function initializeOpenAI(apiKey: string) {
  if (!openaiClient || openaiClient.apiKey !== apiKey) {
    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiClient;
}

export async function getChatCompletion(apiKey: string, messages: { role: 'user' | 'assistant'; content: string }[]) {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const openai = initializeOpenAI(apiKey);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0]?.message?.content || 'No response generated';

  } catch (error) {
    const openAIError = error as OpenAIError;
    console.error('OpenAI API Error:', {
      status: openAIError.status,
      message: openAIError.message,
      code: openAIError.code
    });
    
    if (openAIError.status === 401) {
      throw new Error('Invalid API key. Please check your OpenAI API key and try again.');
    } else if (openAIError.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    } else {
      throw new Error(
        openAIError.message || 'Failed to get response from assistant. Please try again.'
      );
    }
  }
}