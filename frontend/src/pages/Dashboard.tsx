import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { Button, Input, Card } from '../components/ui';
import HabitList from '../components/HabitList';
import DailyQuote from '../components/DailyQuote';
import StarBorder from '../components/StarBorder';
import EmojiPicker from '../components/EmojiPicker';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('💧');
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  const createHabit = useMutation({
    mutationFn: (newHabit: { name: string, emoji: string }) => api.post('/habits', newHabit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setName('');
    }
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createHabit.mutate({ name, emoji });
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col animate-in fade-in duration-500 w-full max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-2 text-white">Dashboard</h1>
        <p className="text-gray-400 font-light">Welcome back, {user.name}</p>
      </div>

      <h2 className="text-xl font-light text-gray-400 mb-6 tracking-wide">
        <span className="font-serif text-[#D4AF37]">Today</span> — {today}
      </h2>

      <DailyQuote />

      <Card className="mb-10 p-2 sm:p-3 relative z-30 overflow-visible border-white/5 bg-[#111] backdrop-blur-2xl group transition-all duration-300 hover:border-white/10">
        <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
        <form onSubmit={handleAdd} className="flex gap-3 relative z-10">
          <div className="relative">
            <EmojiPicker 
              value={emoji} 
              onChange={setEmoji} 
              options={['💧', '📖', '🏃', '🧘', '💻', '🎨', '🌱', '☕', '🧠', '💰', '🏋️', '🚭']} 
            />
          </div>
          
          <Input 
            placeholder="What habit do you want to build?" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="text-lg bg-transparent border-none px-4 flex-grow placeholder:text-gray-500 focus:bg-white/5 font-light"
          />
          
          <StarBorder as="button" type="submit" disabled={createHabit.isPending} color="#D4AF37" className="hover:scale-105 transition-transform flex-shrink-0">
            <Plus size={28} strokeWidth={2.5} className="text-[#D4AF37]" />
          </StarBorder>
        </form>
      </Card>

      <HabitList />
    </div>
  );
}
