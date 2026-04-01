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
    Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  if (habits.length === 0) {
    return <p className="text-center mt-6">No habits yet. Add one to get started!</p>;
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-md mx-auto mt-6 px-4 pb-20">
      <div className="space-y-3">
        {visibleHabits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>

      {/* Progress and focus summary */}
      <div className="mt-4">
        <p>Daily Progress: {progressText} ({progressPercent}%)</p>
        <p>Main Focus: {mainFocus || "None"}</p>
      </div>
    </div>
  );
};

export default HabitList;