import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Card } from '../components/ui';
import StarBorder from '../components/StarBorder';
import api from '../api/axios';
import { useState } from 'react';
import { motion } from 'motion/react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
      <Link to="/" className="absolute top-8 left-8 text-3xl font-serif tracking-tight text-gradient flex items-center gap-2">✨ Lumina</Link>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/5 via-[#F3E5AB]/5 to-[#ffffff]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border border-white/5 relative z-10 bg-[#111]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif mb-2 text-white">Welcome to Lumina</h1>
            <p className="text-gray-400 font-light">Enter your credentials to continue your journey.</p>
          </div>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input placeholder="Email Address" {...register('email')} />
            {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
          </div>
          <div>
            <Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
          </div>
          <div className="pt-2">
            <StarBorder type="submit" disabled={isSubmitting} className="w-full text-base font-medium" color="#D4AF37" speed="4s">
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </StarBorder>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <Link to="/register" className="text-[#D4AF37] hover:text-[#F3E5AB] transition-colors ml-1 font-medium">Register</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
