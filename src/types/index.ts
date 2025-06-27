export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';