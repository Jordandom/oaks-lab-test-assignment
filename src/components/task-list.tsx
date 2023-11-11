import { TaskItem } from '@components/task-item';
import React from 'react';
import { Task as TaskType } from 'types'; // Adjust the import path as necessary

type TaskListProps = {
  tasks: TaskType[];
  phaseId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, phaseId }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} phaseId={phaseId} />
      ))}
    </ul>
  );
};
