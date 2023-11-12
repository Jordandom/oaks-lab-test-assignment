import { AddTask } from '@components/add-task';
import { TaskList } from '@components/task-list';
import { memo, useCallback, useState } from 'react';
import { useActions, usePhase } from 'store';
import { ProgressState, TaskChangeEvent } from 'types';

type PhaseProps = {
  phaseName: string;
};

const PhaseComponent = ({ phaseName }: PhaseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const phase = usePhase(phaseName);
  const { addTask, toggleTaskCompletion } = useActions();

  const handleTaskChange = useCallback(
    ({ id, progress }: TaskChangeEvent) => {
      try {
        if (progress === ProgressState.Completed)
          toggleTaskCompletion(phaseName, id);
        else if (progress === ProgressState.New)
          toggleTaskCompletion(phaseName, id);
        else throw new Error(`Invalid task status '${progress}'.`);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert(`An unexpected error occurred: ${error}}`);
        }
      }
    },
    [toggleTaskCompletion, phaseName]
  );

  const handleAddTask = ({ taskName }: { taskName: string }) => {
    try {
      addTask(phaseName, taskName);
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
          {phase?.order}
        </span>
        {phase?.completed ? (
          <span title={`Phase ${phase?.name} has been completed.`}>✅</span>
        ) : (
          <button
            className="rounded-xl bg-black p-2 text-white"
            onClick={() => setIsOpen(true)}
          >
            New task
          </button>
        )}
        <h3 className="text-2xl font-semibold">{phase?.name}</h3>
      </div>
      <div className="ml-2">
        <div className="mb-2">
          <TaskList
            tasks={phase?.tasks ?? []}
            onTaskChange={handleTaskChange}
          />
        </div>
        {isOpen && (
          <AddTask onSubmit={handleAddTask} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </>
  );
};

export const Phase = memo(PhaseComponent);
