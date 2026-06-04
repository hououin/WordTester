import { writable } from 'svelte/store';
import type { Word, TestResult, View } from './types';

const STORAGE_KEY = 'wordtester_words';

function getDefaultWords(): Word[] {
  return [
    { id: crypto.randomUUID(), chinese: '你好', english: 'hello', exampleCN: '你好，很高兴认识你。', exampleEN: 'Hello, nice to meet you.' },
    { id: crypto.randomUUID(), chinese: '谢谢', english: 'thank you', exampleCN: '谢谢你的帮助。', exampleEN: 'Thank you for your help.' },
    { id: crypto.randomUUID(), chinese: '再见', english: 'goodbye', exampleCN: '我们明天见，再见！', exampleEN: 'See you tomorrow, goodbye!' },
    { id: crypto.randomUUID(), chinese: '对不起', english: 'sorry', exampleCN: '对不起，我迟到了。', exampleEN: 'Sorry, I am late.' },
    { id: crypto.randomUUID(), chinese: '没问题', english: 'no problem', exampleCN: '没问题，我来帮你。', exampleEN: 'No problem, I will help you.' },
  ];
}

function loadWords(): Word[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  const defaults = getDefaultWords();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

export function persistWords(list: Word[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export const words = writable<Word[]>(loadWords());
export const currentView = writable<View>('review');
export const currentIndex = writable<number>(0);
export const testResults = writable<TestResult[]>([]);
