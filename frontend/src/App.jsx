import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    await axios.post(API, { title: input });
    setInput('');
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 Todo App</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="할 일을 입력하세요"
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>추가</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, todo.completed)}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : '#000' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ color: 'red' }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;