import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Notes from './pages/Notes';
import AboutApp from './pages/AboutApp';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Particles from './components/Particles';
import AppLayout from './components/AppLayout';

const queryClient = new QueryClient();

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        
        {/* Authenticated Routes wrapped in Sidebar Layout */}
        <Route path="/dashboard" element={<AppLayout><PageWrapper><Dashboard /></PageWrapper></AppLayout>} />
        <Route path="/analytics" element={<AppLayout><PageWrapper><Analytics /></PageWrapper></AppLayout>} />
        <Route path="/notes" element={<AppLayout><PageWrapper><Notes /></PageWrapper></AppLayout>} />
        <Route path="/about" element={<AppLayout><PageWrapper><AboutApp /></PageWrapper></AppLayout>} />
        <Route path="/settings" element={<AppLayout><PageWrapper><Settings /></PageWrapper></AppLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a]">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <Particles
            particleColors={["#D4AF37", "#F3E5AB", "#ffffff"]}
            particleCount={40}
            particleSpread={10}
            speed={0.02}
            particleBaseSize={8}
            moveParticlesOnHover
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
        <div className="relative z-10 min-h-screen">
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
