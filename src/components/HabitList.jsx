import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll } = useHabit();

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;

  const progressPercent =
    habits.length > 0
      ? Math.round((completedToday / habits.length) * 100)
      : 0;

  const progressText = `${completedToday} / ${habits.length}`;

  const topCategory = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});

  const mainFocus =
    Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  const highPriorityCount = habits.filter((h) => h.priority === "high").length;

  if (habits.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-600">
        No habits yet. Add one to get started!
      </p>
    );
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-6 pb-20">
      {/* Daily Progress Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">DAILY PROGRESS</h2>
        <p className="text-gray-600">Keep going</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-700">{progressText}</p>
        <div className="flex justify-between mt-4 text-sm">
          <span>FOCUS: {mainFocus}</span>
          <span>PRIORITY: {highPriorityCount} High Tasks</span>
        </div>
      </div>

      {/* Routine Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">YOUR ROUTINE</h2>
        <div className="space-y-3">
          {visibleHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitList;