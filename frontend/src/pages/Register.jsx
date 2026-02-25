import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: username,
        password: password
      });

      alert("Pendaftaran berhasil! Silakan login.");
      navigate('/login');

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gagal mendaftar";
      alert("Pendaftaran Gagal: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 antialiased">
      <div className="max-w-100 w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black-100/50 border border-gray-100">
        
        <div className="mb-10 ml-1">
          <h2 className="text-4xl font-black tracking-tighter text-slate-800">
            Daftar<span className="text-blue-600">.</span>
          </h2>
          <p className="text-slate-500 mt-1 font-semibold">
            Buat akun <span className="text-blue-950 font-bold tracking-tight">my</span><span className='text-blue-600 font-bold tracking-tight'>Todo</span> baru kamu.
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full mt-4"></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-700 placeholder:text-gray-400" placeholder="username" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-700 placeholder:text-gray-400" 
              placeholder="password" 
              required 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 active:scale-[0.98] transition-all mt-6">
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;