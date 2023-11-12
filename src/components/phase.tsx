import { Heading } from '@components/heading';
import { TaskCreateForm } from '@components/task-create-form';
import { TaskList } from '@components/task-list';
import { memo, useCallback, useState } from 'react';
import { usePhaseActions, usePhaseById } from 'store';
import { ProgressState, TaskChangeEvent } from 'types';

type PhaseProps = {
  phaseName: string;
};

const PhaseComponent = ({ phaseName }: PhaseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const phase = usePhaseById(phaseName);
  const { createTask, switchTaskState } = usePhaseActions();

  const handleTaskProgressChange = useCallback(
    ({ id, progress }: TaskChangeEvent) => {
      try {
        if (progress === ProgressState.Completed)
          switchTaskState(phaseName, id);
        else if (progress === ProgressState.New) switchTaskState(phaseName, id);
        else throw new Error(`Invalid task status '${progress}'.`);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert(`An unexpected error occurred: ${error}}`);
        }
      }
    },
    [switchTaskState, phaseName]
  );

  const handleCreateTask = ({ taskName }: { taskName: string }) => {
    try {
      createTask(phaseName, taskName);
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
        <Heading size="m" title={phase?.name} />
        {phase?.completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
          </svg>
        ) : (
          <button
            className="rounded-xl bg-black p-2 text-white"
            onClick={() => setIsOpen(true)}
          >
            New task
          </button>
        )}
      </div>
      <div className="ml-2">
        <div className="mb-2">
          <TaskList
            tasks={phase?.tasks ?? []}
            onTaskChange={handleTaskProgressChange}
          />
        </div>
        {isOpen && (
          <TaskCreateForm
            onSubmit={handleCreateTask}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export const Phase = memo(PhaseComponent);
