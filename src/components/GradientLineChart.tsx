import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export type GradientLineChartProps = {
  labels?: string[];
  data?: number[];
  label?: string;
  /** CSS color for the line stroke */
  borderColor?: string;
  /** 전체 텍스트 컬러(legend, tooltip 기본, ticks 기본) */
  textColor?: string;
  /** 축 눈금(ticks) 텍스트 컬러(미지정 시 textColor 사용) */
  tickColor?: string;
  /** 그리드 라인 컬러 */
  gridColor?: string;
  /** 폰트 패밀리/사이즈 커스터마이즈 */
  fontFamily?: string;
  fontSize?: number;
  animateOnView?: boolean; // 뷰포트 진입 시에만 렌더/애니메이션
  viewThreshold?: number; // 교차 임계값(0~1)
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
            : { duration: 520, easing: "easeInOutQuad" as const },
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

    // if (animateOnView) {
    //   const target = containerRef.current;
    //   if (!target) {
    //     createChart();
    //     return () => destroyChart();
    //   }
    //   const io = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //           visibleRef.current = true;
    //           if (!chartRef.current) createChart();
    //         } else {
    //           console.log(entry);
    //           visibleRef.current = false;
    //           if (replayOnScroll) destroyChart();
    //         }
    //       });
    //     },
    //     { threshold: viewThreshold },
    //   );
    //   io.observe(target);

    //   const onResize = () => chartRef.current?.resize();
    //   window.addEventListener("resize", onResize);

    //   return () => {
    //     io.disconnect();
    //     window.removeEventListener("resize", onResize);
    //     destroyChart();
    //   };
    // }

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
        if (replayOnScroll) destroyChart();
      }
    }

    // createChart();
    // const onResize = () => chartRef.current?.resize();
    // window.addEventListener("resize", onResize);
    // return () => {
    //   window.removeEventListener("resize", onResize);
    //   destroyChart();
    // };
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
