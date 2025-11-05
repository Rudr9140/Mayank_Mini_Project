import { Trash2, Edit, Calendar } from 'lucide-react';
import { useState } from 'react';
import EditGoal from './EditGoal';

const GoalCard = ({ goal, onDelete, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'border-green-500',
    medium: 'border-yellow-500',
    high: 'border-red-500',
  };

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${priorityColors[goal.priority]}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button onClick={() => onDelete(goal._id)} className="text-red-600 hover:text-red-800">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {goal.description && <p className="text-gray-600 mb-4">{goal.description}</p>}

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
              {goal.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
              {goal.category}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditGoal goal={goal} onClose={() => setShowEditModal(false)} onSuccess={onUpdate} />
      )}
    </>
  );
};

export default GoalCard;
