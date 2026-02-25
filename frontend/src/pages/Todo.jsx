import { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css'

function Todo() {
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data.data);
    } catch (err) {
      console.error("Gagal ambil data", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    try {
      await api.post('/todos', { task: inputVal });
      setInputVal('');
      fetchTodos();
    } catch (err) {
      alert("Gagal tambah tugas");
    }
  };

  const toggleTodo = async (id) => {
    try {
      await api.patch(`/todos/toggle/${id}`);
      fetchTodos();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  const startEdit = (id, task) => {
    setIsEditing(id);
    setEditValue(task);
  }

  const saveEdit = async (id) => {
    try {
      await api.patch(`/todos/edit/${id}`, { task: editValue });
      setIsEditing(null);
      fetchTodos();
    } catch (err) {
      alert("Gagal edit tugas");
    }
  };

  const cancelEdit = (id) => {
    setIsEditing(null);
  }

  const deleteTodo = async (id) => {
    if(!window.confirm("Hapus tugas?")) return;
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      alert("Gagal hapus");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className='p-4 bg-white shadow-sm mb-6'>
        <h2 className='flex justify-center font-bold text-[1.8rem] cursor-pointer tracking-tight'>
          <span className='text-blue-950'>my</span>
          <span className='text-blue-600'>Todo</span>
        </h2>
      </div>

      <section className='max-w-2xl mx-auto px-5'>
        <form onSubmit={addTodo} className='flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm gap-3 border border-gray-100'>
          <input type='text' onChange={(e) => setInputVal(e.target.value)} value={inputVal} placeholder='Apa rencana kamu hari ini?' className='flex-1 border-b-2 border-gray-200 focus:border-blue-500 pb-1 pl-2 outline-none transition-all duration-300 placeholder:text-gray-400'/>
          <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-12 h-12 text-2xl flex items-center justify-center shadow-md hover:shadow-blue-200 active:scale-90 transition-all'>
            +
          </button>
        </form>
      </section>

      <section className='max-w-2xl mx-auto px-5 mt-8'>
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Belum ada tugas. Yuk, mulai produktif!</p>
        ) : (
          todos.sort((a, b) => a.is_completed - b.is_completed).map((todo) => (
            <div key={todo.id} className='group flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-4 mb-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200'>
              <div className='flex items-center flex-1 mr-4'>
                {isEditing !== todo.id && (
                  <input type='checkbox' checked={todo.is_completed} onChange={() => toggleTodo(todo.id)} className='size-5 mr-4 cursor-pointer accent-blue-600 transition-transform active:scale-125'/>
                )}

                {isEditing === todo.id ? (
                  <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} autoFocus onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(todo.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="flex-1 border-b-2 border-blue-500 outline-none px-2 py-1 text-gray-700 bg-blue-50 rounded-md font-medium"
                  />
                ) : (
                  <p className={`text-[1.05rem] font-medium transition-all duration-300 ${todo.is_completed ? 'line-through text-gray-400 opacity-60' : 'text-gray-700'}`}>
                    {todo.task}
                  </p>
                )}
              </div>

              <div className='flex items-center gap-1'>
                {isEditing === todo.id ? (
                  <button onClick={() => saveEdit(todo.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => startEdit(todo.id, todo.task)} className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90'
                  >
                    <svg className='size-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                )}

                <button onClick={() => deleteTodo(todo.id)} className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-90'
                >
                  <svg className='size-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Todo;