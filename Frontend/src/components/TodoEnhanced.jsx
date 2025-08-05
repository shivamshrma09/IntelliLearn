import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Calendar, Clock, Star, Flag, Search, Filter } from 'lucide-react';
import './TodoEnhanced.css';

const TodoEnhanced = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'general', name: 'General', color: 'blue', icon: '📝' },
    { id: 'study', name: 'Study', color: 'green', icon: '📚' },
    { id: 'coding', name: 'Coding', color: 'purple', icon: '💻' },
    { id: 'work', name: 'Work', color: 'orange', icon: '💼' },
    { id: 'personal', name: 'Personal', color: 'pink', icon: '🏠' }
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'high', name: 'High', color: 'red' }
  ];

  useEffect(() => {
    const savedTodos = localStorage.getItem('enhancedTodos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('enhancedTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: priority,
        category: category,
        dueDate: null
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

  const updatePriority = (id, newPriority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority: newPriority } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'completed' ? todo.completed :
      filter === 'pending' ? !todo.completed :
      filter === todo.priority || filter === todo.category;
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const highPriority = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
    
    return { total, completed, pending, highPriority };
  };

  const getCategoryStats = () => {
    return categories.map(cat => ({
      ...cat,
      count: todos.filter(todo => todo.category === cat.id && !todo.completed).length
    }));
  };

  const stats = getStats();
  const categoryStats = getCategoryStats();

  return (
    <div className={`todo-enhanced ${isOpen ? 'open' : ''}`}>
      <div className="todo-header-enhanced">
        <div className="header-top">
          <h3>✨ Smart Tasks</h3>
          <button onClick={onClose} className="close-btn-enhanced">×</button>
        </div>
        
        <div className="stats-overview">
          <div className="stat-item">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item urgent">
            <span className="stat-number">{stats.highPriority}</span>
            <span className="stat-label">Urgent</span>
          </div>
        </div>
      </div>

      <div className="todo-input-enhanced">
        <div className="input-row">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="todo-input-field"
          />
          <button onClick={addTodo} className="add-btn-enhanced">
            <Plus size={16} />
          </button>
        </div>
        
        <div className="input-options">
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            {priorities.map(p => (
              <option key={p.id} value={p.id}>{p.name} Priority</option>
            ))}
          </select>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
        >
          <Filter size={16} />
        </button>
      </div>

      {showFilters && (
        <div className="filters-section">
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Priority:</span>
            {priorities.map(p => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={`filter-chip priority-${p.color} ${filter === p.id ? 'active' : ''}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`filter-chip category-${cat.color} ${filter === cat.id ? 'active' : ''}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="categories-overview">
        {categoryStats.filter(cat => cat.count > 0).map(cat => (
          <div key={cat.id} className={`category-stat category-${cat.color}`}>
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
            <span className="category-count">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="todo-list-enhanced">
        {filteredTodos.length === 0 ? (
          <div className="empty-state-enhanced">
            <div className="empty-icon">
              {searchTerm ? '🔍' : filter === 'completed' ? '🎉' : '📝'}
            </div>
            <p>
              {searchTerm ? 'No tasks found' : 
               filter === 'completed' ? 'No completed tasks yet' : 
               'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          filteredTodos.map(todo => {
            const categoryInfo = categories.find(cat => cat.id === todo.category);
            const priorityInfo = priorities.find(p => p.id === todo.priority);
            
            return (
              <div key={todo.id} className={`todo-item-enhanced ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="check-btn-enhanced"
                >
                  <Check size={14} />
                </button>
                
                <div className="todo-content-enhanced">
                  <div className="todo-main">
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-badges">
                      <span className={`priority-badge priority-${priorityInfo.color}`}>
                        <Flag size={10} />
                        {priorityInfo.name}
                      </span>
                      <span className={`category-badge category-${categoryInfo.color}`}>
                        {categoryInfo.icon} {categoryInfo.name}
                      </span>
                    </div>
                  </div>
                  <div className="todo-meta">
                    <span className="todo-date">
                      <Clock size={10} />
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="todo-actions">
                  <select
                    value={todo.priority}
                    onChange={(e) => updatePriority(todo.id, e.target.value)}
                    className="priority-quick-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {priorities.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn-enhanced"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="todo-footer">
        <div className="productivity-tip">
          💡 Tip: Use high priority for urgent tasks and categorize for better organization!
        </div>
      </div>
    </div>
  );
};

export default TodoEnhanced;