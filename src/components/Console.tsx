import React, { useState, useRef, useEffect, useCallback } from "react";
import { Copy, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { LogEntry, AppSettings } from "../types";

interface ConsoleProps {
  settings: AppSettings;
}

const DUMMY_LOGS: LogEntry[] = [
  {
    id: 1,
    timestamp: new Date("2024-03-12T10:00:00"),
    message: "System initialized",
    level: "info",
  },
  {
    id: 2,
    timestamp: new Date("2024-03-12T10:01:00"),
    message: "Connection established",
    level: "info",
  },
  {
    id: 3,
    timestamp: new Date("2024-03-12T10:02:00"),
    message: "Failed to process request",
    level: "error",
  },
  {
    id: 4,
    timestamp: new Date("2024-03-12T10:03:00"),
    message: "Resource usage high",
    level: "warning",
  },
];

// Individual log item component to prevent unnecessary re-renders
const LogItem = React.memo(
  ({
    log,
    getLogColor,
    compactView,
  }: {
    log: LogEntry;
    getLogColor: (level: string) => string;
    compactView: boolean;
  }) => (
    <div
      className={`${getLogColor(log.level)} ${compactView ? "py-0.5" : "py-1"}`}
    >
      <span className="text-gray-500">
        [{format(log.timestamp, "HH:mm:ss")}]
      </span>{" "}
      <span className="font-medium">[{log.level}]</span> {log.message}
    </div>
  )
);

const Console: React.FC<ConsoleProps> = React.memo(({ settings }) => {
  const [logs, setLogs] = useState<LogEntry[]>(DUMMY_LOGS);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = useCallback(
    (level: string) => {
      switch (level) {
        case "error":
          return "text-red-500";
        case "warning":
          return "text-yellow-500";
        default:
          return settings.darkMode ? "text-gray-300" : "text-gray-700";
      }
    },
    [settings.darkMode]
  );

  const copyToClipboard = useCallback(() => {
    const logText = logs
      .map(
        (log) =>
          `[${format(log.timestamp, "HH:mm:ss")}] [${log.level}] ${log.message}`
      )
      .join("\n");
    navigator.clipboard.writeText(logText);
  }, [logs]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Console</h2>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded-md transition-colors ${
              settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={clearLogs}
            className={`p-2 rounded-md transition-colors ${
              settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            title="Clear logs"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={consoleRef}
        className={`font-mono text-sm p-3 rounded-md space-y-1 max-h-[500px] overflow-y-auto ${
          settings.darkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        {logs.length > 0 ? (
          logs.map((log) => (
            <LogItem
              key={log.id}
              log={log}
              getLogColor={getLogColor}
              compactView={settings.compactView}
            />
          ))
        ) : (
          <div className="text-gray-500 py-2 text-center">
            No logs to display
          </div>
        )}
      </div>
    </div>
  );
});

export default Console;
