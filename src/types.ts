export type Phase = {
  id: string;
  tasks: Task[];
  order: number;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export type TaskChangeEvent = {
  id: string;
  isCompleted: boolean;
};
