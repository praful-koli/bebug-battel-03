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

  // Priority badge colors
  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      {editing ? (
        <div className="space-y-2">
          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {/* Header row with category + priority */}
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

          {/* Habit name */}
          <h3 className="text-lg font-semibold">{habit.name}</h3>

          {/* Goal + streak */}
          <p className="text-sm text-gray-600">
            Goal: {habit.goalValue} {habit.unit}
          </p>
          <p className="text-sm text-gray-600">
            Streak: {getStreak(habit.completedDates)}
          </p>
          <p className="text-sm">
            {isDoneToday ? " Done today" : " Not done today"}
          </p>

          {/* Action buttons */}
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