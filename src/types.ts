export type Phase = {
  name: string;
  order: number;
  tasks: Task[];
  completed: boolean;
};

export enum ProgressState {
  New = 'new',
  Completed = 'completed',
}

export type TaskProgress = ProgressState;

export type Task = {
  id: string;
  name: string;
  progress: TaskProgress;
};

export type TaskChangeEvent = {
  id: string;
  progress: TaskProgress;
};
