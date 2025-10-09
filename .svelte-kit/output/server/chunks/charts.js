const chartColors = {
  primary: {
    blue: {
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgb(59, 130, 246)"
    },
    green: {
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      borderColor: "rgb(34, 197, 94)"
    }
  }
};
const sampleData = {
  // Monthly data for different metrics
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    revenue: [12e3, 19e3, 15e3, 25e3, 22e3, 3e4, 28e3, 32e3, 35e3, 38e3, 42e3, 45e3],
    sales: [8e3, 15e3, 12e3, 18e3, 16e3, 22e3, 2e4, 24e3, 27e3, 3e4, 34e3, 37e3],
    users: [1200, 1800, 1500, 2200, 2e3, 2800, 2600, 3200, 3500, 3800, 4200, 4500],
    orders: [800, 1200, 1e3, 1500, 1400, 1800, 1700, 2100, 2300, 2500, 2800, 3e3],
    conversions: [320, 380, 420, 480, 520, 580, 540, 600, 650, 700, 750, 800],
    engagement: [65, 72, 68, 78, 75, 82, 79, 85, 88, 90, 92, 95]
  },
  // Weekly data
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    revenue: [5e3, 6e3, 4500, 7e3, 8e3, 9e3, 7500],
    sales: [3e3, 4e3, 2500, 5e3, 6e3, 7e3, 5500],
    users: [500, 600, 450, 700, 800, 900, 750],
    conversions: [120, 150, 110, 180, 200, 220, 180],
    engagement: [70, 75, 68, 80, 85, 88, 82]
  },
  // Daily data for last 30 days
  daily: {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    revenue: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5e3) + 2e3),
    sales: Array.from({ length: 30 }, () => Math.floor(Math.random() * 3e3) + 1e3),
    users: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 200),
    conversions: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
    engagement: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 60)
  },
  // Yearly data for past 5 years
  yearly: {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    revenue: [15e4, 175e3, 2e5, 225e3, 25e4],
    sales: [12e4, 14e4, 16e4, 18e4, 2e5],
    users: [15e3, 16e3, 17e3, 18e3, 19e3],
    orders: [1e4, 11e3, 12e3, 13e3, 14e3],
    conversions: [5e3, 6e3, 7e3, 8e3, 9e3],
    engagement: [70, 75, 80, 85, 90]
  }
};
export {
  chartColors as c,
  sampleData as s
};
