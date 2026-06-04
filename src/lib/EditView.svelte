<script lang="ts">
  import { words, persistWords } from './stores';
  import WordForm from './WordForm.svelte';
  import type { Word } from './types';

  let showForm = $state(false);
  let editingWord: Word | null = $state(null);

  function addNew() {
    editingWord = null;
    showForm = true;
  }

  function editWord(word: Word) {
    editingWord = word;
    showForm = true;
  }

  function deleteWord(id: string) {
    $words = $words.filter(w => w.id !== id);
    persistWords($words);
  }

  function saveWord(data: { chinese: string; english: string; exampleCN: string; exampleEN: string }) {
    if (editingWord) {
      $words = $words.map(w =>
        w.id === editingWord!.id ? { ...w, ...data } : w
      );
    } else {
      $words = [...$words, { id: crypto.randomUUID(), ...data }];
    }
    persistWords($words);
    showForm = false;
    editingWord = null;
  }

  function cancelForm() {
    showForm = false;
    editingWord = null;
  }
</script>

<div class="pb-4">
  <button
    class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors mb-4"
    onclick={addNew}
  >
    + 添加新词
  </button>

  {#if $words.length === 0}
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-400">词库为空，点击上方按钮添加单词。</p>
    </div>
  {/if}

  <div class="space-y-3">
    {#each $words as word}
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 text-lg">{word.chinese}</h3>
            <p class="text-blue-600 text-sm">{word.english}</p>
            <p class="text-gray-400 text-xs mt-1 truncate">{word.exampleCN}</p>
          </div>
          <div class="flex gap-2 ml-4 shrink-0">
            <button
              class="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              onclick={() => editWord(word)}
            >
              编辑
            </button>
            <button
              class="px-3 py-1.5 text-sm bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
              onclick={() => deleteWord(word.id)}
            >
              删除
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if showForm}
  <WordForm wordData={editingWord} onsave={saveWord} oncancel={cancelForm} />
{/if}
