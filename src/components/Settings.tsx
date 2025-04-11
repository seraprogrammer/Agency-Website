import React, { useCallback } from "react";
import { Play, Bell, LayoutGrid, RotateCcw } from "lucide-react";
import { AppSettings } from "../types";

interface SettingsPanelProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

// Toggle switch component extracted and memoized
const ToggleSwitch = React.memo(
  ({
    checked,
    onChange,
    icon,
    label,
    darkMode,
  }: {
    checked: boolean;
    onChange: () => void;
    icon: React.ReactNode;
    label: string;
    darkMode: boolean;
  }) => (
    <div
      className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <button
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  )
);

const SettingsPanel: React.FC<SettingsPanelProps> = React.memo(
  ({ settings, updateSettings }) => {
    const resetToDefaults = useCallback(() => {
      updateSettings({
        darkMode: false,
        autoRun: false,
        notifications: true,
        compactView: false,
      });
    }, [updateSettings]);

    const toggleAutoRun = useCallback(() => {
      updateSettings({ autoRun: !settings.autoRun });
    }, [settings.autoRun, updateSettings]);

    const toggleNotifications = useCallback(() => {
      updateSettings({ notifications: !settings.notifications });
    }, [settings.notifications, updateSettings]);

    const toggleCompactView = useCallback(() => {
      updateSettings({ compactView: !settings.compactView });
    }, [settings.compactView, updateSettings]);

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={resetToDefaults}
            className={`p-2 rounded-md transition-colors ${
              settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            title="Reset to defaults"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.autoRun}
            onChange={toggleAutoRun}
            icon={<Play className="w-5 h-5" />}
            label="Auto Run"
            darkMode={settings.darkMode}
          />
          <ToggleSwitch
            checked={settings.notifications}
            onChange={toggleNotifications}
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
            darkMode={settings.darkMode}
          />
          <ToggleSwitch
            checked={settings.compactView}
            onChange={toggleCompactView}
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Compact View"
            darkMode={settings.darkMode}
          />
        </div>
      </div>
    );
  }
);

export default SettingsPanel;
