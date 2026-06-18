const TRACKER_CONFIG = {
  apiUrl: "http://localhost:5000/api/track",
  sessionKey: "analytics_session_id",
};

const getSessionId = () => {
  let sessionId = localStorage.getItem(TRACKER_CONFIG.sessionKey);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(TRACKER_CONFIG.sessionKey, sessionId);
  }

  return sessionId;
};

const sendEvent = async (eventData) => {
  try {
    const response = await fetch(TRACKER_CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to send analytics event");
    }
  } catch (error) {
    console.error("Tracking error:", error.message);
  }
};

const trackPageView = () => {
  const eventData = {
    sessionId: getSessionId(),
    eventType: "page_view",
    pageUrl: window.location.href,
    timestamp: new Date(),
  };

  sendEvent(eventData);
};

const trackClick = () => {
  document.addEventListener("click", (event) => {
    const eventData = {
      sessionId: getSessionId(),
      eventType: "click",
      pageUrl: window.location.href,
      timestamp: new Date(),
      clickData: {
        x: event.clientX,
        y: event.clientY,
      },
    };

    sendEvent(eventData);
  });
};

const initTracker = () => {
  trackPageView();
  trackClick();
};

window.addEventListener("load", initTracker);
