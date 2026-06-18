import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSessionEvents } from "../services/analyticsApi";
import type { AnalyticsEvent } from "../types/analytics.types";
import EventTimeline from "../components/sessions/EventTimeline";

const EVENTS_PER_PAGE = 10;

const SessionDetailsPage = () => {
  const { sessionId } = useParams();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState<"all" | "click" | "page_view">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = async () => {
    try {
      if (!sessionId) return;

      const response = await getSessionEvents(sessionId);

      setEvents(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch session events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [sessionId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalEvents = events.length;

  const clickCount = events.filter(
    (event) => event.eventType === "click",
  ).length;

  const pageViewCount = events.filter(
    (event) => event.eventType === "page_view",
  ).length;

  const filteredEvents = events.filter((event) => {
    if (filter === "all") {
      return true;
    }

    return event.eventType === filter;
  });

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;

  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Session Journey: {sessionId?.slice(0, 8)}
      </h1>

      <div className="mb-8 rounded-lg border p-5 shadow-sm">
        <p className="mb-2">Total Events: {totalEvents}</p>
        <p className="mb-2">Clicks: {clickCount}</p>
        <p>Page Views: {pageViewCount}</p>
      </div>

      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded px-4 py-2 cursor-pointer ${
            filter === "all" ? "bg-black text-white" : "border"
          }`}
        >
          All Events
        </button>

        <button
          onClick={() => setFilter("click")}
          className={`rounded px-4 py-2 cursor-pointer ${
            filter === "click" ? "bg-black text-white" : "border"
          }`}
        >
          Click Events
        </button>

        <button
          onClick={() => setFilter("page_view")}
          className={`rounded px-4 py-2 cursor-pointer ${
            filter === "page_view" ? "bg-black text-white" : "border"
          }`}
        >
          Page Views
        </button>
      </div>

      <div className="space-y-4">
        {paginatedEvents.map((event, index) => (
          <EventTimeline
            key={event._id}
            event={event}
            index={startIndex + index}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
