import { fetchFunFact } from '@utils/helpers';
import { useCallback, useEffect, useState } from 'react';
import { useActions, usePhases } from 'store';

// Custom hook to fetch a fun fact when all phases are completed
const useRandomFact = () => {
  const phases = usePhases(); // destructuring to get phases directly
  const [randomFact, setRandomFact] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // AbortController is used to cancel the fetch request when the component is unmounted or when the phases dependency array changes before the fetch completes. This is a common pattern to avoid state updates on unmounted components and potential memory leaks.
    const abortController = new AbortController();

    if (phases.every((phase) => phase.completed)) {
      fetchFunFact(
        'https://uselessfacts.jsph.pl/random.json',
        abortController.signal
      )
        .then(setRandomFact)
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setError(error.message);
          }
        });
    }

    return () => {
      abortController.abort();
    };
  }, [phases]);

  const resetFact = useCallback(() => {
    setRandomFact('');
    setError('');
  }, []);

  return { randomFact, error, resetFact };
};

export const RandomFact = () => {
  const { randomFact, error, resetFact } = useRandomFact();
  const { resetAllTasks } = useActions();

  const handleStartNewStartup = useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to start a new startup? This action will delete all tasks.'
      )
    ) {
      resetAllTasks();
      resetFact();
    }
  }, [resetAllTasks, resetFact]);

  if (error) {
    return <p className="TODO">Error: {error}</p>; // Using a generic error class for styling
  }

  if (!randomFact) return null;

  return (
    <div className="TODO">
      <p>
        Congratulations! You have finished the last phase of your startup! 🎉
        Let's take a break and enjoy this fun fact:
      </p>
      <p className="TODO">{randomFact}</p>
      <button onClick={handleStartNewStartup}>Start a new Startup</button>
    </div>
  );
};
