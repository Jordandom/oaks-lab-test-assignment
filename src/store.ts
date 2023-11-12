import { generateUniqueId } from '@utils/helpers';
import { produce } from 'immer';
import { Phase, ProgressState } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProjectStore = {
  phases: Phase[];
  actions: {
    createTask: (phaseId: string, taskName: string) => void;
    switchTaskState: (phaseId: string, taskId: string) => void;
    resetTasks: () => void;
  };
};

const initialPhases: Phase[] = [
  { name: 'Foundation', completed: false, order: 1, tasks: [] },
  { name: 'Discovery', completed: false, order: 2, tasks: [] },
  { name: 'Delivery', completed: false, order: 3, tasks: [] },
];

/**
 * Returns the phase with the given ID from the provided array of phases.
 * @param phases - The array of phases to search through.
 * @param phaseId - The ID of the phase to find.
 * @returns The phase with the given ID.
 * @throws An error if the phase with the given ID is not found.
 */
function getPhaseById(phases: Phase[], phaseId: string) {
  const targetPhase = phases.find((phase) => phase.name === phaseId);
  if (!targetPhase) throw new Error(`Phase '${phaseId}' not found.`);
  return targetPhase;
}

/**
 * Creates a new task in the specified phase.
 * @param {Phase[]} phases - The array of phases.
 * @param {string} phaseId - The id of the phase where the task will be created.
 * @param {string} taskName - The name of the task.
 * @returns {Phase[]} - The updated array of phases.
 */
function createTask(
  phases: Phase[],
  phaseId: string,
  taskName: string
): Phase[] {
  return produce(phases, (draft) => {
    const phase = getPhaseById(draft, phaseId);
    phase.tasks.push({
      id: generateUniqueId(),
      name: taskName,
      progress: ProgressState.New,
    });
  });
}

/**
 * Updates the progress state of a task in the given phases array.
 * @param phases - The array of phases to update.
 * @param phaseId - The ID of the phase containing the task to update.
 * @param taskId - The ID of the task to update.
 * @returns A new array of phases with the updated task progress state.
 * @throws An error if the task or a prerequisite task is not found, or if undo is not allowed.
 */
function switchTaskState(phases: Phase[], phaseId: string, taskId: string) {
  return produce(phases, (draft) => {
    const phase = getPhaseById(draft, phaseId);
    const task = phase.tasks.find((task) => task.id === taskId);
    if (!task) throw new Error(`Task '${taskId}' not found.`);

    if (task.progress === ProgressState.New) {
      const previousPhase = draft.find((i) => i.order === phase.order - 1);
      if (!isPhaseCompleted(previousPhase)) {
        throw new Error(`Complete tasks in '${previousPhase?.name}' first.`);
      }
      task.progress = ProgressState.Completed;
    } else if (task.progress === ProgressState.Completed) {
      if (isPhaseCompleted(phase)) {
        throw new Error(`Undo not allowed: '${phaseId}' phase completed.`);
      }
      task.progress = ProgressState.New;
    }

    phase.completed = phase.tasks.every(
      (task) => task.progress === ProgressState.Completed
    );
  });
}

/**
 * Determines if a given phase is completed.
 * A phase is considered completed if all of its tasks are completed and the phase itself is marked as completed.
 * @param phase - The phase to check.
 * @returns A boolean indicating whether the phase is completed or not.
 */
function isPhaseCompleted(phase: Phase | undefined) {
  return (
    !phase ||
    (phase.tasks.every((task) => task.progress === ProgressState.Completed) &&
      phase.completed)
  );
}

/**
 * A custom hook that returns a store object for managing project phases and tasks.
 * @returns An object containing the phases and actions to manipulate them.
 */
const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      phases: initialPhases,
      actions: {
        createTask: (phaseId, taskName) =>
          set((state) => ({
            phases: createTask(state.phases, phaseId, taskName),
          })),
        switchTaskState: (phaseId, taskId) =>
          set((state) => ({
            phases: switchTaskState(state.phases, phaseId, taskId),
          })),
        resetTasks: () => set({ phases: initialPhases }),
      },
    }),
    {
      name: 'project-store',
      partialize: ({ phases }) => ({ phases }),
    }
  )
);

export const usePhases = () => useProjectStore((state) => state.phases);
export const usePhaseById = (phaseId: string) =>
  useProjectStore((state) =>
    state.phases.find((phase) => phase.name === phaseId)
  );
export const usePhaseActions = () => useProjectStore((state) => state.actions);
