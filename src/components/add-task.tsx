type AddTaskFormProps = {
  onClose: () => void;
  onSubmit: ({ taskName }: { taskName: string }) => void;
};

export const AddTask = ({ onClose, onSubmit }: AddTaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({ taskName: e.currentTarget.taskName.value });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        className="rounded border border-black px-3 py-1 placeholder:text-slate-500"
        type="text"
        name="taskName"
        placeholder="Enter task name"
        required
        autoFocus
      />
      <div className="flex items-center gap-2">
        <input
          className="cursor-pointer rounded bg-black px-3 py-1 text-white"
          type="submit"
          value="Add"
        />
        <button
          className="rounded border border-black bg-transparent px-3 py-1 text-black"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
