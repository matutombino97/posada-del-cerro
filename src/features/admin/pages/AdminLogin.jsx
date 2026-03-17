import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-beige/10 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-primary-beige/20">
        <div className="text-center mb-10">
          <div className="bg-primary-brown w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif text-primary-brown mb-2">Panel de Control</h1>
          <p className="text-gray-400 text-sm">Ingreso exclusivo para administración</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                {...register('email', { required: true })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-olive/20 focus:border-primary-olive focus:outline-none transition-all"
                placeholder="admin@laposada.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                {...register('password', { required: true })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-olive/20 focus:border-primary-olive focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary-brown text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-opacity-90 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : (
              <>
                <LogIn className="w-5 h-5 mr-3" /> Entrar al Panel
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
