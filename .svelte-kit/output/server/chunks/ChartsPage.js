import { c as store_get, a as ensure_array_like, d as attr, u as unsubscribe_stores, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { Chart, registerables } from "chart.js";
import { c as chartColors } from "./charts.js";
import { e as escape_html } from "./context.js";
function ChartsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    Chart.register(...registerables);
    let selectedChart = "line";
    const chartOptions = [
      {
        value: "line",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.line"),
        icon: "mynaui:chart-line"
      },
      {
        value: "bar",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.bar"),
        icon: "heroicons:chart-bar"
      },
      {
        value: "pie",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.pie"),
        icon: "heroicons:chart-pie"
      },
      {
        value: "doughnut",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.doughnut"),
        icon: "heroicons:circle-stack"
      },
      {
        value: "radar",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.radar"),
        icon: "heroicons:signal"
      },
      {
        value: "polarArea",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.polar"),
        icon: "heroicons:beaker"
      },
      {
        value: "bubble",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.bubble"),
        icon: "material-symbols:bubble-chart-outline"
      },
      {
        value: "scatter",
        label: store_get($$store_subs ??= {}, "$_", $format)("charts.scatter"),
        icon: "heroicons:squares-2x2"
      }
    ];
    ({
      bubble: {
        datasets: [
          {
            label: "Primary Dataset",
            data: Array.from({ length: 50 }, () => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
              r: Math.random() * 15
            })),
            backgroundColor: chartColors.primary.blue.backgroundColor,
            borderColor: chartColors.primary.blue.borderColor,
            borderWidth: 1
          }
        ]
      },
      scatter: {
        datasets: [
          {
            label: "Primary Dataset",
            data: Array.from({ length: 50 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
            backgroundColor: chartColors.primary.blue.backgroundColor,
            borderColor: chartColors.primary.blue.borderColor,
            borderWidth: 1,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: "Secondary Dataset",
            data: Array.from({ length: 50 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })),
            backgroundColor: chartColors.primary.green.backgroundColor,
            borderColor: chartColors.primary.green.borderColor,
            borderWidth: 1,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      }
    });
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:presentation-chart-line",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("charts.title"))}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("charts.description"))}</p></div> <div class="flex items-center space-x-4"><div class="relative chart-selector"><button class="px-4 py-2 text-sm font-medium text-base-content/70 bg-base-100 border border-base-300 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200">`);
    Icon($$renderer2, {
      icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
      class: "w-5 h-5"
    });
    $$renderer2.push(`<!----> <span>${escape_html(chartOptions.find((opt) => opt.value === selectedChart)?.label || store_get($$store_subs ??= {}, "$_", $format)("charts.select_type"))}</span> `);
    Icon($$renderer2, { icon: "heroicons:chevron-down", class: "w-4 h-4 ml-1" });
    $$renderer2.push(`<!----></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5 bg-gradient-to-br">`);
    Icon($$renderer2, {
      icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md">`);
    Icon($$renderer2, {
      icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
      class: "w-6 h-6 text-white"
    });
    $$renderer2.push(`<!----></div> <div><h2 class="text-2xl font-semibold text-base-content">${escape_html(chartOptions.find((opt) => opt.value === selectedChart)?.label || store_get($$store_subs ??= {}, "$_", $format)("charts.select_type"))} Charts</h2> <p class="text-sm text-base-content/60 mt-1">4 demo variations of ${escape_html(selectedChart)} chart with different data sets</p></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(Array(4));
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      each_array_1[i];
      $$renderer2.push(`<div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-300" style="height: 350px;"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
      Icon($$renderer2, {
        icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
        class: "w-full h-full text-primary"
      });
      $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative mb-3"><h3 class="font-medium text-base-content group-hover:text-primary transition-colors duration-300">Demo ${escape_html(i + 1)}</h3> <p class="text-xs text-base-content/50">Sample variation #${escape_html(i + 1)}</p></div> <div class="relative" style="height: calc(100% - 60px);"><canvas${attr("id", `chart-${stringify(selectedChart)}-${stringify(i + 1)}`)}></canvas></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-24 h-24 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:information-circle",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative mb-6"><h3 class="text-xl font-semibold text-base-content flex items-center space-x-2"><div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md">`);
    Icon($$renderer2, {
      icon: "heroicons:information-circle",
      class: "w-5 h-5 text-primary"
    });
    $$renderer2.push(`<!----></div> <span>Chart Information &amp; Details</span></h3> <p class="text-sm text-base-content/60 mt-1">Technical specifications and use cases for ${escape_html(chartOptions.find((opt) => opt.value === selectedChart)?.label)} charts</p></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-6"><div class="group relative overflow-hidden bg-gradient-to-br from-base-200 to-base-300/50 rounded-xl p-4 border border-base-300/50 hover:shadow-lg transition-all duration-300"><div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, {
      icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center space-x-3 mb-3"><div class="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">`);
    Icon($$renderer2, {
      icon: chartOptions.find((opt) => opt.value === selectedChart)?.icon || "heroicons:chart-bar",
      class: "w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div> <div><h4 class="font-semibold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(chartOptions.find((opt) => opt.value === selectedChart)?.label)}
                Chart</h4> <p class="text-xs text-base-content/60">Chart Type: ${escape_html(selectedChart)}</p></div></div> <p class="text-sm text-base-content/70">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`Perfect for showing trends over time, connecting data points with
              smooth or straight lines. Ideal for time series data, stock
              prices, or performance metrics.`);
    }
    $$renderer2.push(`<!--]--></p></div> <div class="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/20 hover:shadow-lg transition-all duration-300"><div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:cog-6-tooth",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative"><h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2"><div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:cog-6-tooth",
      class: "w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div> <span class="group-hover:text-primary transition-colors duration-300">Technical Specs</span></h4> <div class="grid grid-cols-2 gap-4 text-sm"><div><span class="text-base-content/60">Library:</span> <span class="text-base-content ml-2 font-medium">Chart.js v4</span></div> <div><span class="text-base-content/60">Responsive:</span> <span class="text-success ml-2 font-medium">✓ Yes</span></div> <div><span class="text-base-content/60">Animation:</span> <span class="text-success ml-2 font-medium">✓ Enabled</span></div> <div><span class="text-base-content/60">Interactive:</span> <span class="text-success ml-2 font-medium">✓ Tooltips</span></div></div></div></div> <div class="border-l-4 border-primary pl-4"><h4 class="font-semibold text-base-content mb-2">Dataset Information</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-base-content/60">Data Points:</span> <span class="text-base-content font-medium">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`6 time periods`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></span></div> <div class="flex justify-between"><span class="text-base-content/60">Datasets:</span> <span class="text-base-content font-medium">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`2 series`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></span></div> <div class="flex justify-between"><span class="text-base-content/60">Colors:</span> <span class="text-base-content font-medium">Theme-based</span></div></div></div></div> <div class="space-y-6"><div class="group relative overflow-hidden bg-gradient-to-br from-success/5 to-emerald/5 rounded-xl p-4 border border-success/20 hover:shadow-lg transition-all duration-300"><div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:light-bulb",
      class: "w-full h-full text-success"
    });
    $$renderer2.push(`<!----></div> <div class="relative"><h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2"><div class="w-8 h-8 bg-gradient-to-br from-success/20 to-emerald/20 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">`);
    Icon($$renderer2, {
      icon: "heroicons:light-bulb",
      class: "w-4 h-4 text-success group-hover:scale-110 transition-transform duration-300"
    });
    $$renderer2.push(`<!----></div> <span class="group-hover:text-success transition-colors duration-300">Best Use Cases</span></h4> <ul class="space-y-2 text-sm">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<li class="flex items-start space-x-2">`);
      Icon($$renderer2, {
        icon: "heroicons:check",
        class: "w-4 h-4 text-success mt-0.5 flex-shrink-0"
      });
      $$renderer2.push(`<!----> <span>Time series analysis and trend visualization</span></li> <li class="flex items-start space-x-2">`);
      Icon($$renderer2, {
        icon: "heroicons:check",
        class: "w-4 h-4 text-success mt-0.5 flex-shrink-0"
      });
      $$renderer2.push(`<!----> <span>Stock market data and financial metrics</span></li> <li class="flex items-start space-x-2">`);
      Icon($$renderer2, {
        icon: "heroicons:check",
        class: "w-4 h-4 text-success mt-0.5 flex-shrink-0"
      });
      $$renderer2.push(`<!----> <span>Website analytics and performance tracking</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="bg-base-200 rounded-lg p-4"><h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">`);
    Icon($$renderer2, {
      icon: "heroicons:cursor-arrow-ripple",
      class: "w-5 h-5 text-secondary"
    });
    $$renderer2.push(`<!----> <span>Interactive Features</span></h4> <div class="grid grid-cols-1 gap-3"><div class="flex items-center justify-between p-2 bg-base-100 rounded"><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:hand-raised", class: "w-4 h-4 text-primary" });
    $$renderer2.push(`<!----> <span class="text-sm">Hover Tooltips</span></div> <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span></div> <div class="flex items-center justify-between p-2 bg-base-100 rounded"><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-4 h-4 text-primary" });
    $$renderer2.push(`<!----> <span class="text-sm">Smooth Animations</span></div> <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span></div> <div class="flex items-center justify-between p-2 bg-base-100 rounded"><div class="flex items-center space-x-2">`);
    Icon($$renderer2, {
      icon: "heroicons:device-phone-mobile",
      class: "w-4 h-4 text-primary"
    });
    $$renderer2.push(`<!----> <span class="text-sm">Responsive Design</span></div> <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span></div> <div class="flex items-center justify-between p-2 bg-base-100 rounded"><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 text-primary" });
    $$renderer2.push(`<!----> <span class="text-sm">Legend Toggle</span></div> <span class="text-xs bg-success text-success-content px-2 py-1 rounded-full">Active</span></div></div></div> <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20"><h4 class="font-semibold text-base-content mb-3 flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-5 h-5 text-primary" });
    $$renderer2.push(`<!----> <span>Quick Actions</span></h4> <div class="flex flex-wrap gap-2"><button class="px-3 py-1 bg-primary text-primary-content rounded-full text-xs hover:bg-primary/80 transition-colors flex items-center space-x-1">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-3 h-3" });
    $$renderer2.push(`<!----> <span>Export PNG</span></button> <button class="px-3 py-1 bg-secondary text-secondary-content rounded-full text-xs hover:bg-secondary/80 transition-colors flex items-center space-x-1">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "w-3 h-3" });
    $$renderer2.push(`<!----> <span>View Code</span></button> <button class="px-3 py-1 bg-accent text-accent-content rounded-full text-xs hover:bg-accent/80 transition-colors flex items-center space-x-1">`);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-3 h-3" });
    $$renderer2.push(`<!----> <span>Refresh Data</span></button></div></div></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  ChartsPage as default
};
