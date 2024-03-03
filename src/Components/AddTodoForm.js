import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [newTodoText, setNewTodoText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTodo(newTodoText);
    setNewTodoText("");
  };

  return (
    <div className="add-todo-form">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
