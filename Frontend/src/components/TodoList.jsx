import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle, 
  Circle, 
  Trash2, 
  Edit3, 
  Calendar,
  Clock,
  Flag,
  Filter,
  Search,
  Target,
  TrendingUp,
  Star,
  AlertCircle
} from 'lucide-react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Personal',
    dueDate: '',
    reminder: false
  });

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // Initialize with some default todos
      const defaultTodos = [
        {
          id: 1,
          title: 'Complete React Project',
          description: 'Finish the IntelliLearn dashboard',
          completed: false,
          priority: 'High',
          category: 'Work',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          completedAt: null,
          reminder: true
        },
        {
          id: 2,
          title: 'Study DSA',
          description: 'Practice array and string problems',
          completed: true,
          priority: 'Medium',
          category: 'Study',
          dueDate: '',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          completedAt: new Date().toISOString(),
          reminder: false
        },
        {
          id: 3,
          title: 'Exercise',
          description: '30 minutes workout',
          completed: false,
          priority: 'Low',
          category: 'Health',
          dueDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          completedAt: null,
          reminder: true
        }
      ];
      setTodos(defaultTodos);
      localStorage.setItem('todoList', JSON.stringify(defaultTodos));
    }
  }, []);

  // Save todos to localStorage
  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null
        };
      }
      return todo;
    });
    saveTodos(updatedTodos);
  };

  // Add new todo
  const addTodo = () => {
    if (!newTodo.title.trim()) return;
    
    const todo = {
      id: Date.now(),
      ...newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    saveTodos([...todos, todo]);
    resetForm();
    setShowAddModal(false);
  };

  // Delete todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(t => t.id !== id);
    saveTodos(updatedTodos);
  };

  // Edit todo
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate,
      reminder: todo.reminder
    });
    setShowAddModal(true);
  };

  // Update todo
  const updateTodo = () => {
    const updatedTodos = todos.map(t => 
      t.id === editingTodo.id 
        ? { ...t, ...newTodo }
        : t
    );
    saveTodos(updatedTodos);
    setEditingTodo(null);
    resetForm();
    setShowAddModal(false);
  };

  // Reset form
  const resetForm = () => {
    setNewTodo({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Personal',
      dueDate: '',
      reminder: false
    });
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed) ||
      (filter === 'today' && isToday(todo.dueDate)) ||
      (filter === 'overdue' && isOverdue(todo.dueDate) && !todo.completed);
    
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Helper functions
  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toDateString();
    const todoDate = new Date(dateString).toDateString();
    return today === todoDate;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const todoDate = new Date(dateString);
    return todoDate < today;
  };

  // Calculate stats
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => isOverdue(t.dueDate) && !t.completed).length,
    today: todos.filter(t => isToday(t.dueDate)).length,
    completedToday: todos.filter(t => {
      if (!t.completedAt) return false;
      const today = new Date().toDateString();
      const completedDate = new Date(t.completedAt).toDateString();
      return today === completedDate;
    }).length
  };

  const categories = ['Personal', 'Work', 'Study', 'Health', 'Shopping', 'Other'];
  const priorities = ['Low', 'Medium', 'High'];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <AlertCircle size={16} className="priority-high" />;
      case 'Medium': return <Flag size={16} className="priority-medium" />;
      case 'Low': return <Circle size={16} className="priority-low" />;
      default: return <Flag size={16} />;
    }
  };

  return (
    <div className="todo-root">
      {/* Header */}
      <div className="todo-header">
        <div className="todo-header-content">
          <h1>✅ My Tasks</h1>
          <p>Stay organized and productive with your daily tasks</p>
        </div>
        <button 
          className="todo-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="todo-stats-grid">
        <div className="todo-stat-card">
          <div className="todo-stat-icon">
            <Target size={24} />
          </div>
          <div className="todo-stat-content">
            <h3>{stats.completed}/{stats.total}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
        <div className="todo-stat-card">
          <div className="todo-stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="todo-stat-content">
            <h3>{Math.round((stats.completed / stats.total) * 100) || 0}%</h3>
            <p>Progress</p>
          </div>
        </div>
        <div className="todo-stat-card">
          <div className="todo-stat-icon">
            <Calendar size={24} />
          </div>
          <div className="todo-stat-content">
            <h3>{stats.today}</h3>
            <p>Due Today</p>
          </div>
        </div>
        <div className="todo-stat-card overdue">
          <div className="todo-stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="todo-stat-content">
            <h3>{stats.overdue}</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="todo-controls">
        <div className="todo-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="todo-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'today' ? 'active' : ''}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button 
            className={filter === 'overdue' ? 'active' : ''}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
        </div>
      </div>

      {/* Todos List */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="todo-empty-state">
            <CheckCircle size={48} />
            <h3>No tasks found</h3>
            <p>Add some tasks to stay organized and productive!</p>
          </div>
        ) : (
          filteredTodos
            .sort((a, b) => {
              // Sort by completion status, then by priority, then by due date
              if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
              }
              const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
              if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              }
              if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
              }
              return 0;
            })
            .map(todo => (
              <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) && !todo.completed ? 'overdue' : ''}`}>
                <div className="todo-main">
                  <button 
                    className="todo-checkbox"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </button>
                  <div className="todo-content">
                    <div className="todo-title-row">
                      <h3>{todo.title}</h3>
                      <div className="todo-priority">
                        {getPriorityIcon(todo.priority)}
                      </div>
                    </div>
                    {todo.description && (
                      <p className="todo-description">{todo.description}</p>
                    )}
                    <div className="todo-meta">
                      <span className="todo-category">{todo.category}</span>
                      {todo.dueDate && (
                        <span className={`todo-due-date ${isOverdue(todo.dueDate) && !todo.completed ? 'overdue' : isToday(todo.dueDate) ? 'today' : ''}`}>
                          <Calendar size={14} />
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {todo.reminder && (
                        <span className="todo-reminder">
                          <Clock size={14} />
                          Reminder
                        </span>
                      )}
                      {todo.completedAt && (
                        <span className="todo-completed-date">
                          ✅ {new Date(todo.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="todo-actions">
                  <button 
                    className="todo-action-btn"
                    onClick={() => editTodo(todo)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="todo-action-btn delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="todo-modal-overlay">
          <div className="todo-modal">
            <h2>{editingTodo ? 'Edit Task' : 'Add New Task'}</h2>
            <div className="todo-form">
              <input
                type="text"
                placeholder="Task title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
              />
              <textarea
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                rows="3"
              />
              <div className="todo-form-row">
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority} Priority</option>
                  ))}
                </select>
                <select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <input
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
              />
              <label className="todo-checkbox-label">
                <input
                  type="checkbox"
                  checked={newTodo.reminder}
                  onChange={(e) => setNewTodo({...newTodo, reminder: e.target.checked})}
                />
                Set reminder
              </label>
              <div className="todo-modal-actions">
                <button 
                  className="todo-btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTodo(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="todo-btn-primary"
                  onClick={editingTodo ? updateTodo : addTodo}
                >
                  {editingTodo ? 'Update' : 'Add'} Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;