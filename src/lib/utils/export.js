/**
 * CSV Export utilities
 */

/**
 * Convert data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header objects with key and label
 * @returns {string} CSV string
 */
export function convertToCSV(data, headers) {
  // Create header row
  const headerRow = headers.map(header => header.label).join(',');
  
  // Create data rows
  const dataRows = data.map(item => {
    return headers.map(header => {
      const value = item[header.key];
      // Handle values that need quotes (contain commas, quotes, or newlines)
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });
  
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Download CSV file
 * @param {string} csvContent - CSV content as string
 * @param {string} filename - Name of the file to download
 */
export function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Export analytics data to CSV
 * @param {Object} analyticsData - Analytics data object
 * @param {string} selectedMetric - Currently selected metric
 * @param {string} period - Time period (monthly, weekly, daily)
 */
export function exportAnalyticsData(analyticsData, selectedMetric = 'revenue', period = 'monthly') {
  // Import sample data for the chart data
  import('../data/charts.js').then(({ sampleData }) => {
    const chartData = sampleData[period];
    const labels = chartData.labels;
    const values = chartData[selectedMetric] || chartData.revenue;
    
    // Create data array for CSV
    const csvData = labels.map((label, index) => ({
      period: label,
      [selectedMetric]: values[index]
    }));
    
    // Define headers
    const headers = [
      { key: 'period', label: 'Period' },
      { key: selectedMetric, label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1) }
    ];
    
    // Convert to CSV
    const csvContent = convertToCSV(csvData, headers);
    
    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `analytics_${selectedMetric}_${period}_${timestamp}.csv`;
    
    // Download the file
    downloadCSV(csvContent, filename);
  });
}

/**
 * Export overview data to CSV
 * @param {Object} overviewData - Overview data object
 */
export function exportOverviewData(overviewData) {
  const csvData = [
    { metric: 'Total Revenue', value: overviewData.totalRevenue },
    { metric: 'Total Users', value: overviewData.totalUsers },
    { metric: 'Conversion Rate', value: overviewData.conversionRate },
    { metric: 'Average Session Duration', value: overviewData.avgSessionDuration }
  ];
  
  const headers = [
    { key: 'metric', label: 'Metric' },
    { key: 'value', label: 'Value' }
  ];
  
  const csvContent = convertToCSV(csvData, headers);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `analytics_overview_${timestamp}.csv`;
  
  downloadCSV(csvContent, filename);
}

/**
 * Export top products data to CSV
 * @param {Array} topProducts - Top products array
 */
export function exportTopProductsData(topProducts) {
  const csvData = topProducts.map((product, index) => ({
    rank: index + 1,
    name: product.name,
    sales: product.sales,
    revenue: product.revenue
  }));
  
  const headers = [
    { key: 'rank', label: 'Rank' },
    { key: 'name', label: 'Product Name' },
    { key: 'sales', label: 'Sales' },
    { key: 'revenue', label: 'Revenue' }
  ];
  
  const csvContent = convertToCSV(csvData, headers);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `top_products_${timestamp}.csv`;
  
  downloadCSV(csvContent, filename);
}

/**
 * Export recent activity data to CSV
 * @param {Array} recentActivity - Recent activity array
 */
export function exportRecentActivityData(recentActivity) {
  const csvData = recentActivity.map(activity => ({
    action: activity.action,
    time: activity.time,
    type: activity.type
  }));
  
  const headers = [
    { key: 'action', label: 'Action' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' }
  ];
  
  const csvContent = convertToCSV(csvData, headers);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `recent_activity_${timestamp}.csv`;
  
  downloadCSV(csvContent, filename);
} 