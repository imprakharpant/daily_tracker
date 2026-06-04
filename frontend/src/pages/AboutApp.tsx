import { Card } from '../components/ui';

export default function AboutApp() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-serif mb-2 text-white">About Lumina</h1>
        <p className="text-gray-400 font-light">The vision and technology behind the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-white/5 bg-[#111]">
          <h2 className="text-2xl font-serif mb-4 text-[#D4AF37]">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed mb-4 font-light">
            Lumina was built to solve a simple problem: tracking your personal growth should feel like a premium experience, not a chore. 
          </p>
          <p className="text-gray-300 leading-relaxed font-light">
            We combined the principles of atomic habits with high-end, elegant design. The result is a platform that gets out of your way and lets you focus on what matters most: becoming the best version of yourself.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-white/10 bg-black/20">
          <h3 className="text-xl font-semibold mb-3">Core Technologies</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• React & TypeScript</li>
            <li>• Vite for fast builds</li>
            <li>• Tailwind CSS v4</li>
            <li>• TanStack Query</li>
            <li>• Node.js & Express</li>
            <li>• MongoDB</li>
          </ul>
        </Card>
        
        <Card className="p-6 border-white/10 bg-black/20">
          <h3 className="text-xl font-semibold mb-3">Future Roadmap</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Detailed Analytics Dashboard</li>
            <li>• Habit Categories</li>
            <li>• Push Notifications</li>
            <li>• Mobile Application</li>
            <li>• Social Accountability</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
