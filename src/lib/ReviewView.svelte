<script lang="ts">
  import { words, currentIndex, currentView } from './stores';
  import WordCard from './WordCard.svelte';

  function prev() {
    if ($currentIndex > 0) {
      $currentIndex -= 1;
    }
  }

  function next() {
    if ($currentIndex < $words.length - 1) {
      $currentIndex += 1;
    }
  }

  function startTest() {
    $currentView = 'test';
  }

  let isComplete = $derived($currentIndex >= $words.length && $words.length > 0);
  let hasPrev = $derived($currentIndex > 0);
  let hasNext = $derived($currentIndex < $words.length - 1);
  let currentWord = $derived($words[$currentIndex]);
  let progress = $derived($words.length > 0 ? `${$currentIndex + 1} / ${$words.length}` : '0 / 0');
</script>

<div class="pb-4">
  {#if $words.length === 0}
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-400 text-lg">词库为空，请先添加单词。</p>
    </div>
  {:else if isComplete}
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-xl font-bold text-gray-900 mb-2">所有单词已浏览完毕！</h2>
      <p class="text-gray-400 mb-6">准备好了吗？开始测试吧。</p>
      <button
        class="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        onclick={startTest}
      >
        开始测试
      </button>
    </div>
  {:else}
    <div class="text-center text-sm text-gray-400 mb-3">{progress}</div>
    <WordCard word={currentWord} showEnglish={true} />
    <div class="flex gap-4 mt-6">
      <button
        class="flex-1 py-3 px-6 rounded-xl font-medium transition-colors
          {hasPrev
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-gray-50 text-gray-300 cursor-not-allowed'}"
        onclick={prev}
        disabled={!hasPrev}
      >
        ← 上一个
      </button>
      <button
        class="flex-1 py-3 px-6 rounded-xl font-medium transition-colors
          {hasNext
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        onclick={hasNext ? next : startTest}
      >
        {hasNext ? '下一个 →' : '完成浏览 →'}
      </button>
    </div>
  {/if}
</div>
