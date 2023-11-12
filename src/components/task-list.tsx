import { memo } from 'react';
import { ProgressState, Task, TaskChangeEvent } from 'types';

type TaskListProps = {
  tasks: Task[];
  onTaskChange?: ({ id, progress }: TaskChangeEvent) => void;
};

export const TaskList = ({ tasks, onTaskChange }: TaskListProps) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <div key={task.id} className={index !== 0 ? 'mt-2' : 'mt-0'}>
          <MemoizedTaskItem task={task} onTaskChange={onTaskChange} />
        </div>
      ))}
    </ul>
  );
};

const TaskItem = ({
  task,
  onTaskChange = () => false,
}: {
  task: Task;
  onTaskChange?: ({ id, progress }: TaskChangeEvent) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.progress === ProgressState.Completed}
        onChange={(event) =>
          onTaskChange({
            id: task.id,
            progress: event.currentTarget.checked
              ? ProgressState.Completed
              : ProgressState.New,
          })
        }
      />
      {task.name}
    </div>
  );
};

const MemoizedTaskItem = memo(TaskItem);
