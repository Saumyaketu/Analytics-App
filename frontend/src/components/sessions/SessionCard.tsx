import { useNavigate } from "react-router-dom";

import type { Session } from "../../types/analytics.types";

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/session/${session.sessionId}`);
  };

  return (
    <div className="rounded-lg border p-5 shadow-md">
      <h2 className="text-lg font-semibold">
        Session: {session.sessionId.slice(0, 8)}
      </h2>

      <p className="mt-2">Total Events: {session.totalEvents}</p>

      <p className="mt-2">
        Pages Visited:{" "}
        {session.pagesVisited
          .map((page) => {
            return new URL(page).pathname;
          })
          .join(", ")}
      </p>
      
      <p className="mt-2">
        Last Activity: {new Date(session.lastActivity).toLocaleString()}
      </p>

      <button
        onClick={handleClick}
        className="mt-4 rounded bg-black px-4 py-2 text-white cursor-pointer"
      >
        View Details
      </button>
    </div>
  );
};

export default SessionCard;
