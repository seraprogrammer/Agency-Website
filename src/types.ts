export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'running' | 'complete';
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface LogEntry {
  id: number;
  timestamp: Date;
  message: string;
  level: 'info' | 'warning' | 'error';
}

export interface AppSettings {
  darkMode: boolean;
  autoRun: boolean;
  notifications: boolean;
  compactView: boolean;
}

export type TaskFilter = {
  status: string[];
  priority: string[];
  search: string;
};