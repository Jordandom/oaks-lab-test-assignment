import { useRandomFact } from '@hooks/use-random-fact';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { usePhaseActions } from 'store';

export const RandomFact = () => {
  const { randomFact, error, resetFact } = useRandomFact();
  const { resetTasks } = usePhaseActions();

  const handleStartNewStartup = useCallback(() => {
    toast(
      'This will reset your progress and start fresh. Are you sure you want to proceed?',
      {
        duration: 10_000,
        action: {
          label: 'Confirm',
          onClick: () => {
            resetTasks();
            resetFact();
          },
        },
      }
    );
  }, [resetFact, resetTasks]);

  if (error) {
    return <p className="text-sm font-semibold text-red-600">Error: {error}</p>;
  }

  if (!randomFact) return null;

  return (
    <div className="mx-auto mt-4 max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <p className="mb-4 text-base text-gray-700">
        Amazing work! You have successfully completed your startup journey. 🌟
        As a reward, here is an interesting fact to enjoy during your
        well-deserved break:
      </p>
      <p className="mb-6 font-medium text-indigo-600">{randomFact}</p>
      <button
        onClick={handleStartNewStartup}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Initiate New Startup
      </button>
    </div>
  );
};
