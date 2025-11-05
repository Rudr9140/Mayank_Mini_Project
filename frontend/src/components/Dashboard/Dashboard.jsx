import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { getStats, getGoals } from '../../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentGoals, setRecentGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, goalsRes] = await Promise.all([getStats(), getGoals()]);
        setStats(statsRes.data.data);
        setRecentGoals(goalsRes.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const statCards = [
    { title: 'Total Goals', value: stats?.total || 0, icon: Target, color: 'blue' },
    { title: 'Completed', value: stats?.completed || 0, icon: CheckCircle, color: 'green' },
    { title: 'In Progress', value: stats?.inProgress || 0, icon: Clock, color: 'yellow' },
    { title: 'Completion Rate', value: `${stats?.completionRate || 0}%`, icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
                <card.icon className={`h-12 w-12 text-${card.color}-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Goals</h2>
            <Link to="/goals" className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentGoals.length > 0 ? (
              recentGoals.map((goal) => (
                <div key={goal._id} className="border-l-4 border-primary-500 pl-4 py-3">
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="capitalize">{goal.status}</span>
                    <span>•</span>
                    <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Progress: {goal.progress}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No goals yet. Create your first goal!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
