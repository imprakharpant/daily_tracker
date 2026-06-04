import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative flex">
      <Sidebar />
      <div className="flex-1 relative flex flex-col min-w-0 overflow-hidden h-screen overflow-y-auto">
        {/* Subtle luxury ambient lighting */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[150px] -z-0 pointer-events-none"></div>

        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
