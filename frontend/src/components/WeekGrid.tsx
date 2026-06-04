export default function WeekGrid({ logs }: { logs: any[] }) {
  const logDates = new Set(logs.map(l => l.date));
  
  const getPast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ dateStr, dayName });
    }
    return days;
  };

  const days = getPast7Days();

  return (
    <div>
      <div className="text-xs text-gray-500 mb-2">Last 7 days:</div>
      <div className="flex gap-2">
        {days.map(day => (
          <div key={day.dateStr} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500">{day.dayName}</span>
            <div 
              className={`w-6 h-6 rounded-sm ${logDates.has(day.dateStr) ? 'bg-green-500' : 'bg-[#2a2a2a]'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
