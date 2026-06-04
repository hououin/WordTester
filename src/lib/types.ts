export interface Word {
  id: string;
  chinese: string;
  english: string;
  exampleCN: string;
  exampleEN: string;
}

export interface TestResult {
  wordId: string;
  chinese: string;
  correctEnglish: string;
  userAnswer: string;
  passed: boolean;
}

export type View = 'review' | 'test' | 'results' | 'edit';
