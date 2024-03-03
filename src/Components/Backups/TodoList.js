import React from "react";

const TodoList = ({ todos, onUpdate, onDelete }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.task}
        <button onClick={() => onUpdate(todo.id, todo.task)}>Update</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
