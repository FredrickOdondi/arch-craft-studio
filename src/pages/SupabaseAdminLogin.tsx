import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { toast } from 'sonner';

const SupabaseAdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useSupabaseAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn(credentials.email, credentials.password);
      
      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success('Login successful!');
        navigate('/supabase-admin');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/6336335e-8404-42ce-bc92-8e7a52514670.png')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="depth-card glass bg-black/50 rounded-2xl border border-white/20 backdrop-blur-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="glass bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <div className="w-9"></div>
          </div>

          <div className="text-center mb-8">
            <div className="glass bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300">Access the VN Design Tech admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full glass bg-white/20 border border-white/30 py-3 rounded-lg text-white hover:bg-white/30 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Login to Admin Dashboard'}
            </button>
          </form>

          <div className="mt-6 p-4 glass bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              Sign up for an admin account or use existing credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseAdminLogin;