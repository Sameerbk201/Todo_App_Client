import React from 'react';

const TodoList = ({ todos, onUpdate, onDelete }) => (
  <div className="todo-list">
    <h2>Todo List</h2>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.task}</span>
          <div className="actions">
            <button onClick={() => onUpdate(todo.id, todo.task)}>Update</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default TodoList;
