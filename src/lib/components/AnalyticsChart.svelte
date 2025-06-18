<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { sampleData, chartColors } from '../data/charts.js';

  // Register Chart.js components
  Chart.register(...registerables);

  export let type = 'line';
  export let metric = 'revenue';
  export let period = 'monthly';
  export let height = 'h-64';

  let canvas;
  let chart;

  // Get data based on metric and period
  $: chartData = {
    labels: sampleData[period].labels,
    datasets: [{
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: sampleData[period][metric] || sampleData[period].revenue,
      backgroundColor: chartColors.primary.blue.backgroundColor,
      borderColor: chartColors.primary.blue.borderColor,
      borderWidth: 2,
      fill: type === 'line' ? false : true,
      tension: type === 'line' ? 0.4 : 0,
      pointRadius: type === 'line' ? 4 : 0,
      pointHoverRadius: type === 'line' ? 6 : 0,
      borderRadius: type === 'bar' ? 8 : 0,
      borderSkipped: type === 'bar' ? false : true,
    }]
  };

  // Chart options
  $: chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y || context.parsed;
            if (metric === 'revenue' || metric === 'sales') {
              return context.dataset.label + ': $' + value.toLocaleString();
            } else if (metric === 'users' || metric === 'conversions') {
              return context.dataset.label + ': ' + value.toLocaleString();
            } else {
              return context.dataset.label + ': ' + value;
            }
          }
        }
      }
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#6b7280'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#6b7280',
          callback: function(value) {
            if (metric === 'revenue' || metric === 'sales') {
              return '$' + value.toLocaleString();
            } else {
              return value.toLocaleString();
            }
          }
        }
      }
    } : undefined,
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hoverRadius: 6
      },
      bar: {
        borderRadius: 8
      }
    }
  };

  onMount(() => {
    if (canvas) {
      if (type === 'line') {
        chart = new Chart(canvas, {
          type: 'line',
          data: chartData,
          options: chartOptions
        });
      } else if (type === 'bar') {
        chart = new Chart(canvas, {
          type: 'bar',
          data: chartData,
          options: chartOptions
        });
      } else if (type === 'doughnut') {
        chart = new Chart(canvas, {
          type: 'doughnut',
          data: chartData,
          options: chartOptions
        });
      }
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  // Update chart when props change
  $: if (chart && chartData && chartOptions) {
    chart.data = chartData;
    chart.options = chartOptions;
    chart.update();
  }
</script>

<div class="w-full {height}">
  <canvas bind:this={canvas}></canvas>
</div> 