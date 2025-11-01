import React from 'react';

import stackerCrane from '@/assets/stacker-crane.jpg';

type SensorChartProps = {
  label: string;
  data: { x: number; y: number }[];
};

function SensorChart({ label, data }: SensorChartProps) {
  // 将数据映射到 SVG 坐标
  const vbW = 120;
  const vbH = 100;
  const ml = 12, mr = 8, mt = 8, mb = 12; // 边距，保证箭头与线条不被裁剪
  const plotW = vbW - ml - mr;
  const plotH = vbH - mt - mb;
  const pts = data.map((d, i) => {
    const x = ml + (plotW * i) / (data.length - 1);
    const y = mt + plotH * (1 - d.y / 100);
    return { x, y };
  });
  const pathD = pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  return (
    <div className="border border-white/20 rounded-md p-2 flex flex-col gap-1 bg-transparent min-w-[140px]">
      <div className="w-full h-28">
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className="w-full h-full">
          <defs>
            <marker id="arrowMarker2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.85)" />
            </marker>
          </defs>
          {/* 坐标轴（带箭头） */}
          <line
            x1={ml}
            y1={vbH - mb}
            x2={vbW - mr}
            y2={vbH - mb}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={2.5}
            markerEnd="url(#arrowMarker2)"
          />
          <line
            x1={ml}
            y1={vbH - mb}
            x2={ml}
            y2={mt}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={2.5}
            markerEnd="url(#arrowMarker2)"
          />
          {/* 折线 */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-white text-xs">{label}</div>
    </div>
  );
}

const numbers = Array.from({ length: 13 }, (_, i) => i + 1);
const sensors = [
  '激光测距仪',
  '红外传感器',
  '光电传感器',
  '电流传感器',
  '电流传感器2',
  '振动传感器',
  '温度传感器',
  '行走传感器',
];

function makeRandomSeries(points = 12) {
  const arr: { x: number; y: number }[] = [];
  let current = 50 + Math.random() * 20 - 10;
  for (let i = 0; i < points; i++) {
    // 轻微波动，保持曲线连贯
    current += (Math.random() - 0.5) * 40;
    current = Math.max(5, Math.min(95, current));
    arr.push({ x: i, y: Math.round(current) });
  }
  return arr;
}

export default function StackerCraneDashboard() {
  const [selectedNo, setSelectedNo] = React.useState<number>(11);
  const sensorDataMap = React.useMemo(() => {
    const map: Record<string, { x: number; y: number }[]> = {};
    sensors.forEach((s) => {
      map[s] = makeRandomSeries(14);
    });
    return map;
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 标题 + 序号选择 */}
      <div className="pb-2">
        <div className="text-white/90 mb-2 text-lg font-medium">堆垛机：</div>
        <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-3 w-full serial-row">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => setSelectedNo(n)}
              data-serial="chip"
              className={
                `h-8 rounded-md border-2 text-sm flex items-center justify-center bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent ` +
                (selectedNo == n
                  ? 'border-white text-white'
                  : 'border-white/60 text-white/80 hover:border-white/80')
              }
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* 中间 左侧真实折线图 + 右侧堆垛机图片 */}
      <div className="flex-1 min-h-0 flex gap-3">
        {/* 左侧 8 个传感器图（压缩宽度）*/}
        <div className="w-[46%] min-w-[360px] grid grid-cols-2 gap-2 content-start">
          {sensors.map((s) => (
            <SensorChart key={s} label={s} data={sensorDataMap[s]} />
          ))}
        </div>

        {/* 右侧 图片区域：完整显示（contain），背景透明，贴顶显示；标题紧贴图片下方 */}
        <div className="flex-1 rounded-md border border-white/20 overflow-hidden bg-transparent p-0 flex flex-col">
          <img
            src={stackerCrane}
            alt="堆垛机"
            className="w-full h-auto object-contain object-top"
          />
          {/* 标题紧靠图片下方 */}
          <div className="text-white text-sm text-center py-1 mt-0">
            {selectedNo}号 堆垛机
          </div>
        </div>
      </div>
    </div>
  );
}