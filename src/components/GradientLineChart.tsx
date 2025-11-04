import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export type GradientLineChartProps = {
  labels?: string[];
  data?: number[];
  label?: string;
  borderColor?: string;
  textColor?: string;
  tickColor?: string;
  gridColor?: string;
  fontFamily?: string;
  fontSize?: number;
  animateOnView?: boolean;
  viewThreshold?: number;
  replayOnScroll?: boolean;
  isIntersecting?: boolean;
};

const GradientLineChart: React.FC<GradientLineChartProps> = ({
  labels = ["", "", "", "", "", ""],
  data = [50, 55, 80, 81, 54, 50],
  label = "Custom Label Name",
  borderColor = "rgba(77, 139, 210, 0.25)",
  textColor = "#FFFFFF",
  tickColor,
  gridColor = "rgba(255, 255, 255, 0.1)",
  fontFamily = "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  fontSize = 12,
  animateOnView = true,
  viewThreshold = 0.2,
  replayOnScroll = false,
  isIntersecting = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const createChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width } = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(width * 0.5 * ratio);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(18,109,215,0)");

      chartRef.current?.destroy();

      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label,
              data,
              backgroundColor: gradient,
              borderColor,
              borderWidth: 1,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: prefersReduced
            ? false
            : { duration: 1000, easing: "easeInOutQuad" as const },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: textColor,
                font: { family: fontFamily, size: fontSize },
              },
            },
            tooltip: {
              backgroundColor: "rgba(18,109,215,0.25)",
              titleColor: textColor,
              bodyColor: textColor,
              padding: 10,
              titleFont: { family: fontFamily, size: fontSize + 1 },
              bodyFont: { family: fontFamily, size: fontSize },
            },
          },
          scales: {
            x: {
              grid: { color: gridColor, lineWidth: 1 },
              ticks: {
                color: tickColor ?? textColor,
                font: { family: fontFamily, size: fontSize },
              },
            },
            y: {
              grid: { color: gridColor, lineWidth: 1 },
              ticks: {
                color: tickColor ?? textColor,
                font: { family: fontFamily, size: fontSize },
              },
            },
          },
          elements: { line: { tension: 0.4 } },
        },
      });
    };

    const destroyChart = () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };

    if (animateOnView) {
      const target = containerRef.current;
      if (!target) {
        createChart();
        return () => destroyChart();
      }

      if (isIntersecting) {
        visibleRef.current = true;
        if (!chartRef.current) createChart();
      } else {
        visibleRef.current = false;
        destroyChart();
      }
    }
  }, [
    labels,
    data,
    label,
    borderColor,
    textColor,
    tickColor,
    gridColor,
    fontFamily,
    fontSize,
    animateOnView,
    viewThreshold,
    replayOnScroll,
    isIntersecting,
  ]);

  return (
    <div
      ref={containerRef}
      className="line-chart"
      style={{ maxWidth: 640, width: "100%", margin: "0 auto" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "50%",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default GradientLineChart;
