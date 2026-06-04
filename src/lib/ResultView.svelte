<script lang="ts">
  import { testResults, currentView } from './stores';

  let total = $derived($testResults.length);
  let correct = $derived($testResults.filter(r => r.passed).length);
  let accuracy = $derived(total > 0 ? Math.round((correct / total) * 100) : 0);
  let grade = $derived(accuracy >= 80 ? '优秀' : accuracy >= 60 ? '良好' : accuracy >= 40 ? '一般' : '继续加油');

  function restart() {
    $currentView = 'review';
  }
</script>

<div class="pb-4">
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
    <div class="text-6xl mb-2">{accuracy}%</div>
    <div class="text-lg text-gray-500 mb-1">{grade}</div>
    <div class="text-sm text-gray-400 mb-6">
      正确 {correct} / {total} 题
    </div>

    <button
      class="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors w-full mb-6"
      onclick={restart}
    >
      返回浏览
    </button>
  </div>

  {#if total > 0}
    <div class="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100">
              <th class="py-3 px-4 text-left font-medium text-gray-500">汉语</th>
              <th class="py-3 px-4 text-left font-medium text-gray-500">正确答案</th>
              <th class="py-3 px-4 text-left font-medium text-gray-500">你的答案</th>
              <th class="py-3 px-4 text-center font-medium text-gray-500">结果</th>
            </tr>
          </thead>
          <tbody>
            {#each $testResults as r}
              <tr class="border-b border-gray-50 last:border-0">
                <td class="py-3 px-4 font-medium">{r.chinese}</td>
                <td class="py-3 px-4 text-gray-600">{r.correctEnglish}</td>
                <td class="py-3 px-4 text-gray-600">{r.userAnswer || '-'}</td>
                <td class="py-3 px-4 text-center">
                  {#if r.passed}
                    <span class="inline-block w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm leading-6">✓</span>
                  {:else}
                    <span class="inline-block w-6 h-6 rounded-full bg-red-100 text-red-600 text-sm leading-6">✗</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>
