import { writable } from 'svelte/store';
import type { Word, TestResult, View } from './types';

const STORAGE_KEY = 'wordtester_words';

function getDefaultWords(): Word[] {
  return [
    { id: crypto.randomUUID(), chinese: '模型', english: 'Model', exampleCN: '尽管训练数据相对有限,该模型仍然在未见过的数据上展现出了良好的泛化能力', exampleEN: 'The model achieved strong generalization on unseen data despite being trained on a relatively limited dataset.' },
    { id: crypto.randomUUID(), chinese: '损失函数', english: 'Loss function', exampleCN: '损失函数的选择会直接影响梯度下降所使用的梯度，并可能影响模型的收敛行为。', exampleEN: 'The choice of loss function directly affects the gradients used by gradient descent and can influence convergence behavior.' },
    { id: crypto.randomUUID(), chinese: '梯度下降', english: 'Gradient descent', exampleCN: '虽然梯度下降成功降低了损失函数的值，但最终模型仍然出现了过拟合。', exampleEN: 'The gradient descent optimizer successfully minimized the loss function, but the resulting model still suffered from overfitting.' },
    { id: crypto.randomUUID(), chinese: '嵌入向量', english: 'Embedding', exampleCN: '学习得到的嵌入向量质量会显著影响下游任务的推理表现和整体泛化能力。', exampleEN: 'The quality of the learned embeddings has a significant impact on downstream inference performance and overall generalization.' },
    { id: crypto.randomUUID(), chinese: '特征', english: 'Feature', exampleCN: '尽管现代 Transformer 对人工特征工程的依赖较少,但有价值的特征仍会从嵌入向量学习得到的隐藏表示中涌现出来。', exampleEN: 'Although modern transformers rely less on manual feature engineering, useful features still emerge in the hidden representations learned from embeddings.' },
    { id: crypto.randomUUID(), chinese: '过拟合', english: 'Overfitting', exampleCN: '训练损失快速下降而验证集表现较差，通常是过拟合的典型信号。', exampleEN: 'A rapidly decreasing loss function combined with poor validation performance is often a sign of overfitting.' },
    { id: crypto.randomUUID(), chinese: '正则化', english: 'Regularization', exampleCN: '引入正则化后，模型的过拟合现象减轻，并提升了对未知样本的泛化能力。', exampleEN: 'Applying regularization reduced overfitting and improved the model generalization on unseen samples.' },
    { id: crypto.randomUUID(), chinese: '泛化能力', english: 'Generalization', exampleCN: '良好的泛化能力往往比获得最低的训练损失函数更重要。', exampleEN: 'Strong generalization is often more important than achieving the lowest training loss function value.' },
    { id: crypto.randomUUID(), chinese: '收敛', english: 'Convergence', exampleCN: '快速收敛并不一定意味着良好的泛化能力，尤其是在模型已经过拟合训练数据时。', exampleEN: 'Fast convergence does not necessarily imply good generalization, especially when the model is overfitting the training data.' },
    { id: crypto.randomUUID(), chinese: '推理', english: 'Inference', exampleCN: '在推理阶段，模型首先将输入Token转换为嵌入向量，然后经过多层attention计算，最终生成预测结果。', exampleEN: 'During inference, the model converts input tokens into embeddings, processes them through multiple attention layers, and generates predictions.' },
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
