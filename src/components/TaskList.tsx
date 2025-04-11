import React, { useState, useMemo, useCallback } from "react";
import { CheckCircle2, Clock, Play, Plus, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";
import { Task, AppSettings, TaskFilter } from "../types";

interface TaskListProps {
  settings: AppSettings;
}

const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: "Data Processing",
    status: "complete",
    createdAt: new Date("2024-03-10T10:00:00"),
    priority: "high",
  },
  {
    id: 2,
    title: "API Integration",
    status: "running",
    createdAt: new Date("2024-03-11T14:30:00"),
    priority: "medium",
  },
  {
    id: 3,
    title: "Backup System",
    status: "pending",
    createdAt: new Date("2024-03-12T09:15:00"),
    priority: "low",
  },
];

// Extracted task item component to prevent re-rendering of all tasks
const TaskItem = React.memo(
  ({
    task,
    onDelete,
    darkMode,
  }: {
    task: Task;
    onDelete: (id: number) => void;
    darkMode: boolean;
  }) => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "pending":
          return <Clock className="w-5 h-5 text-yellow-500" />;
        case "running":
          return <Play className="w-5 h-5 text-blue-500" />;
        case "complete":
          return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        default:
          return null;
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "text-red-500";
        case "medium":
          return "text-yellow-500";
        case "low":
          return "text-green-500";
        default:
          return "";
      }
    };

    return (
      <div
        className={`p-3 rounded-md ${
          darkMode ? "bg-gray-700" : "bg-gray-50"
        } transition-colors duration-200`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{format(task.createdAt, "MMM d, yyyy HH:mm")}</span>
                <span
                  className={`font-medium ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
);

const TaskList: React.FC<TaskListProps> = React.memo(({ settings }) => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filters, setFilters] = useState<TaskFilter>({
    status: [],
    priority: [],
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.status);
      const matchesPriority =
        filters.priority.length === 0 ||
        filters.priority.includes(task.priority);
      const matchesSearch = task.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filters]);

  const addTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTaskTitle.trim()) return;

      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        status: "pending",
        createdAt: new Date(),
        priority: "medium",
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setNewTaskTitle("");
    },
    [newTaskTitle]
  );

  const deleteTask = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const toggleFilter = useCallback((type: keyof TaskFilter, value: string) => {
    setFilters((prev) => {
      const currentFilter = prev[type] as string[];
      return {
        ...prev,
        [type]: currentFilter.includes(value)
          ? currentFilter.filter((v) => v !== value)
          : [...currentFilter, value],
      };
    });
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
    },
    []
  );

  const toggleFiltersVisibility = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleNewTaskChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.target.value);
    },
    []
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <button
          onClick={toggleFiltersVisibility}
          className={`p-2 rounded-md transition-colors ${
            settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            settings.darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            />
            <div className="flex flex-wrap gap-2">
              {["pending", "running", "complete"].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleFilter("status", status)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.status.includes(status)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["low", "medium", "high"].map((priority) => (
                <button
                  key={priority}
                  onClick={() => toggleFilter("priority", priority)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.priority.includes(priority)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={handleNewTaskChange}
            placeholder="Add new task..."
            className={`flex-1 p-2 rounded-md border ${
              settings.darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              darkMode={settings.darkMode}
            />
          ))
        ) : (
          <div
            className={`p-4 text-center rounded-md ${
              settings.darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default TaskList;
