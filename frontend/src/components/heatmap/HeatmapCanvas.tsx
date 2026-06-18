import type { HeatmapEvent } from "../../types/analytics.types";

interface HeatmapCanvasProps {
  clicks: HeatmapEvent[];
}

const HeatmapCanvas = ({ clicks }: HeatmapCanvasProps) => {
  return (
    <div className="relative h-125 w-full rounded-lg border bg-gray-50">
      {clicks.map((click, index) => (
        <div
          key={index}
          className="absolute h-4 w-4 rounded-full bg-red-500 opacity-70"
          style={{
            left: `${click.clickData.x}px`,
            top: `${click.clickData.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default HeatmapCanvas;
