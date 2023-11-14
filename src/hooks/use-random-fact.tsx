import { fetchRandomFact } from '@utils/helpers';
import { useCallback, useEffect, useState } from 'react';
import { usePhases } from 'store';

/**
 * Custom hook that fetches a random fact from 'https://uselessfacts.jsph.pl/random.json' API when all phases are completed.
 * @returns An object containing the random fact, error message, and a function to reset the fact and error.
 */
export const useRandomFact = () => {
  const phases = usePhases();
  const [randomFact, setRandomFact] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchFact = useCallback(
    async (signal: AbortSignal) => {
      if (phases.every((phase) => phase.completed)) {
        try {
          const fact = await fetchRandomFact(
            'https://uselessfacts.jsph.pl/random.json',
            signal
          );
          setRandomFact(fact);
        } catch (error) {
          if (!signal.aborted) {
            setError(
              error instanceof Error ? error.message : (error as string)
            );
          }
        }
      }
    },
    [phases]
  );

  const resetFact = useCallback(() => {
    setRandomFact('');
    setError('');
  }, []);

  useEffect(() => {
    // AbortController is used to cancel the fetch request when the component is unmounted or when the phases dependency array changes before the fetch completes. This is a common pattern to avoid state updates on unmounted components and potential memory leaks.
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchFact(signal);

    return () => {
      abortController.abort();
    };
  }, [fetchFact, phases]);

  return { randomFact, error, resetFact };
};
