import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Calendar, Clock } from 'lucide-react';
import './TodoSidebar.css';

const TodoSidebar = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium'
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className={`todo-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="todo-header">
        <h3>My Tasks</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="todo-stats">
        <div className="stat">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalCount - completedCount}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="add-btn">
          <Plus size={16} />
        </button>
      </div>

      <div className="todo-filters">
        {['all', 'pending', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <button
              onClick={() => toggleTodo(todo.id)}
              className="check-btn"
            >
              <Check size={14} />
            </button>
            <div className="todo-content">
              <span className="todo-text">{todo.text}</span>
              <span className="todo-date">
                <Clock size={12} />
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="empty-state">
          <Calendar size={48} />
          <p>No tasks {filter !== 'all' ? filter : 'yet'}</p>
        </div>
      )}
    </div>
  );
};

export default TodoSidebar;