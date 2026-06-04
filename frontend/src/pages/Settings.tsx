import { useState } from 'react';
import { Card, Button } from '../components/ui';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your preferences and account settings.</p>
      </div>

      <Card className="p-8 border-white/10 bg-black/40">
        <h2 className="text-xl font-semibold mb-6">Preferences</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Email Notifications</h3>
              <p className="text-sm text-gray-400">Receive daily reminders and weekly reports.</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[#c084fc]' : 'bg-gray-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? 'translate-x-[26px]' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Dark Mode</h3>
              <p className="text-sm text-gray-400">Toggle the dark theme for the application.</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-[#c084fc]' : 'bg-gray-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-[26px]' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-red-500/20 bg-red-500/5">
        <h2 className="text-xl font-semibold mb-2 text-red-400">Danger Zone</h2>
        <p className="text-sm text-gray-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
        <Button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50 hover:shadow-none bg-none hover:scale-100 transition-colors">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
