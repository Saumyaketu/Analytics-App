import { useEffect, useState } from "react";

import { getSessions, getHeatmapData } from "../services/analyticsApi";
import type { HeatmapEvent } from "../types/analytics.types";
import HeatmapCanvas from "../components/heatmap/HeatmapCanvas";

const HeatmapPage = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [clicks, setClicks] = useState<HeatmapEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const response = await getSessions();

      const uniquePages = [
        ...new Set(response.data.flatMap((session) => session.pagesVisited)),
      ];

      setPages(uniquePages);

      if (uniquePages.length > 0) {
        setSelectedPage(uniquePages[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeatmap = async (pageUrl: string) => {
    try {
      const response = await getHeatmapData(pageUrl);

      setClicks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchHeatmap(selectedPage);
    }
  }, [selectedPage]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-10">
      <h1 className="mb-8 text-3xl font-bold">Heatmap Analytics</h1>

      <select
        value={selectedPage}
        onChange={(e) => setSelectedPage(e.target.value)}
        className="mb-6 rounded border p-2"
      >
        {pages.map((page) => (
          <option key={page} value={page}>
            {new URL(page).pathname}
          </option>
        ))}
      </select>

      <p className="mb-6">Total Clicks: {clicks.length}</p>

      <HeatmapCanvas clicks={clicks} />
    </div>
  );
};

export default HeatmapPage;
