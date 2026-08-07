"use client";

import { useEffect, useMemo, useState } from "react";

export default function HeaderConnectivity() {
  const [now, setNow] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);

  const connectedClasses =
    "border-lime-400/40 bg-lime-400/10 text-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.22)]";

  const disconnectedClasses =
    "border-red-400/40 bg-red-400/10 text-red-400 shadow-[0_0_24px_rgba(248,113,113,0.2)]";

  const todayDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-EN", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(now);
  }, [now]);

  const currentTime = useMemo(() => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(now).replace(/\./g, ":");
  }, [now]);

  const connectionLabel = isConnected ? "Connected" : "Disconnected";

  useEffect(() => {
    setIsConnected(navigator.onLine);

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    const updateOnlineStatus = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      clearInterval(timer);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between items-start gap-3 rounded-3xl bg-slate-900/90 p-4 text-left shadow-inner shadow-slate-950/40 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-slate-300 sm:text-md">
          {todayDate}
        </p>

        <p className="mt-1 font-mono text-md font-semibold text-slate-100 sm:text-lg">
        {currentTime }
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
            isConnected ? connectedClasses : disconnectedClasses
          }`}
          title={connectionLabel}
          aria-label={connectionLabel}
        >
          {isConnected ? (
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 8.5a14 14 0 0 1 19 0" />
              <path d="M5 13a10 10 0 0 1 14 0" />
              <path d="M8.5 16.5a5 5 0 0 1 7 0" />
              <path d="M12 20h.01" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 8.5a14 14 0 0 1 19 0" />
              <path d="M5 13a10 10 0 0 1 14 0" />
              <path d="M8.5 16.5a5 5 0 0 1 7 0" />
              <path d="M12 20h.01" />
              <path d="M3 3l18 18" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}
