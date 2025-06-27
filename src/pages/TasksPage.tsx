import React, { useState, useMemo } from 'react';
import { CheckSquare2, ListTodo } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, TaskFilter as TaskFilterType } from '../types';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import { TaskFilter } from '../components/TaskFilter';
import { SearchInput } from '../components/SearchInput';
import { Card } from '../components/Card';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        return filtered.filter(task => !task.completed);
      case 'completed':
        return filtered.filter(task => task.completed);
      default:
        return filtered;
    }
  }, [tasks, filter, searchQuery]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <CheckSquare2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Task Manager
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize your tasks efficiently with our beautiful task management system. 
          Add, complete, and filter your tasks with ease.
        </p>
      </div>

      {/* Task Form */}
      <TaskForm onAddTask={addTask} />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tasks..."
          className="w-full sm:max-w-md"
        />
        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <ListTodo className="w-16 h-16 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {searchQuery || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? `No tasks match "${searchQuery}"`
                  : filter !== 'all'
                  ? `No ${filter} tasks`
                  : 'Get started by adding your first task above.'
                }
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Task Statistics */}
      {tasks.length > 0 && (
        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{taskCounts.all}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">{taskCounts.active}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{taskCounts.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};