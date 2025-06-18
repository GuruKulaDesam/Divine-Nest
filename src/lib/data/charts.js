/**
 * Chart data and configurations
 */

// Revenue Overview Chart Data
export const revenueChartData = {
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

// Chart configuration options
export const chartOptions = {
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
          return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
        }
      }
    }
  },
  scales: {
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
          return '$' + value.toLocaleString();
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  elements: {
    bar: {
      borderRadius: 8
    }
  }
};

// Chart color schemes
export const chartColors = {
  primary: {
    blue: {
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)'
    },
    green: {
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)'
    },
    purple: {
      backgroundColor: 'rgba(147, 51, 234, 0.8)',
      borderColor: 'rgb(147, 51, 234)'
    },
    orange: {
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      borderColor: 'rgb(249, 115, 22)'
    },
    red: {
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderColor: 'rgb(239, 68, 68)'
    }
  }
};

// Sample data for different chart types
export const sampleData = {
  // Monthly data for different metrics
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 38000, 42000, 45000],
    sales: [8000, 15000, 12000, 18000, 16000, 22000, 20000, 24000, 27000, 30000, 34000, 37000],
    users: [1200, 1800, 1500, 2200, 2000, 2800, 2600, 3200, 3500, 3800, 4200, 4500],
    orders: [800, 1200, 1000, 1500, 1400, 1800, 1700, 2100, 2300, 2500, 2800, 3000],
    conversions: [320, 380, 420, 480, 520, 580, 540, 600, 650, 700, 750, 800],
    engagement: [65, 72, 68, 78, 75, 82, 79, 85, 88, 90, 92, 95]
  },
  
  // Weekly data
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenue: [5000, 6000, 4500, 7000, 8000, 9000, 7500],
    sales: [3000, 4000, 2500, 5000, 6000, 7000, 5500],
    users: [500, 600, 450, 700, 800, 900, 750],
    conversions: [120, 150, 110, 180, 200, 220, 180],
    engagement: [70, 75, 68, 80, 85, 88, 82]
  },
  
  // Daily data for last 30 days
  daily: {
    labels: Array.from({length: 30}, (_, i) => i + 1),
    revenue: Array.from({length: 30}, () => Math.floor(Math.random() * 5000) + 2000),
    sales: Array.from({length: 30}, () => Math.floor(Math.random() * 3000) + 1000),
    users: Array.from({length: 30}, () => Math.floor(Math.random() * 500) + 200),
    conversions: Array.from({length: 30}, () => Math.floor(Math.random() * 100) + 50),
    engagement: Array.from({length: 30}, () => Math.floor(Math.random() * 30) + 60)
  }
};

// Chart type configurations
export const chartTypes = {
  bar: {
    type: 'bar',
    options: chartOptions
  },
  line: {
    type: 'line',
    options: {
      ...chartOptions,
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 4,
          hoverRadius: 6
        }
      }
    }
  },
  doughnut: {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      }
    }
  }
}; 