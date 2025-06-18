<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { chartOptions } from '../data/charts.js';
  
  // Register all Chart.js components
  Chart.register(...registerables);
  
  /** @type {import('chart.js').ChartData} */
  export let data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Sales',
        data: [8000, 15000, 12000, 18000, 16000, 22000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };
  
  let canvas;
  let chart;
  
  onMount(() => {
    const ctx = canvas.getContext('2d');
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: chartOptions
    });
  });
  
  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
  
  // Update chart when data changes
  $: if (chart && data) {
    chart.data = data;
    chart.update('active');
  }
</script>

<div class="relative h-80">
  <canvas bind:this={canvas}></canvas>
</div> 