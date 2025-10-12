import { Capacitor } from '@capacitor/core';
import { crashAnalytics } from '../services/crashAnalytics';

// Extend performance interface for memory info
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Initialize performance monitoring
  initialize() {
    if (!this.isSupported()) {
      console.warn('Performance API not supported');
      return;
    }

    // Monitor navigation timing
    this.observeNavigationTiming();

    // Monitor resource loading
    this.observeResourceTiming();

    // Monitor long tasks (if supported)
    this.observeLongTasks();

    // Monitor memory usage (if supported)
    this.observeMemoryUsage();

    console.log('Performance monitoring initialized');
  }

  private isSupported(): boolean {
    return typeof window !== 'undefined' && 'performance' in window;
  }

  private observeNavigationTiming() {
    if (!performance.timing) return;

    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.timing;
        const navigationTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = this.getFirstPaintTime();

        this.recordMetric('navigation_time', navigationTime);
        this.recordMetric('dom_ready_time', domReadyTime);
        if (firstPaint) this.recordMetric('first_paint', firstPaint);

        crashAnalytics.logMessage(`Navigation timing: ${navigationTime}ms`, 'info');
      }, 0);
    });
  }

  private observeResourceTiming() {
    if (!performance.getEntriesByType) return;

    // Monitor resource loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) { // Log slow resources (>1s)
          crashAnalytics.logMessage(`Slow resource: ${entry.name} (${entry.duration}ms)`, 'warning');
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  private observeLongTasks() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          crashAnalytics.logMessage(`Long task detected: ${entry.duration}ms`, 'warning');
          this.recordMetric('long_task', entry.duration);
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (e) {
      // Long tasks not supported
    }
  }

  private observeMemoryUsage() {
    if (!performance.memory) return;

    // Check memory usage periodically
    setInterval(() => {
      const memInfo = performance.memory;
      if (!memInfo) return;

      const usedPercent = (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100;

      this.recordMetric('memory_usage_percent', usedPercent);
      this.recordMetric('memory_used_mb', memInfo.usedJSHeapSize / 1024 / 1024);

      // Warn if memory usage is high
      if (usedPercent > 80) {
        crashAnalytics.logMessage(`High memory usage: ${usedPercent.toFixed(1)}%`, 'warning');
      }
    }, 30000); // Check every 30 seconds
  }

  private getFirstPaintTime(): number | null {
    if (!performance.getEntriesByType) return null;

    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  // Record a performance metric
  recordMetric(name: string, value: number) {
    this.metrics.set(name, value);

    // Log to analytics if significant
    if (value > 5000) { // Log metrics over 5 seconds
      crashAnalytics.logMessage(`Performance metric: ${name} = ${value}ms`, 'info');
    }
  }

  // Get a specific metric
  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  // Get all metrics
  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Force garbage collection (if available)
  forceGC() {
    if (window.gc) {
      window.gc();
      crashAnalytics.logMessage('Manual garbage collection triggered', 'info');
    }
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Lazy loading helper for components
export function lazyLoadComponent(importFn: () => Promise<any>) {
  return new Promise((resolve) => {
    importFn().then(module => {
      const startTime = performance.now();
      resolve(module.default);
      const loadTime = performance.now() - startTime;
      performanceMonitor.recordMetric('component_load_time', loadTime);
    });
  });
}

// Memory management utilities
export const memoryManager = {
  // Clear unused caches
  clearCaches: () => {
    // Clear image cache if available
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('temp') || name.includes('old')) {
            caches.delete(name);
          }
        });
      });
    }
  },

  // Suggest garbage collection
  suggestGC: () => {
    if (performance.memory) {
      const usedPercent = (performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize) * 100;
      if (usedPercent > 70) {
        performanceMonitor.forceGC();
      }
    }
  },

  // Monitor and cleanup event listeners
  cleanupEventListeners: (element: Element) => {
    // This is a basic cleanup - in practice, you'd need to track listeners
    const clone = element.cloneNode(true);
    element.parentNode?.replaceChild(clone, element);
  }
};