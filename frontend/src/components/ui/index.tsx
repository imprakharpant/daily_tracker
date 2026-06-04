import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("px-4 py-2 bg-gradient-to-r from-accent to-purple-500 text-white rounded-lg hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 font-medium", className)} {...props} />
));

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/10 transition-all duration-300 w-full backdrop-blur-sm", className)} {...props} />
));

export const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("glass-panel p-6 rounded-2xl", className)}>{children}</div>
);

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-white/10 rounded-md", className)} />
);
