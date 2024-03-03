import React, { useState, useEffect } from 'react';
import TodoList from './Components/TodoList';
import UpdateTodoModal from './Components/UpdateTodoModal';
import AddTodoForm from './Components/AddTodoForm';



const App = () => {
  const [todos, setTodos] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateTodoText, setUpdateTodoText] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    // Fetch todos from backend when component mounts
    // You can use fetch API or axios for this
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTodo = (newTodoText) => {
    // Add new todo to backend
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTodoText }),
    })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]))
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleUpdateTodo = (updatedTodoText) => {
    // Update selected todo in backend
    fetch(`http://localhost:5000/todos/${selectedTodoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: updatedTodoText }),
    })
      .then(() => {
        const updatedTodos = todos.map(todo =>
          todo.id === selectedTodoId ? { ...todo, task: updatedTodoText } : todo
        );
        setTodos(updatedTodos);
        setShowUpdateModal(false);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const handleDeleteTodo = (id) => {
    // Delete selected todo from backend
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
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

export default App