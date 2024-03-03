import React, { useState } from "react";

const UpdateTodoModal = ({ todoText, onUpdateTodo, onCancel }) => {
  const [updatedTodoText, setUpdatedTodoText] = useState(todoText);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateTodo(updatedTodoText);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updatedTodoText}
          onChange={(e) => setUpdatedTodoText(e.target.value)}
        />
        <button type="submit">Update</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateTodoModal;
