import type { AnalyticsEvent } from "../../types/analytics.types";

interface EventTimelineProps {
  event: AnalyticsEvent;
  index: number;
}

const EventTimeline = ({ event, index }: EventTimelineProps) => {
  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        {index + 1}. {event.eventType.toUpperCase()}
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Page: {new URL(event.pageUrl).pathname}
      </p>

      {event.eventType === "click" && event.clickData && (
        <p className="mt-2">
          Coordinates: ({event.clickData.x}, {event.clickData.y})
        </p>
      )}

      <p className="mt-2">Time: {new Date(event.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default EventTimeline;
