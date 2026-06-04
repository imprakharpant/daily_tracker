import { Link } from 'react-router-dom';
import StarBorder from '../components/StarBorder';
import { Card } from '../components/ui';
import { Zap, Target, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="w-full max-w-6xl mx-auto flex justify-between items-center p-6">
        <div className="text-3xl font-serif tracking-tight text-gradient flex items-center gap-2">✨ Lumina</div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
          <Link to="/register">
            <StarBorder color="#D4AF37" speed="4s" className="px-6 py-2 text-sm">
              Get Started
            </StarBorder>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-white leading-tight">
          Cultivate Your Habits.<br />
          <span className="text-gradient font-style-italic">Elevate Your Lifestyle.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
          An exquisitely designed platform to meticulously track your daily progress, elegantly presented in a quiet luxury interface.
        </p>
        
        <Link to="/register">
          <StarBorder color="#D4AF37" speed="3s" className="px-8 py-4 text-lg font-medium tracking-wide">
            Begin Your Journey
          </StarBorder>
        </Link>
      </main>

      {/* About Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-white">Why Lumina?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">Because building the best version of yourself should feel like a premium experience, not a chore.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Card className="p-10 border-white/5 bg-[#111]">
            <h3 className="text-2xl font-serif mb-4 text-gradient">The Philosophy</h3>
            <p className="text-gray-300 leading-relaxed mb-4 font-light">
              Lumina was crafted on the principle that aesthetic environments encourage consistent action. By wrapping your daily goals in beautiful, restrained design, we eliminate the visual noise of traditional habit trackers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              No generic interfaces. Just a sleek, meticulously crafted sanctuary dedicated to your personal growth.
            </p>
          </Card>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
            <Card className="p-8 border border-white/5 bg-black/80 relative z-10">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl">💧</span>
                <span className="text-xl font-serif text-white">Hydration</span>
                <span className="ml-auto text-[#D4AF37] font-medium text-lg">✨ 365 days</span>
              </div>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-md ${i < 6 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-white/10'}`}></div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-white">Curated Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-white/5 bg-[#111] hover:-translate-y-2 transition-transform duration-500">
            <Zap className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="text-xl font-serif mb-3 text-white">Responsive Elegance</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Optimistic updates mean your actions are recorded instantly, providing a seamless and uninterrupted flow.</p>
          </Card>
          <Card className="p-8 border-white/5 bg-[#111] hover:-translate-y-2 transition-transform duration-500">
            <Target className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="text-xl font-serif mb-3 text-white">Streak Tracking</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Watch your momentum build as you consistently hit your daily targets in a visually satisfying environment.</p>
          </Card>
          <Card className="p-8 border-white/5 bg-[#111] hover:-translate-y-2 transition-transform duration-500">
            <Shield className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="text-xl font-serif mb-3 text-white">Total Privacy</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Your data is yours alone. We employ enterprise-grade security to ensure your personal growth remains strictly confidential.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto py-8 text-center text-gray-600 text-sm font-light">
        <p>© {new Date().getFullYear()} Lumina. A premium experience.</p>
      </footer>
    </div>
  );
}
