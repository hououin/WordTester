<script lang="ts">
  import type { Word } from './types';

  let { word, showEnglish = true }: { word: Word; showEnglish?: boolean } = $props();
</script>

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
  <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{word.chinese}</h2>
  {#if showEnglish}
    <p class="text-xl text-blue-600 font-medium mb-8">{word.english}</p>
  {/if}
  <div class="border-t border-gray-100 pt-6 mt-2">
    <p class="text-base text-gray-700 mb-2 leading-relaxed">{word.exampleCN}</p>
    <p class="text-sm text-gray-400 italic">{word.exampleEN}</p>
  </div>
</div>
