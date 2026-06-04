<script lang="ts">
  import type { Word } from './types';

  let { wordData = null, onsave, oncancel }: {
    wordData?: Word | null;
    onsave: (data: { chinese: string; english: string; exampleCN: string; exampleEN: string }) => void;
    oncancel: () => void;
  } = $props();

  let chinese = $state('');
  let english = $state('');
  let exampleCN = $state('');
  let exampleEN = $state('');

  $effect(() => {
    if (wordData) {
      chinese = wordData.chinese;
      english = wordData.english;
      exampleCN = wordData.exampleCN;
      exampleEN = wordData.exampleEN;
    }
  });

  function submit() {
    if (!chinese.trim() || !english.trim()) return;
    onsave({
      chinese: chinese.trim(),
      english: english.trim(),
      exampleCN: exampleCN.trim(),
      exampleEN: exampleEN.trim(),
    });
  }

  function handleOverlayClick() {
    oncancel();
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') oncancel();
  }
</script>

<div
  class="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-20"
  onclick={handleOverlayClick}
  onkeydown={handleDialogKeydown}
  role="presentation"
>
  <div
    class="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => { e.stopPropagation(); if (e.key === 'Enter') submit(); }}
    role="dialog"
    aria-label={wordData ? '编辑单词' : '添加新词'}
    aria-modal="true"
    tabindex="-1"
  >
    <h2 class="text-lg font-bold text-gray-900 mb-5">
      {wordData ? '编辑单词' : '添加新词'}
    </h2>

    <div class="space-y-4">
      <div>
        <label for="wf-chinese" class="block text-sm font-medium text-gray-600 mb-1">汉语</label>
        <input
          id="wf-chinese"
          type="text"
          bind:value={chinese}
          placeholder="例如：你好"
          class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="wf-english" class="block text-sm font-medium text-gray-600 mb-1">英语</label>
        <input
          id="wf-english"
          type="text"
          bind:value={english}
          placeholder="例如：hello"
          class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="wf-example-cn" class="block text-sm font-medium text-gray-600 mb-1">例句（中文）</label>
        <input
          id="wf-example-cn"
          type="text"
          bind:value={exampleCN}
          placeholder="例如：你好，很高兴认识你。"
          class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="wf-example-en" class="block text-sm font-medium text-gray-600 mb-1">例句（英语）</label>
        <input
          id="wf-example-en"
          type="text"
          bind:value={exampleEN}
          placeholder="例如：Hello, nice to meet you."
          class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="flex gap-3 mt-6">
      <button
        class="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        onclick={oncancel}
        type="button"
      >
        取消
      </button>
      <button
        class="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        disabled={!chinese.trim() || !english.trim()}
        type="submit"
      >
        保存
      </button>
    </div>
  </div>
</div>
