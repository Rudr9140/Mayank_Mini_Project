import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { getGoals, deleteGoal } from '../../services/api';
import GoalCard from './GoalCard';
import AddGoal from './AddGoal';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchGoals = async () => {
    try {
      const response = await getGoals();
      setGoals(response.data.data);
    } catch (error) {
      toast.error('Error fetching goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(id);
        setGoals(goals.filter((goal) => goal._id !== id));
        toast.success('Goal deleted successfully');
      } catch (error) {
        toast.error('Error deleting goal');
      }
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === 'all') return true;
    return goal.status === filter;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="mb-6 flex space-x-4">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal, index) => (
            <motion.div
              key={goal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GoalCard goal={goal} onDelete={handleDelete} onUpdate={fetchGoals} />
            </motion.div>
          ))}
        </div>

        {filteredGoals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No goals found. Start by adding a new goal!</p>
          </div>
        )}

        {showAddModal && <AddGoal onClose={() => setShowAddModal(false)} onSuccess={fetchGoals} />}
      </div>
    </div>
  );
};

export default GoalList;
