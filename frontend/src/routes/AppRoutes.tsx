import { Routes, Route } from "react-router-dom";

import SessionsPage from "../pages/SessionsPage";
import SessionDetailsPage from "../pages/SessionDetailsPage";
import HeatmapPage from "../pages/HeatmapPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionsPage />} />

      <Route path="/session/:sessionId" element={<SessionDetailsPage />} />

      <Route path="/heatmap" element={<HeatmapPage />} />
    </Routes>
  );
};

export default AppRoutes;
