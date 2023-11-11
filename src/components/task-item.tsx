import React, { memo } from 'react';
import { usePhase, usePhaseActions } from 'store'; // Adjust the path as necessary
import { Task as TaskType } from 'types'; // Adjust the import path as necessary

type TaskItemProps = {
  task: TaskType;
  phaseId: string;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({ task, phaseId }) => {
  const { toggleTaskCompletion, isPreviousPhaseCompleted } = usePhaseActions();

  const phase = usePhase(phaseId);
  const canToggleTask =
    isPreviousPhaseCompleted(phaseId) && !phase?.isCompleted;

  const handleToggle = () => {
    if (canToggleTask) {
      toggleTaskCompletion(phaseId, task.id);
    }
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
          disabled={!canToggleTask}
        />
        {task.name}
      </label>
    </li>
  );
};

export const TaskItem = memo(TaskItemComponent);
