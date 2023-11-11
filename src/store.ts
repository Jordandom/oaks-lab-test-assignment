import { generateUniqueId } from '@utils/helpers';
import { produce } from 'immer';
import { Phase, Task } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialPhases: Phase[] = [
  {
    id: 'foundation',
    order: 1,
    isCompleted: false,
    tasks: [],
  },
  {
    id: 'discovery',
    order: 3,
    isCompleted: false,
    tasks: [],
  },
  {
    id: 'delivery',
    order: 4,
    isCompleted: false,
    tasks: [],
  },
];

type Store = {
  phases: Phase[];
  actions: {
    addTaskToPhase: (phaseId: string, taskName: string) => void;
    toggleTaskCompletion: (phaseId: string, taskId: string) => void;
    isPreviousPhaseCompleted: (currentPhaseId: string) => boolean;
    resetPhases: () => void;
  };
};

const findPhaseById = (phases: Phase[], phaseId: string): Phase => {
  const phase = phases.find((phase) => phase.id === phaseId);
  if (!phase) throw new Error(`Phase with ID '${phaseId}' not found.`);
  return phase;
};

const areAllTasksCompleted = (tasks: Task[]): boolean =>
  tasks.every((task) => task.isCompleted);

const toggleTaskCompletion = (
  phases: Phase[],
  phaseId: string,
  taskId: string
): Phase[] =>
  produce(phases, (draft) => {
    const phase = findPhaseById(draft, phaseId);

    if (phase.tasks.length === 0) {
      throw new Error(`No tasks found in phase '${phaseId}'.`);
    }

    const taskIndex = phase.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(
        `Task with ID '${taskId}' not found in phase '${phaseId}'.`
      );
    }

    phase.tasks[taskIndex] = {
      ...phase.tasks[taskIndex],
      isCompleted: !phase.tasks[taskIndex].isCompleted,
    };

    if (areAllTasksCompleted(phase.tasks)) {
      phase.isCompleted = true;
    }
  });

const addTaskToPhase = (
  phases: Phase[],
  phaseId: string,
  taskName: string
): Phase[] =>
  produce(phases, (draft) => {
    const phase = findPhaseById(draft, phaseId);
    phase.tasks.push({
      id: generateUniqueId(),
      name: taskName,
      isCompleted: false,
    });
  });

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      phases: initialPhases,
      actions: {
        addTaskToPhase: (phaseId, taskName) =>
          set((state) => ({
            phases: addTaskToPhase(state.phases, phaseId, taskName),
          })),
        toggleTaskCompletion: (phaseId, taskId) =>
          set((state) => ({
            phases: toggleTaskCompletion(state.phases, phaseId, taskId),
          })),
        isPreviousPhaseCompleted: (currentPhaseId) => {
          const phases = get().phases;
          const currentPhaseIndex = phases.findIndex(
            (phase) => phase.id === currentPhaseId
          );

          // If the current phase is the first one, or not found, previous phase is considered completed
          if (currentPhaseIndex <= 0) return true;

          const previousPhase = phases[currentPhaseIndex - 1];
          return previousPhase.isCompleted;
        },
        resetPhases: () => set({ phases: initialPhases }),
      },
    }),
    {
      name: 'phases-store',
      partialize: (state) => ({ phases: state.phases }),
    }
  )
);

export const usePhases = () => useStore((state) => state.phases);
export const usePhase = (phaseId: string) =>
  useStore((state) => state.phases.find((phase) => phase.id === phaseId));
export const usePhaseActions = () => useStore((state) => state.actions);
