import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Terminal,
  RotateCw,
  Moon,
  Sun,
  Bell,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import TaskList from "./components/TaskList";
import Console from "./components/Console";
import SettingsPanel from "./components/Settings";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { AppSettings } from "./types";

const defaultSettings: AppSettings = {
  darkMode: true,
  autoRun: false,
  notifications: true,
  compactView: false,
};

function App() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    "dashboard-settings",
    defaultSettings
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen ${
          settings.darkMode
            ? "bg-[#0C0F10] text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <aside
          className={`fixed top-0 left-0 h-full w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            settings.darkMode
              ? "bg-gray-900/80 backdrop-blur-md border-r border-gray-800"
              : "bg-white/90 backdrop-blur-md border-r border-gray-200"
          } shadow-lg z-30`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-5 h-5 ${
                    settings.darkMode ? "text-blue-400" : "text-blue-500"
                  }`}
                />
                <h1 className="text-xl font-bold">Kancir AI</h1>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={`p-2 rounded-md ${
                    settings.darkMode
                      ? "hover:bg-gray-800/50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? settings.darkMode
                        ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400"
                        : "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                      : settings.darkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Overview</span>
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? settings.darkMode
                        ? "bg-purple-500/20 text-purple-400 border-l-2 border-purple-400"
                        : "bg-purple-50 text-purple-600 border-l-2 border-purple-500"
                      : settings.darkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <RotateCw className="w-5 h-5" />
                <span>Tasks</span>
              </NavLink>
              <NavLink
                to="/console"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? settings.darkMode
                        ? "bg-green-500/20 text-green-400 border-l-2 border-green-400"
                        : "bg-green-50 text-green-600 border-l-2 border-green-500"
                      : settings.darkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <Terminal className="w-5 h-5" />
                <span>Console</span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? settings.darkMode
                        ? "bg-amber-500/20 text-amber-400 border-l-2 border-amber-400"
                        : "bg-amber-50 text-amber-600 border-l-2 border-amber-500"
                      : settings.darkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        <div className={`${sidebarOpen ? "md:ml-64" : ""}`}>
          <header
            className={`fixed top-0 right-0 left-0 ${
              sidebarOpen ? "md:left-64" : ""
            } z-20 ${
              settings.darkMode
                ? "bg-gray-900/60 backdrop-blur-md border-b border-gray-800"
                : "bg-white/80 backdrop-blur-md border-b border-gray-200"
            } shadow-md`}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-md ${
                    settings.darkMode
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {sidebarOpen ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
                <h2 className="text-lg font-semibold">Welcome Back</h2>
              </div>
              <div className="flex items-center gap-2">
                {settings.notifications && (
                  <button
                    className={`p-2 rounded-md ${
                      settings.darkMode
                        ? "hover:bg-gray-800/70 bg-gray-800/30"
                        : "hover:bg-gray-100 bg-gray-100"
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() =>
                    updateSettings({ darkMode: !settings.darkMode })
                  }
                  className={`p-2 rounded-md ${
                    settings.darkMode
                      ? "hover:bg-gray-800/70 bg-gray-800/30"
                      : "hover:bg-gray-100 bg-gray-100"
                  }`}
                >
                  {settings.darkMode ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </header>

          <main className="pt-20 p-4">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div
                      className={`grid ${
                        isMobile
                          ? "grid-cols-1"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      } gap-6`}
                    >
                      <div
                        className={`${
                          settings.darkMode
                            ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-blue-500/30"
                            : "bg-white backdrop-blur-md border border-gray-200 hover:border-blue-300"
                        } rounded-xl shadow-lg overflow-hidden p-5`}
                      >
                        <TaskList settings={settings} />
                      </div>
                      <div
                        className={`${
                          settings.darkMode
                            ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-green-500/30"
                            : "bg-white backdrop-blur-md border border-gray-200 hover:border-green-300"
                        } rounded-xl shadow-lg overflow-hidden p-5`}
                      >
                        <Console settings={settings} />
                      </div>
                      <div
                        className={`${
                          settings.darkMode
                            ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-purple-500/30"
                            : "bg-white backdrop-blur-md border border-gray-200 hover:border-purple-300"
                        } rounded-xl shadow-lg overflow-hidden p-5`}
                      >
                        <SettingsPanel
                          settings={settings}
                          updateSettings={updateSettings}
                        />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <div
                      className={`${
                        settings.darkMode
                          ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-blue-500/30"
                          : "bg-white backdrop-blur-md border border-gray-200 hover:border-blue-300"
                      } rounded-xl shadow-lg overflow-hidden p-5`}
                    >
                      <TaskList settings={settings} />
                    </div>
                  }
                />
                <Route
                  path="/console"
                  element={
                    <div
                      className={`${
                        settings.darkMode
                          ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-green-500/30"
                          : "bg-white backdrop-blur-md border border-gray-200 hover:border-green-300"
                      } rounded-xl shadow-lg overflow-hidden p-5`}
                    >
                      <Console settings={settings} />
                    </div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <div
                      className={`${
                        settings.darkMode
                          ? "bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-purple-500/30"
                          : "bg-white backdrop-blur-md border border-gray-200 hover:border-purple-300"
                      } rounded-xl shadow-lg overflow-hidden p-5`}
                    >
                      <SettingsPanel
                        settings={settings}
                        updateSettings={updateSettings}
                      />
                    </div>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
