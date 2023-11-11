import React, { useState } from 'react';

type AddTaskFormProps = {
  onSubmit: (taskName: string) => void;
  onClose: () => void;
};

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(taskName);
    setTaskName('');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="New Task Name"
        required
        autoFocus
      />
      <div>
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
