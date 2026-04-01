import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...habit });

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...habit }); 
    setEditing(false);
  };


  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      {editing ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">EDIT HABIT</h3>


          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="border p-2 w-full rounded"
            placeholder="Habit name"
          />

    
          <select
            value={editData.priority}
            onChange={(e) =>
              setEditData({ ...editData, priority: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

        
          <select
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="health">Health</option>
            <option value="growth">Growth</option>
            <option value="productivity">Productivity</option>
          </select>

   
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
         
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-bold text-purple-600">
              {habit.category}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded ${priorityColors[habit.priority]}`}
            >
              {habit.priority.toUpperCase()}
            </span>
          </div>


          <h3 className="text-lg font-semibold">{habit.name}</h3>


          <p className="text-sm text-gray-600">
            Goal: {habit.goalValue} {habit.unit}
          </p>
          <p className="text-sm text-gray-600">
            Streak: {getStreak(habit.completedDates)}
          </p>
          <p className="text-sm">
            {isDoneToday ? " Done today" : " Not done today"}
          </p>

        
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => toggleHabit(habit.id)}
              className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;