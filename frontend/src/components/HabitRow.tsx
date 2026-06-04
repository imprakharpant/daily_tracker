import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import api from '../api/axios';
import { Card } from './ui';
import { cn } from './ui';
import WeekGrid from './WeekGrid';

export default function HabitRow({ habit, isSelected }: { habit: any; isSelected?: boolean }) {
  const queryClient = useQueryClient();

  const { data: logs = [] } = useQuery({
    queryKey: ['logs', habit._id],
    queryFn: async () => {
      const res = await api.get(`/logs/${habit._id}`);
      return res.data;
    }
  });

  const getLocalYMD = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getLocalYMD();
  const isDoneToday = logs.some((l: any) => l.date === todayStr);

  const toggleLog = useMutation({
    mutationFn: () => api.post(`/logs/${habit._id}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['logs', habit._id] });
      const previousLogs = queryClient.getQueryData(['logs', habit._id]);
      
      queryClient.setQueryData(['logs', habit._id], (old: any) => {
        if (!old) return old;
        if (isDoneToday) {
          return old.filter((l: any) => l.date !== todayStr);
        } else {
          return [{ date: todayStr }, ...old];
        }
      });
      return { previousLogs };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['logs', habit._id], context?.previousLogs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['logs', habit._id] });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    }
  });

  return (
    <div className="relative group w-full mb-6">
      <div className={cn(
        "absolute inset-0 rounded-2xl blur-md transition-all duration-500 pointer-events-none",
        isDoneToday ? "bg-green-500/10 opacity-100" : "bg-purple-500/10 opacity-0 group-hover:opacity-100"
      )}></div>
      
      <Card className={cn(
        "relative z-10 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 bg-black/40",
        isDoneToday ? "border-green-500/30" : "hover:border-[#c084fc]/50 border-white/5",
        isSelected && "border-[#818cf8]"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/5">
              {habit.emoji}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xl tracking-tight">{habit.name}</span>
              <span className="text-orange-400 font-bold text-sm mt-1 flex items-center gap-1 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">
                🔥 {habit.streak} day streak
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleLog.mutate()}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-95",
              isDoneToday 
                ? "bg-green-500 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)]" 
                : "border-white/20 text-transparent hover:border-green-400/50 hover:bg-green-500/10"
            )}
          >
            <Check size={24} className={isDoneToday ? "opacity-100 scale-100" : "opacity-0 scale-50 transition-all duration-300"} />
          </button>
        </div>
        
        <div className="pt-2 border-t border-white/5">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Last 7 Days</p>
          <WeekGrid logs={logs} />
        </div>
      </Card>
    </div>
  );
}
