<script lang="ts">
  import { words, currentView, testResults } from './stores';
  import type { TestResult } from './types';

  let currentTestIndex = $state(0);
  let userAnswer = $state('');
  let localResults: TestResult[] = $state([]);
  let submitted = $state(false);

  let currentWord = $derived($words[currentTestIndex]);
  let total = $derived($words.length);
  let progress = $derived(total > 0 ? `${currentTestIndex + 1} / ${total}` : '0 / 0');

  function submit() {
    if (!userAnswer.trim() || !currentWord) return;
    localResults.push({
      wordId: currentWord.id,
      chinese: currentWord.chinese,
      correctEnglish: currentWord.english,
      userAnswer: userAnswer.trim(),
      passed: userAnswer.trim().toLowerCase() === currentWord.english.toLowerCase(),
    });
    submitted = true;
  }

  function next() {
    if (currentTestIndex < total - 1) {
      currentTestIndex += 1;
      userAnswer = '';
      submitted = false;
    } else {
      $testResults = localResults;
      $currentView = 'results';
    }
  }

  function skip() {
    if (!currentWord) return;
    localResults.push({
      wordId: currentWord.id,
      chinese: currentWord.chinese,
      correctEnglish: currentWord.english,
      userAnswer: '',
      passed: false,
    });
    if (currentTestIndex < total - 1) {
      currentTestIndex += 1;
      submitted = false;
    } else {
      $testResults = localResults;
      $currentView = 'results';
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (submitted) {
        next();
      } else {
        submit();
      }
    }
  }
</script>

<div class="pb-4">
  {#if total === 0}
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-400 text-lg">词库为空，无法测试。</p>
    </div>
  {:else}
    <div class="text-center text-sm text-gray-400 mb-3">{progress}</div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div class="text-xs text-gray-400 uppercase tracking-wide mb-2">请写出英文翻译</div>
      <h2 class="text-4xl font-bold text-gray-900 mb-6">{currentWord?.chinese}</h2>

      {#if submitted}
        <div class="mb-4">
          <p class="text-sm text-gray-400 mb-1">你的答案</p>
          <p class="text-lg font-medium" class:text-green-600={localResults.at(-1)?.passed} class:text-red-600={!localResults.at(-1)?.passed}>
            {localResults.at(-1)?.userAnswer || '(未作答)'}
          </p>
          {#if !localResults.at(-1)?.passed}
            <p class="text-sm text-green-600 mt-1">正确答案：{currentWord?.english}</p>
          {/if}
        </div>
        <button
          class="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors w-full"
          onclick={next}
        >
          {currentTestIndex < total - 1 ? '下一题 →' : '查看结果 →'}
        </button>
      {:else}
        <input
          type="text"
          bind:value={userAnswer}
          onkeydown={handleKeydown}
          placeholder="输入英文翻译..."
          class="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder:text-gray-300 mb-4"
        />
        <button
          class="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors w-full disabled:opacity-50"
          onclick={submit}
          disabled={!userAnswer.trim()}
        >
          提交
        </button>
        <button
          class="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors w-full"
          onclick={skip}
        >
          跳过
        </button>
      {/if}
    </div>
  {/if}
</div>
