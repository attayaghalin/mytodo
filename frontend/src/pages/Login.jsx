import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: username,
        password: password  
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token);
      
      alert("Login Berhasil!");

      navigate('/todos'); 

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Koneksi ke server gagal";
      alert("Login Gagal: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 antialiased">
      <div className="max-w-100 w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black-100/50 border border-gray-100">
        
    <div className="mb-10 ml-1">
        <h2 className="text-4xl font-black tracking-tighter text-slate-800">
            Halo!<span className="text-blue-600">.</span>
        </h2>
        <p className="text-slate-500 mt-1 font-semibold">
            Silakan masuk ke akun <span className="text-blue-950 font-bold tracking-tight">my</span><span className='text-blue-600 font-bold tracking-tight'>Todo</span> kamu.
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded-full mt-4"></div>
    </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-700 placeholder:text-gray-400" placeholder="username" required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input type="password" value={password}onChange={(e) => setPassword(e.target.value)}className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-700 placeholder:text-gray-400" placeholder="password" required 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 active:scale-[0.98] transition-all mt-4">
            Masuk
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;