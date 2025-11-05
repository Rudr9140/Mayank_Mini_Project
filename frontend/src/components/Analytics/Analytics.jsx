import { useState, useEffect } from 'react';
import { getStats } from '../../services/api';
import ProgressChart from './ProgressChart';

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getStats();
      setStats(response.data.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>
        {stats && <ProgressChart stats={stats} />}
      </div>
    </div>
  );
};

export default Analytics;
