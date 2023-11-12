import { generateId } from '@utils/helpers';
import { produce } from 'immer';
import { Phase, ProgressState } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  phases: Phase[];
  actions: {
    addTask: (phaseName: string, taskName: string) => void;
    toggleTaskCompletion: (phaseName: string, taskId: string) => void;
    resetAllTasks: () => void;
  };
};

function findPhase(phases: Phase[], phaseId: string) {
  const phase = phases.find((phase) => phase.name === phaseId);
  if (!phase) throw new Error(`Phase '${phaseId}' not found.`);
  return phase;
}

function addTask(phases: Phase[], phaseId: string, taskName: string) {
  return produce(phases, (draft) => {
    const phase = findPhase(draft, phaseId);
    phase.tasks.push({
      id: generateId(),
      name: taskName,
      progress: ProgressState.New,
    });
  });
}

function toggleTaskCompletion(
  phases: Phase[],
  phaseId: string,
  taskId: string
) {
  return produce(phases, (draft) => {
    const phase = findPhase(draft, phaseId);
    const task = phase.tasks.find((task) => task.id === taskId);
    if (!task) throw new Error(`Task '${taskId}' not found.`);

    // Toggle the task's completion state
    if (task.progress === ProgressState.New) {
      // Complete the task
      const previousPhase = draft.find((i) => i.order === phase.order - 1);
      if (!isPhaseCompleted(previousPhase)) {
        throw new Error(
          `You have to complete all tasks in '${previousPhase?.name}' phase first.`
        );
      }
      task.progress = ProgressState.Completed;
    } else if (task.progress === ProgressState.Completed) {
      // Undo the task
      if (isPhaseCompleted(phase))
        throw new Error(
          `You can't undo the task '${task.name}' because '${phaseId}' phase has been completed.`
        );
      task.progress = ProgressState.New;
    }

    // Update phase completion status
    phase.completed = phase.tasks.every(
      (t) => t.progress === ProgressState.Completed
    );
  });
}

function isPhaseCompleted(phase: Phase | undefined) {
  // Undefined phase is considered as completed
  if (!phase) return true;

  return (
    phase.tasks.every((task) => task.progress === ProgressState.Completed) &&
    phase.completed
  );
}

const initialPhases: Phase[] = [
  { name: 'Foundation', completed: false, order: 1, tasks: [] },
  { name: 'Discovery', completed: false, order: 2, tasks: [] },
  { name: 'Delivery', completed: false, order: 3, tasks: [] },
];

const useStore = create<Store>()(
  persist(
    (set) => ({
      phases: initialPhases,
      actions: {
        addTask: (phaseId, taskName) =>
          set((state) => ({
            phases: addTask(state.phases, phaseId, taskName),
          })),
        toggleTaskCompletion: (phaseId, taskId) =>
          set((state) => ({
            phases: toggleTaskCompletion(state.phases, phaseId, taskId),
          })),
        resetAllTasks: () => set({ phases: initialPhases }),
      },
    }),
    {
      name: 'phases-store',
      partialize: ({ phases }) => ({
        phases,
      }),
    }
  )
);

export const usePhases = () => useStore((state) => state.phases);
export const usePhase = (phaseId: string) =>
  useStore((state) => state.phases.find((phase) => phase.name === phaseId));
export const useActions = () => useStore((state) => state.actions);
