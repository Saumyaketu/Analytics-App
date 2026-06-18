import { useEffect, useState } from "react";

import { getSessions } from "../services/analyticsApi";
import type { Session } from "../types/analytics.types";
import SessionCard from "../components/sessions/SessionCard";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await getSessions();
      setSessions(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }
  return (
    <div className="mx-auto max-w-6xl p-10">
      <h1 className="mb-8 text-3xl font-bold">Analytics Sessions</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
