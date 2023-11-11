import { AddTaskForm } from '@components/add-task-form';
import { TaskList } from '@components/task-list';
import React, { useState } from 'react';
import { usePhase, usePhaseActions } from 'store'; // Adjust the path as necessary

interface PhaseProps {
  phaseId: string;
}

const PhaseComponent: React.FC<PhaseProps> = ({ phaseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const phase = usePhase(phaseId);
  const { addTaskToPhase } = usePhaseActions();

  const handleAddTask = (taskName: string) => {
    addTaskToPhase(phaseId, taskName);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <h3>{phase?.id}</h3>
        {!phase?.isCompleted && (
          <button onClick={() => setIsOpen(true)}>New Task</button>
        )}
      </div>
      <TaskList tasks={phase?.tasks ?? []} phaseId={phaseId} />
      {isOpen && (
        <AddTaskForm
          onSubmit={handleAddTask}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const Phase = React.memo(PhaseComponent);
