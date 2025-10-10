<script>
  import { Gantt, Willow, Tooltip, Fullscreen } from "wx-svelte-gantt";
  import Icon from "@iconify/svelte";
  import CustomForm from "../components/Form.svelte";
  import { format } from "date-fns";
  import GanttTooltip from "../components/GanttTooltip.svelte";
  import { ganttData } from "../data/gantt.js";

  // Use imported Gantt data
  let tasks = ganttData.tasks;
  let links = ganttData.links;
  let scales = ganttData.scales;

  const taskTypes = [
    { id: "task", label: "Task" },
    { id: "milestone", label: "Milestone" },
    { id: "summary", label: "Project" },
  ];

  let task = null;
  let store;
  let api;
  let cellWidth = 30;

  function dayDiff(next, prev) {
    const d = (next - prev) / 1000 / 60 / 60 / 24;
    return Math.ceil(Math.abs(d));
  }

  function getSummaryProgress(id) {
    const [totalProgress, totalDuration] = collectProgressFromKids(id);
    const res = totalProgress / totalDuration;
    return isNaN(res) ? 0 : Math.round(res);
  }

  function collectProgressFromKids(id) {
    let totalProgress = 0,
      totalDuration = 0;
    const kids = api.getTask(id).data;

    kids?.forEach((kid) => {
      let duration = 0;
      if (kid.type !== "milestone" && kid.type !== "summary") {
        duration = kid.duration || dayDiff(kid.end, kid.start);
        totalDuration += duration;
        totalProgress += duration * kid.progress;
      }
      const [p, d] = collectProgressFromKids(kid.id);
      totalProgress += p;
      totalDuration += d;
    });
    return [totalProgress, totalDuration];
  }

  function recalcSummaryProgress(id, self) {
    const { tasks } = api.getState();
    const task = api.getTask(id);

    if (task.type != "milestone") {
      const summary = self && task.type === "summary" ? id : tasks.getSummaryId(id);

      if (summary) {
        const progress = getSummaryProgress(summary);
        api.exec("update-task", {
          id: summary,
          task: { progress },
        });
      }
    }
  }

  function init(apiInstance) {
    api = apiInstance;
    store = apiInstance.getState().tasks;
    apiInstance.intercept("show-editor", data => {
      task = store.byId(data.id);
      return false;
    });

    // provide valid progresses from start
    api.getState().tasks.forEach((task) => {
      recalcSummaryProgress(task.id, true);
    });

    // auto progress calculations
    api.on("add-task", ({ id }) => {
      recalcSummaryProgress(id);
    });
    api.on("update-task", ({ id }) => {
      recalcSummaryProgress(id);
    });
    api.on("delete-task", ({ source }) => {
      recalcSummaryProgress(source, true);
    });
    api.on("copy-task", ({ id }) => {
      recalcSummaryProgress(id);
    });
    api.on("move-task", ({ id, source, inProgress }) => {
      if (inProgress) return;
      if (api.getTask(id).parent != source) recalcSummaryProgress(source, true);
      recalcSummaryProgress(id);
    });
  }

  function formAction(ev) {
    const { action, data } = ev;
    if (action === "close-form") {
      task = null;
    } else {
      api.exec(action, data);
    }
  }

  function zoomIn() {
    cellWidth = Math.min(cellWidth + 10, 100);
  }
  function zoomOut() {
    cellWidth = Math.max(cellWidth - 10, 10);
  }

  // Custom zoom configuration for Gantt
  const zoomConfig = {
    level: 3,
    levels: [
      {
        minCellWidth: 200,
        maxCellWidth: 400,
        scales: [{ unit: "year", step: 1, format: "yyyy" }],
      },
      {
        minCellWidth: 150,
        maxCellWidth: 400,
        scales: [
          { unit: "year", step: 1, format: "yyyy" },
          { unit: "quarter", step: 1, format: "QQQQ" },
        ],
      },
      {
        minCellWidth: 250,
        maxCellWidth: 350,
        scales: [
          { unit: "quarter", step: 1, format: "QQQQ" },
          { unit: "month", step: 1, format: "MMMM yyy" },
        ],
      },
      {
        minCellWidth: 100,
        scales: [
          { unit: "month", step: 1, format: "MMMM yyy" },
          { unit: "week", step: 1, format: "'week' w" },
        ],
      },
      {
        maxCellWidth: 200,
        scales: [
          { unit: "month", step: 1, format: "MMMM yyy" },
          { unit: "day", step: 1, format: "d" },
        ],
      },
      {
        minCellWidth: 25,
        maxCellWidth: 100,
        scales: [
          { unit: "day", step: 1, format: "MMM d" },
          { unit: "hour", step: 6, format: (a, b) => `${format(a, "HH:mm")} - ${format(b, "HH:mm")}` },
        ],
      },
      {
        maxCellWidth: 120,
        scales: [
          { unit: "day", step: 1, format: "MMM d" },
          { unit: "hour", step: 1, format: "HH:mm" },
        ],
      },
    ],
  };
</script>

<style>
  .data {
    white-space: nowrap;
    background-color: var(--wx-tooltip-background);
    padding: 3px 8px;
  }
  .text {
    font-family: var(--wx-font-family);
    color: var(--wx-color-primary-font);
    font-size: 13px;
    text-transform: capitalize;
    margin-bottom: 5px;
  }
  .text:last-child {
    margin-bottom: 0;
  }
  .caption {
    font-weight: 700;
  }
</style>

<div class="space-y-8">
  <div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50 mb-6">
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:calendar" class="w-full h-full text-primary" />
    </div>
    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">Gantt Chart</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">
          Visualize your project timeline and tasks interactively.
        </p>
      </div>
    </div>
  </div>
  <div class="bg-base-100 rounded-2xl shadow-md border border-base-300/50 p-4">
    <Willow>
      <Fullscreen>
        <Tooltip {api} content={GanttTooltip}>
          <Gantt {tasks} {links} {scales} bind:this={api} {init} cellWidth={cellWidth} zoom={zoomConfig} />
        </Tooltip>
      </Fullscreen>
    </Willow>
    {#if task}
      <CustomForm {task} {taskTypes} on:action={formAction} />
    {/if}
  </div>
</div>