<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { chartColors } from '../data/charts.js';

  // Register Chart.js components
  Chart.register(...registerables);

  let selectedChart = 'line';
  let showChartSelect = false;

  const chartOptions = [
    { value: 'line', label: $_("charts.line"), icon: 'mynaui:chart-line' },
    { value: 'bar', label: $_("charts.bar"), icon: 'heroicons:chart-bar' },
    { value: 'pie', label: $_("charts.pie"), icon: 'heroicons:chart-pie' },
    { value: 'doughnut', label: $_("charts.doughnut"), icon: 'heroicons:circle-stack' },
    { value: 'radar', label: $_("charts.radar"), icon: 'heroicons:signal' },
    { value: 'polarArea', label: $_("charts.polar"), icon: 'heroicons:beaker' },
    { value: 'bubble', label: $_("charts.bubble"), icon: 'material-symbols:bubble-chart-outline' },
    { value: 'scatter', label: $_("charts.scatter"), icon: 'heroicons:squares-2x2' }
  ];

  // Sample data for different chart types using chartColors
  const chartData = {
    line: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: chartColors.primary.blue.borderColor,
        backgroundColor: chartColors.primary.blue.backgroundColor,
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }, {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: chartColors.primary.green.borderColor,
        backgroundColor: chartColors.primary.green.backgroundColor,
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }]
    },
    bar: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: chartColors.primary.blue.backgroundColor,
        borderColor: chartColors.primary.blue.borderColor,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }, {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: chartColors.primary.green.backgroundColor,
        borderColor: chartColors.primary.green.borderColor,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    pie: {
      labels: ['Blue', 'Green', 'Purple', 'Orange', 'Red'],
      datasets: [{
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          chartColors.primary.blue.backgroundColor,
          chartColors.primary.green.backgroundColor,
          chartColors.primary.purple.backgroundColor,
          chartColors.primary.orange.backgroundColor,
          chartColors.primary.red.backgroundColor
        ],
        borderColor: [
          chartColors.primary.blue.borderColor,
          chartColors.primary.green.borderColor,
          chartColors.primary.purple.borderColor,
          chartColors.primary.orange.borderColor,
          chartColors.primary.red.borderColor
        ],
        borderWidth: 2
      }]
    },
    doughnut: {
      labels: ['Blue', 'Green', 'Purple', 'Orange', 'Red'],
      datasets: [{
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          chartColors.primary.blue.backgroundColor,
          chartColors.primary.green.backgroundColor,
          chartColors.primary.purple.backgroundColor,
          chartColors.primary.orange.backgroundColor,
          chartColors.primary.red.backgroundColor
        ],
        borderColor: [
          chartColors.primary.blue.borderColor,
          chartColors.primary.green.borderColor,
          chartColors.primary.purple.borderColor,
          chartColors.primary.orange.borderColor,
          chartColors.primary.red.borderColor
        ],
        borderWidth: 2
      }]
    },
    radar: {
      labels: ['Speed', 'Power', 'Range', 'Accuracy', 'Control'],
      datasets: [{
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56],
        borderColor: chartColors.primary.blue.borderColor,
        backgroundColor: chartColors.primary.blue.backgroundColor,
        borderWidth: 2,
        pointBackgroundColor: chartColors.primary.blue.borderColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: chartColors.primary.blue.borderColor
      }, {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86],
        borderColor: chartColors.primary.green.borderColor,
        backgroundColor: chartColors.primary.green.backgroundColor,
        borderWidth: 2,
        pointBackgroundColor: chartColors.primary.green.borderColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: chartColors.primary.green.borderColor
      }]
    },
    polarArea: {
      labels: ['Blue', 'Green', 'Purple', 'Orange', 'Red'],
      datasets: [{
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          chartColors.primary.blue.backgroundColor,
          chartColors.primary.green.backgroundColor,
          chartColors.primary.purple.backgroundColor,
          chartColors.primary.orange.backgroundColor,
          chartColors.primary.red.backgroundColor
        ],
        borderColor: [
          chartColors.primary.blue.borderColor,
          chartColors.primary.green.borderColor,
          chartColors.primary.purple.borderColor,
          chartColors.primary.orange.borderColor,
          chartColors.primary.red.borderColor
        ],
        borderWidth: 1
      }]
    },
    bubble: {
      datasets: [{
        label: 'Primary Dataset',
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 15
        })),
        backgroundColor: chartColors.primary.blue.backgroundColor,
        borderColor: chartColors.primary.blue.borderColor,
        borderWidth: 1
      }]
    },
    scatter: {
      datasets: [{
        label: 'Primary Dataset',
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100
        })),
        backgroundColor: chartColors.primary.blue.backgroundColor,
        borderColor: chartColors.primary.blue.borderColor,
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8
      }, {
        label: 'Secondary Dataset',
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100
        })),
        backgroundColor: chartColors.primary.green.backgroundColor,
        borderColor: chartColors.primary.green.borderColor,
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    }
  };

  let charts = {};

  function createChart(type) {
    const canvas = document.getElementById(`chart-${type}`);
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;

    // Destroy existing chart if it exists
    if (charts[type]) {
      charts[type].destroy();
      delete charts[type];
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = {
      type,
      data: chartData[type],
      options: {
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
            displayColors: true
          }
        },
        scales: type === 'radar' ? {
          r: {
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            pointLabels: {
              font: {
                family: 'Inter',
                size: 12
              },
              color: '#6b7280'
            },
            ticks: {
              backdropColor: 'transparent',
              font: {
                family: 'Inter',
                size: 12
              },
              color: '#6b7280'
            }
          }
        } : type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' ? {
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
              color: '#6b7280'
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
      }
    };

    charts[type] = new Chart(ctx, config);
  }

  function createDemoCharts(category) {
    // Create 4 charts for the selected category
    for (let i = 1; i <= 4; i++) {
      const canvasId = `chart-${category}-${i}`;
      const canvas = document.getElementById(canvasId);
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) continue;

      // Destroy existing chart if it exists
      if (charts[canvasId]) {
        charts[canvasId].destroy();
        delete charts[canvasId];
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      // Create variations of data for each demo
      let demoData = JSON.parse(JSON.stringify(chartData[category])); // Deep clone

      // Modify data for each demo to show variation
      if (demoData.datasets) {
        demoData.datasets.forEach((dataset, datasetIndex) => {
          if (Array.isArray(dataset.data)) {
            dataset.data = dataset.data.map(value => {
              if (typeof value === 'number') {
                return Math.max(5, value + (Math.random() - 0.5) * 40 * i); // Vary the data
              } else if (value && typeof value === 'object' && 'x' in value && 'y' in value) {
                return {
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  r: value.r ? Math.random() * 15 : undefined
                };
              }
              return value;
            });
          }
        });
      }

      const config = {
        type: category,
        data: demoData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  family: 'Inter',
                  size: 10
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
              displayColors: true
            }
          },
          scales: category === 'radar' ? {
            r: {
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              pointLabels: {
                font: {
                  family: 'Inter',
                  size: 10
                },
                color: '#6b7280'
              },
              ticks: {
                backdropColor: 'transparent',
                font: {
                  family: 'Inter',
                  size: 10
                },
                color: '#6b7280'
              }
            }
          } : category !== 'pie' && category !== 'doughnut' && category !== 'polarArea' ? {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: 'Inter',
                  size: 10
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
                  size: 10
                },
                color: '#6b7280'
              }
            }
          } : undefined,
          elements: {
            line: {
              tension: 0.4
            },
            point: {
              radius: 3,
              hoverRadius: 5
            },
            bar: {
              borderRadius: 4
            }
          }
        }
      };

      charts[canvasId] = new Chart(ctx, config);
    }
  }

  function toggleChartSelect() {
    showChartSelect = !showChartSelect;
  }

  function selectChartType(value) {
    selectedChart = value;
    showChartSelect = false;
    
    // Destroy all existing charts first
    Object.keys(charts).forEach(chartId => {
      if (charts[chartId]) {
        charts[chartId].destroy();
        delete charts[chartId];
      }
    });
    
    // Recreate charts after a short delay to ensure DOM is updated
    setTimeout(() => {
      createDemoCharts(selectedChart);
    }, 50);
  }

  onMount(() => {
    // Create the initially selected chart demos
    createDemoCharts(selectedChart);
  });

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (showChartSelect && !event.target.closest('.chart-selector')) {
      showChartSelect = false;
    }
  }

  // Modal state for code viewer
  let showCodeModal = false;
  let codeContent = '';

  // Dialog states
  let showDialog = false;
  let dialogType = 'success'; // 'success', 'error', 'info', 'confirm'
  let dialogTitle = '';
  let dialogMessage = '';
  let dialogCallback = null;

  function showDialogModal(type, title, message, callback = null) {
    dialogType = type;
    dialogTitle = title;
    dialogMessage = message;
    dialogCallback = callback;
    showDialog = true;
  }

  function closeDialog() {
    showDialog = false;
    dialogCallback = null;
  }

  function confirmDialog() {
    if (dialogCallback) {
      dialogCallback();
    }
    closeDialog();
  }

  // Quick Actions Functions
  function exportChartAsPNG() {
    // Get the first chart for export (demo 1)
    const chartId = `chart-${selectedChart}-1`;
    const chart = charts[chartId];
    
    if (chart) {
      try {
        // Create download link
        const link = document.createElement('a');
        link.download = `${selectedChart}-chart-${new Date().toISOString().split('T')[0]}.png`;
        link.href = chart.toBase64Image('image/png', 1.0);
        link.click();
        
        showDialogModal('success', 'Export Successful', `Your ${chartOptions.find(opt => opt.value === selectedChart)?.label} chart has been downloaded successfully!`);
      } catch (error) {
        showDialogModal('error', 'Export Failed', 'Failed to export chart. Please try again.');
      }
    } else {
      showDialogModal('error', 'Chart Not Found', 'Chart not found. Please make sure a chart is loaded and try again.');
    }
  }

  function viewChartCode() {
    const codeExample = `// ${chartOptions.find(opt => opt.value === selectedChart)?.label} Chart Example
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../data/charts.js';

Chart.register(...registerables);

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
  type: '${selectedChart}',
  data: ${JSON.stringify(chartData[selectedChart], null, 2)},
  options: {
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
        displayColors: true
      }
    },
    scales: ${JSON.stringify(selectedChart === 'radar' ? {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: { font: { family: 'Inter', size: 12 }, color: '#6b7280' },
        ticks: { backdropColor: 'transparent', font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      }
    } : selectedChart !== 'pie' && selectedChart !== 'doughnut' && selectedChart !== 'polarArea' ? {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)', drawBorder: false },
        ticks: { font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      }
    } : undefined, null, 2)},
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6 },
      bar: { borderRadius: 8 }
    }
  }
});`;

    // Create modal or copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeExample).then(() => {
        showDialogModal('success', 'Code Copied', 'Chart code has been copied to your clipboard!');
      }).catch(() => {
        // Fallback: show code in modal
        showDialogModal('info', 'Code Example', 'Clipboard not available. Use the "View Code" button to see the full code in a modal.');
      });
    } else {
      // Fallback: show code in modal
      showDialogModal('info', 'Clipboard Not Supported', 'Your browser doesn\'t support clipboard operations. Use the "View Code" button to see the full code in a modal.');
    }
  }

  function refreshChartData() {
    showDialogModal('confirm', 'Refresh Chart Data', 'Are you sure you want to refresh the chart data? This will generate new random data for all charts.', () => {
      // Destroy existing charts
      Object.keys(charts).forEach(chartId => {
        if (charts[chartId]) {
          charts[chartId].destroy();
          delete charts[chartId];
        }
      });

      // Regenerate random data for bubble and scatter charts
      if (selectedChart === 'bubble') {
        chartData.bubble.datasets[0].data = Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 15
        }));
      } else if (selectedChart === 'scatter') {
        chartData.scatter.datasets.forEach(dataset => {
          dataset.data = Array.from({ length: 50 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100
          }));
        });
      }

      // Recreate charts with new data
      setTimeout(() => {
        createDemoCharts(selectedChart);
        const chartType = chartOptions.find(opt => opt.value === selectedChart)?.label;
        showDialogModal('success', 'Data Refreshed', `${chartType} charts have been refreshed with new data!`);
      }, 100);
    });
  }

  function openCodeModal() {
    codeContent = `// ${chartOptions.find(opt => opt.value === selectedChart)?.label} Chart Example
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../data/charts.js';

Chart.register(...registerables);

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
  type: '${selectedChart}',
  data: ${JSON.stringify(chartData[selectedChart], null, 2)},
  options: {
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
        displayColors: true
      }
    },
    scales: ${JSON.stringify(selectedChart === 'radar' ? {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: { font: { family: 'Inter', size: 12 }, color: '#6b7280' },
        ticks: { backdropColor: 'transparent', font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      }
    } : selectedChart !== 'pie' && selectedChart !== 'doughnut' && selectedChart !== 'polarArea' ? {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)', drawBorder: false },
        ticks: { font: { family: 'Inter', size: 12 }, color: '#6b7280' }
      }
    } : undefined, null, 2)},
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6 },
      bar: { borderRadius: 8 }
    }
  }
});

// Example usage:
// chart.update(); // Update chart
// chart.destroy(); // Destroy chart`;
    
    showCodeModal = true;
  }

  function closeCodeModal() {
    showCodeModal = false;
  }

  function copyCodeToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeContent).then(() => {
        showDialogModal('success', 'Code Copied', 'Code has been copied to your clipboard!');
      }).catch(() => {
        showDialogModal('error', 'Copy Failed', 'Failed to copy code to clipboard. Please try selecting and copying manually.');
      });
    } else {
      showDialogModal('error', 'Clipboard Not Supported', 'Your browser doesn\'t support clipboard operations. Please select and copy the code manually.');
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="space-y-8">
  <!-- Page header with enhanced styling -->
  <div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50" use:motionInView={{ animation: 'fadeInDown' }}>
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:chart-bar" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:presentation-chart-line" class="w-full h-full text-secondary" />
    </div>
    
    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">{$_("charts.title")}</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">{$_("charts.description")}</p>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Chart Type Selector -->
        <div class="relative chart-selector">
          <button 
            class="px-4 py-2 text-sm font-medium text-base-content/70 bg-base-100 border border-base-300 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200"
            on:click={toggleChartSelect}
          >
            <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-5 h-5" />
            <span>{chartOptions.find(opt => opt.value === selectedChart)?.label || $_("charts.select_type")}</span>
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </button>
          
          {#if showChartSelect}
            <div class="absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 min-w-56 w-max">
              <div class="py-1">
                {#each chartOptions as option}
                  <button 
                    class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 {option.value === selectedChart ? 'bg-primary/10 text-primary' : 'text-base-content/70'} flex items-center space-x-3 whitespace-nowrap"
                    on:click={() => selectChartType(option.value)}
                  >
                    <Icon icon={option.icon} class="w-5 h-5 flex-shrink-0" />
                    <span>{option.label}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Selected Chart Category Header -->
        <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm" use:motionInView={{ animation: 'fadeInScale' }}>
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-20 h-20 opacity-5">
      <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-full h-full text-primary" />
    </div>
    
    <div class="relative flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center shadow-md">
        <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-base-content">
          {chartOptions.find(opt => opt.value === selectedChart)?.label || $_("charts.select_type")} Charts
        </h2>
        <p class="text-sm text-base-content/60 mt-1">4 demo variations of {selectedChart} chart with different data sets</p>
      </div>
    </div>
  </div>

  <!-- 4 Demo Charts Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each Array(4) as _, i}
      <div 
        class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-300" 
        use:motionInView={{ animation: 'fadeIn', delay: i * 100 }}
        use:motionHover
        style="height: 350px;"
      >
        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-full h-full text-primary" />
        </div>
        
        <!-- Glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        
        <div class="relative mb-3">
          <h3 class="font-medium text-base-content group-hover:text-primary transition-colors duration-300">Demo {i + 1}</h3>
          <p class="text-xs text-base-content/50">Sample variation #{i + 1}</p>
        </div>
        <div class="relative" style="height: calc(100% - 60px);">
          <canvas id="chart-{selectedChart}-{i + 1}"></canvas>
        </div>
      </div>
    {/each}
  </div>

  <!-- Chart Information -->
      <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm" use:motionInView={{ animation: 'fadeInUp' }}>
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-24 h-24 opacity-5">
      <Icon icon="heroicons:information-circle" class="w-full h-full text-secondary" />
    </div>
    
    <div class="relative mb-6">
      <h3 class="text-xl font-semibold text-base-content flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md">
          <Icon icon="heroicons:information-circle" class="w-5 h-5 text-primary" />
        </div>
        <span>Chart Information & Details</span>
      </h3>
      <p class="text-sm text-base-content/60 mt-1">Technical specifications and use cases for {chartOptions.find(opt => opt.value === selectedChart)?.label} charts</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Chart Overview -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-base-200 to-base-300/50 rounded-xl p-4 border border-base-300/50 hover:shadow-lg transition-all duration-300" use:motionHover>
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-full h-full text-primary" />
          </div>
          
          <div class="relative flex items-center space-x-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Icon icon={chartOptions.find(opt => opt.value === selectedChart)?.icon || 'heroicons:chart-bar'} class="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h4 class="font-semibold text-base-content group-hover:text-primary transition-colors duration-300">{chartOptions.find(opt => opt.value === selectedChart)?.label} Chart</h4>
              <p class="text-xs text-base-content/60">Chart Type: {selectedChart}</p>
            </div>
          </div>
          <p class="text-sm text-base-content/70">
            {#if selectedChart === 'line'}
              Perfect for showing trends over time, connecting data points with smooth or straight lines. Ideal for time series data, stock prices, or performance metrics.
            {:else if selectedChart === 'bar'}
              Excellent for comparing discrete categories or groups. Best for displaying quantities, frequencies, or measurements across different categories.
            {:else if selectedChart === 'pie'}
              Shows parts of a whole as proportional slices. Great for displaying percentages, market share, or budget allocations with clear visual hierarchy.
            {:else if selectedChart === 'doughnut'}
              Similar to pie charts but with a hollow center, allowing for additional information display. More modern appearance with space for central metrics.
            {:else if selectedChart === 'radar'}
              Multi-dimensional data visualization showing multiple metrics on different axes. Perfect for comparing profiles, skills, or performance across categories.
            {:else if selectedChart === 'polarArea'}
              Combines features of pie and bar charts, showing data as sectors with varying radii. Useful for cyclical data or when both angle and distance matter.
            {:else if selectedChart === 'bubble'}
              Three-dimensional scatter plot using X, Y coordinates and bubble size. Excellent for showing correlations between three different variables simultaneously.
            {:else if selectedChart === 'scatter'}
              Shows relationships between two continuous variables as individual points. Essential for correlation analysis and identifying patterns or outliers.
            {/if}
          </p>
        </div>

        <!-- Technical Specifications -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/20 hover:shadow-lg transition-all duration-300" use:motionHover>
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Icon icon="heroicons:cog-6-tooth" class="w-full h-full text-primary" />
          </div>
          
          <div class="relative">
            <h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="group-hover:text-primary transition-colors duration-300">Technical Specs</span>
            </h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-base-content/60">Library:</span>
                <span class="text-base-content ml-2 font-medium">Chart.js v4</span>
              </div>
              <div>
                <span class="text-base-content/60">Responsive:</span>
                <span class="text-success ml-2 font-medium">✓ Yes</span>
              </div>
              <div>
                <span class="text-base-content/60">Animation:</span>
                <span class="text-success ml-2 font-medium">✓ Enabled</span>
              </div>
              <div>
                <span class="text-base-content/60">Interactive:</span>
                <span class="text-success ml-2 font-medium">✓ Tooltips</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Information -->
        <div class="border-l-4 border-primary pl-4">
          <h4 class="font-semibold text-base-content mb-2">Dataset Information</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-base-content/60">Data Points:</span>
              <span class="text-base-content font-medium">
                {#if selectedChart === 'bubble' || selectedChart === 'scatter'}
                  50+ dynamic points
                {:else if selectedChart === 'pie' || selectedChart === 'doughnut' || selectedChart === 'polarArea'}
                  5 categories
                {:else if selectedChart === 'radar'}
                  5 metrics
                {:else}
                  6 time periods
                {/if}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/60">Datasets:</span>
              <span class="text-base-content font-medium">
                {#if selectedChart === 'pie' || selectedChart === 'doughnut' || selectedChart === 'polarArea' || selectedChart === 'bubble'}
                  1 series
                {:else if selectedChart === 'scatter'}
                  2 series
                {:else}
                  2 series
                {/if}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/60">Colors:</span>
              <span class="text-base-content font-medium">Theme-based</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Use Cases -->
        <div class="group relative overflow-hidden bg-gradient-to-br from-success/5 to-emerald/5 rounded-xl p-4 border border-success/20 hover:shadow-lg transition-all duration-300" use:motionHover>
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Icon icon="heroicons:light-bulb" class="w-full h-full text-success" />
          </div>
          
          <div class="relative">
            <h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-success/20 to-emerald/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Icon icon="heroicons:light-bulb" class="w-4 h-4 text-success group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="group-hover:text-success transition-colors duration-300">Best Use Cases</span>
            </h4>
            <ul class="space-y-2 text-sm">
              {#if selectedChart === 'line'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Time series analysis and trend visualization</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Stock market data and financial metrics</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Website analytics and performance tracking</span>
                </li>
              {:else if selectedChart === 'bar'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Comparing quantities across categories</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Survey results and poll data</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Sales performance by region or product</span>
                </li>
              {:else if selectedChart === 'pie'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Market share analysis</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Budget allocation and expense breakdown</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Demographics and population distribution</span>
                </li>
              {:else if selectedChart === 'doughnut'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Modern dashboards and KPI displays</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Progress indicators with central metrics</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Resource utilization visualization</span>
                </li>
              {:else if selectedChart === 'radar'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Multi-criteria comparison and analysis</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Skills assessment and performance review</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Product feature comparison</span>
                </li>
              {:else if selectedChart === 'polarArea'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Cyclical data visualization</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Seasonal trends and patterns</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Directional data with magnitude</span>
                </li>
              {:else if selectedChart === 'bubble'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Three-variable correlation analysis</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Portfolio analysis (risk vs return vs size)</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Market positioning analysis</span>
                </li>
              {:else if selectedChart === 'scatter'}
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Correlation and regression analysis</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Outlier detection and pattern recognition</span>
                </li>
                <li class="flex items-start space-x-2">
                  <Icon icon="heroicons:check" class="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Scientific data visualization</span>
                </li>
              {/if}
            </ul>
          </div>
        </div>

        <!-- Interactive Features -->
        <div class="bg-base-200 rounded-lg p-4">
          <h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">
            <Icon icon="heroicons:cursor-arrow-ripple" class="w-5 h-5 text-secondary" />
            <span>Interactive Features</span>
          </h4>
          <div class="grid grid-cols-1 gap-3">
            <div class="flex items-center justify-between p-2 bg-base-100 rounded">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:hand-raised" class="w-4 h-4 text-primary" />
                <span class="text-sm">Hover Tooltips</span>
              </div>
              <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-base-100 rounded">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:sparkles" class="w-4 h-4 text-primary" />
                <span class="text-sm">Smooth Animations</span>
              </div>
              <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-base-100 rounded">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:device-phone-mobile" class="w-4 h-4 text-primary" />
                <span class="text-sm">Responsive Design</span>
              </div>
              <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-base-100 rounded">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:eye" class="w-4 h-4 text-primary" />
                <span class="text-sm">Legend Toggle</span>
              </div>
              <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
          <h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">
            <Icon icon="heroicons:bolt" class="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </h4>
          <div class="flex flex-wrap gap-2">
            <button 
              class="px-3 py-1 bg-primary text-primary-content rounded-full text-xs hover:bg-primary/80 transition-colors flex items-center space-x-1"
              on:click={exportChartAsPNG}
              use:motionHover
            >
              <Icon icon="heroicons:arrow-down-tray" class="w-3 h-3" />
              <span>Export PNG</span>
            </button>
            <button 
              class="px-3 py-1 bg-secondary text-secondary-content rounded-full text-xs hover:bg-secondary/80 transition-colors flex items-center space-x-1"
              on:click={openCodeModal}
              use:motionHover
            >
              <Icon icon="heroicons:document-text" class="w-3 h-3" />
              <span>View Code</span>
            </button>
            <button 
              class="px-3 py-1 bg-accent text-accent-content rounded-full text-xs hover:bg-accent/80 transition-colors flex items-center space-x-1"
              on:click={refreshChartData}
              use:motionHover
            >
              <Icon icon="heroicons:arrow-path" class="w-3 h-3" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Code Modal -->
{#if showCodeModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={closeCodeModal}>
    <div class="bg-base-100 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden" on:click|stopPropagation>
      <div class="flex items-center justify-between p-6 border-b border-base-300">
        <div class="flex items-center space-x-2">
          <Icon icon="heroicons:code-bracket" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-semibold text-base-content">
            {chartOptions.find(opt => opt.value === selectedChart)?.label} Chart Code
          </h3>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            class="px-3 py-1 bg-primary text-primary-content rounded-lg text-sm hover:bg-primary/80 transition-colors flex items-center space-x-1"
            on:click={copyCodeToClipboard}
          >
            <Icon icon="heroicons:clipboard" class="w-4 h-4" />
            <span>Copy</span>
          </button>
          <button 
            class="p-2 text-base-content/60 hover:text-base-content/80 hover:bg-base-200 rounded-lg transition-colors"
            on:click={closeCodeModal}
          >
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div class="p-6 overflow-auto max-h-[60vh]">
        <pre class="bg-base-200 rounded-lg p-4 text-sm overflow-auto"><code class="text-base-content whitespace-pre-wrap">{codeContent}</code></pre>
      </div>
      <div class="p-6 border-t border-base-300 bg-base-50">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-4 text-base-content/60">
            <span>Language: JavaScript</span>
            <span>Library: Chart.js v4</span>
            <span>Framework: Svelte</span>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              class="px-3 py-1 bg-success text-success-content rounded-lg text-sm hover:bg-success/80 transition-colors flex items-center space-x-1"
              on:click={copyCodeToClipboard}
            >
              <Icon icon="heroicons:clipboard-document" class="w-4 h-4" />
              <span>Copy to Clipboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Dialog Modal -->
{#if showDialog}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={closeDialog}>
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden" on:click|stopPropagation use:motionInView={{ animation: 'fadeInScale' }}>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-base-300 {
        dialogType === 'success' ? 'bg-success/5' :
        dialogType === 'error' ? 'bg-error/5' :
        dialogType === 'confirm' ? 'bg-warning/5' :
        'bg-info/5'
      }">
        <div class="flex items-center space-x-3">
          {#if dialogType === 'success'}
            <div class="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Icon icon="heroicons:check-circle" class="w-6 h-6 text-success" />
            </div>
          {:else if dialogType === 'error'}
            <div class="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
              <Icon icon="heroicons:x-circle" class="w-6 h-6 text-error" />
            </div>
          {:else if dialogType === 'confirm'}
            <div class="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Icon icon="heroicons:question-mark-circle" class="w-6 h-6 text-warning" />
            </div>
          {:else}
            <div class="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
              <Icon icon="heroicons:information-circle" class="w-6 h-6 text-info" />
            </div>
          {/if}
          <h3 class="text-lg font-semibold text-base-content">{dialogTitle}</h3>
        </div>
        <button 
          class="p-2 text-base-content/60 hover:text-base-content/80 hover:bg-base-200 rounded-lg transition-colors"
          on:click={closeDialog}
        >
          <Icon icon="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <p class="text-base-content/80 leading-relaxed">{dialogMessage}</p>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-base-300 bg-base-50">
        {#if dialogType === 'confirm'}
          <button 
            class="px-4 py-2 text-sm font-medium text-base-content/70 bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
            on:click={closeDialog}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 text-sm font-medium bg-primary text-primary-content hover:bg-primary/90 rounded-lg transition-colors flex items-center space-x-1"
            on:click={confirmDialog}
          >
            <Icon icon="heroicons:check" class="w-4 h-4" />
            <span>Confirm</span>
          </button>
        {:else}
          <button 
            class="px-4 py-2 text-sm font-medium bg-primary text-primary-content hover:bg-primary/90 rounded-lg transition-colors flex items-center space-x-1"
            on:click={closeDialog}
          >
            <Icon icon="heroicons:check" class="w-4 h-4" />
            <span>OK</span>
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if} 