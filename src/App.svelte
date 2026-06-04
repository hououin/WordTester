<script lang="ts">
  import Navbar from './lib/Navbar.svelte';
  import ReviewView from './lib/ReviewView.svelte';
  import TestView from './lib/TestView.svelte';
  import ResultView from './lib/ResultView.svelte';
  import EditView from './lib/EditView.svelte';
  import { currentView } from './lib/stores';
</script>

<div class="min-h-screen bg-gray-50 pb-16">
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="max-w-md mx-auto px-4 h-12 flex items-center justify-between">
      <h1 class="text-lg font-bold text-gray-900">WordTester</h1>
      <span class="text-xs text-gray-400">汉语学习</span>
    </div>
  </header>

  <main class="max-w-md mx-auto px-4 pt-4">
    {#if $currentView === 'review'}
      <ReviewView />
    {:else if $currentView === 'test'}
      <TestView />
    {:else if $currentView === 'results'}
      <ResultView />
    {:else if $currentView === 'edit'}
      <EditView />
    {/if}
  </main>

  <Navbar />
</div>
