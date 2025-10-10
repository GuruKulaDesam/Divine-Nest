<script>
  import { onMount } from "svelte";
  import { kolamStore, addStroke } from "$lib/stores/kolam";
  import { calculateSymmetricPoints } from "$lib/utils/symmetry";

  let canvas;
  let ctx;
  let isDrawing = false;
  let currentStroke = [];
  let canvasRect;

  // Canvas dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d");
      canvasRect = canvas.getBoundingClientRect();
      setupCanvas();
      drawExistingStrokes();
    }
  });

  function setupCanvas() {
    // Set canvas size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Clear canvas with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid if enabled
    if ($kolamStore.showGrid) {
      drawGrid();
    }

    // Draw guidelines if enabled
    if ($kolamStore.showGuidelines) {
      drawGuidelines();
    }
  }

  function drawGrid() {
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= CANVAS_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= CANVAS_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }
  }

  function drawGuidelines() {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    // Center cross
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.moveTo(0, CANVAS_HEIGHT / 2);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    ctx.stroke();

    ctx.setLineDash([]);
  }

  function drawExistingStrokes() {
    $kolamStore.strokes.forEach((stroke) => {
      drawStroke(stroke);
    });
  }

  function drawStroke(stroke) {
    if (stroke.points.length < 2) return;

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }

    ctx.stroke();
  }

  function getCanvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function startDrawing(event) {
    isDrawing = true;
    currentStroke = [];
    const point = getCanvasPoint(event);
    currentStroke.push(point);
    kolamStore.update((state) => ({ ...state, isDrawing: true }));
  }

  function continueDrawing(event) {
    if (!isDrawing) return;

    const point = getCanvasPoint(event);
    currentStroke.push(point);

    // Draw current stroke in real-time
    if (currentStroke.length >= 2) {
      ctx.strokeStyle = $kolamStore.selectedColor;
      ctx.lineWidth = $kolamStore.brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(currentStroke[currentStroke.length - 2].x, currentStroke[currentStroke.length - 2].y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    if (!isDrawing || currentStroke.length === 0) return;

    isDrawing = false;

    // Apply symmetry if enabled
    let finalPoints = [...currentStroke];

    if ($kolamStore.symmetryMode) {
      const symmetryPoints = currentStroke
        .map((point) =>
          calculateSymmetricPoints(point, {
            type: "radial",
            centerX: CANVAS_WIDTH / 2,
            centerY: CANVAS_HEIGHT / 2,
            segments: 4,
            axis: "horizontal",
            angle: 90,
          })
        )
        .flat();

      finalPoints = [...currentStroke, ...symmetryPoints];
    }

    // Save the stroke
    addStroke({
      points: finalPoints,
      color: $kolamStore.selectedColor,
      width: $kolamStore.brushSize,
    });

    currentStroke = [];
    kolamStore.update((state) => ({ ...state, isDrawing: false }));
  }

  // Reactive updates
  $: if (ctx && $kolamStore.strokes) {
    setupCanvas();
    drawExistingStrokes();
  }
</script>

<div class="w-full h-full flex items-center justify-center">
  <canvas bind:this={canvas} class="border-2 border-gray-300 rounded-lg cursor-crosshair" style="max-width: 100%; max-height: 500px;" on:mousedown={startDrawing} on:mousemove={continueDrawing} on:mouseup={stopDrawing} on:mouseleave={stopDrawing}></canvas>
</div>

<style>
  canvas {
    touch-action: none; /* Prevent scrolling on touch devices */
  }
</style>
