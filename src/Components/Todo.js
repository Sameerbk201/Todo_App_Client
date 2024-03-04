import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import UpdateTodoModal from "./UpdateTodoModal";
import AddTodoForm from "./AddTodoForm";

const Todo = () => {
  const baseUrl = "http://192.168.50.111:5000"; // Update this with your actual IP and port

  const [todos, setTodos] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateTodoText, setUpdateTodoText] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    // Fetch todos from backend when component mounts
    fetch(`${baseUrl}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = (newTodoText) => {
    // Add new todo to backend
    fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTodoText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos((prev) => [...prev, data]);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleUpdateTodo = (updatedTodoText) => {
    // Update selected todo in backend
    fetch(`${baseUrl}/todos/${selectedTodoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: updatedTodoText }),
    })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === selectedTodoId ? { ...todo, task: updatedTodoText } : todo
        );
        setTodos(updatedTodos);
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDeleteTodo = (id) => {
    // Delete selected todo from backend
    fetch(`${baseUrl}/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h1>Todo List Got V1.0.3</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onUpdate={(id, task) => {
          setSelectedTodoId(id);
          setUpdateTodoText(task);
          setShowUpdateModal(true);
        }}
        onDelete={handleDeleteTodo}
      />
      {showUpdateModal && (
        <UpdateTodoModal
          todoText={updateTodoText}
          onUpdateTodo={handleUpdateTodo}
          onCancel={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default Todo;
