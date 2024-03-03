import React, { useState } from "react";

const UpdateTodoModal = ({ todoText, onUpdateTodo, onCancel }) => {
  const [updatedTodoText, setUpdatedTodoText] = useState(todoText);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateTodo(updatedTodoText);
  };

  return (
    <div className="update-todo-modal">
      <h2>Update Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updatedTodoText}
          onChange={(e) => setUpdatedTodoText(e.target.value)}
        />
        <div className="modal-buttons">
          <button type="submit">Update</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodoModal;
