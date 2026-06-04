import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import HabitRow from './HabitRow';
import { Skeleton, Card } from './ui';
import AnimatedList from './AnimatedList';

export default function HabitList() {
  const { data: habits, isLoading, isError } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const res = await api.get('/habits');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
      </div>
    );
  }

  if (isError) {
    return <Card className="bg-red-900/20 text-red-400">Failed to load habits. Please try again.</Card>;
  }

  if (!habits || habits.length === 0) {
    return (
      <Card className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-4">🌱</div>
        <h3 className="text-lg text-white mb-2">No habits yet</h3>
        <p>Start tracking your daily goals by adding a habit above.</p>
      </Card>
    );
  }

  return (
    <AnimatedList
      items={habits}
      renderItem={(habit: any, _index: number, isSelected: boolean) => (
        <HabitRow key={habit._id} habit={habit} isSelected={isSelected} />
      )}
    />
  );
}
