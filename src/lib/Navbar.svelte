<script lang="ts">
  import { currentView } from './stores';
  import type { View } from './types';

  const tabs: { id: View; label: string }[] = [
    { id: 'review', label: '浏览' },
    { id: 'test', label: '测试' },
    { id: 'edit', label: '管理' },
  ];
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
  <div class="max-w-md mx-auto flex">
    {#each tabs as tab}
      <button
        class="flex-1 py-3 text-sm font-medium transition-colors
          {$currentView === tab.id
            ? 'text-blue-600 border-t-2 border-blue-600 -mt-px'
            : 'text-gray-400 hover:text-gray-600'}"
        onclick={() => currentView.set(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
</nav>
