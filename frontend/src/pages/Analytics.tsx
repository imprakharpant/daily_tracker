import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Award, Target } from 'lucide-react';
import { motion } from 'motion/react';
import api from '../api/axios';
import { Card, Skeleton } from '../components/ui';

export default function Analytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/habits/stats');
      return res.data;
    }
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-serif mb-2 text-white">Analytics & Insights</h1>
        <p className="text-gray-400 font-light">Track your progress and visualize your growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
              <Card className="p-6 border-white/5 bg-gradient-to-br from-[#D4AF37]/10 to-[#F3E5AB]/5 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/20 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
                    <Target size={24} />
                  </div>
                  <h3 className="text-lg font-serif text-gray-200">Active Habits</h3>
                </div>
                <div className="text-4xl font-light text-white relative z-10">{stats?.totalHabits || 0}</div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
              <Card className="p-6 border-white/5 bg-gradient-to-br from-[#E5E4E2]/10 to-[#FFFFFF]/5 backdrop-blur-xl relative overflow-hidden group hover:border-[#E5E4E2]/20 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 bg-white/10 rounded-xl text-[#E5E4E2]">
                    <Award size={24} />
                  </div>
                  <h3 className="text-lg font-serif text-gray-200">Longest Streak</h3>
                </div>
                <div className="flex items-baseline gap-2 relative z-10">
                  <div className="text-4xl font-light text-white">{stats?.longestStreak || 0}</div>
                  <span className="text-[#D4AF37] font-serif">days ✨</span>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }}>
              <Card className="p-6 border-white/5 bg-[#111]/50 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/20 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 bg-[#D4AF37]/5 rounded-xl text-[#D4AF37]">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-lg font-serif text-gray-200">Total Check-ins</h3>
                </div>
                <div className="text-4xl font-light text-white relative z-10">{stats?.totalLogs || 0}</div>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      <Card className="p-8 border-white/5 bg-[#111] mt-4">
        <h2 className="text-xl font-serif mb-6 text-white">Activity Overview</h2>
        <div className="flex flex-col items-center justify-center py-12 border border-white/5 rounded-xl bg-black/40">
          <p className="text-gray-400 mb-2 font-light">More detailed charts coming soon.</p>
          <p className="text-sm text-gray-500 font-light">Keep tracking your habits to unlock deeper insights.</p>
        </div>
      </Card>
    </div>
  );
}
