import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, StickyNote, Info, Settings, LogOut, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Notes', path: '/notes', icon: StickyNote },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-3xl sticky top-0 left-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.8)]">
      <div className="p-8 border-b border-white/5">
        <Link to="/" className="text-3xl font-serif tracking-tight text-gradient flex items-center gap-2">
          ✨ Lumina
        </Link>
      </div>
      
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden",
                  isActive 
                    ? "bg-white/5 text-white shadow-inner" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-[#F3E5AB] rounded-r-full"
                  />
                )}
                <item.icon size={20} className={cn("transition-colors", isActive ? "text-[#D4AF37]" : "group-hover:text-[#F3E5AB]")} />
                {item.name}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-black font-bold shadow-lg">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm truncate">{user.name}</span>
              <span className="text-xs text-gray-500 truncate">{user.email}</span>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 justify-center w-full py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
