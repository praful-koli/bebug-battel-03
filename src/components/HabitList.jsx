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

  const topCategory = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});

  const mainFocus =
    Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const visibleHabits = showAll ? habits : habits.slice(0, 10);

  if (habits.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "24px",
          color: "var(--win-disabled)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>No habits found</div>
        <div style={{ fontSize: 10, color: "#888" }}>
          Use the &quot;New Habit&quot; panel to add your first habit.
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Habit rows */}
      {visibleHabits.map((habit, i) => (
        <HabitItem key={habit.id} habit={habit} index={i} />
      ))}

      {/* Footer summary */}
      <div
        style={{
          borderTop: "2px solid var(--bevel-shadow)",
          padding: "4px 8px",
          display: "flex",
          gap: "16px",
          background: "var(--win-gray)",
          fontSize: 10,
          alignItems: "center",
        }}
      >
        <span>
          <strong>Daily Progress:</strong> {completedToday}/{habits.length} ({progressPercent}%)
        </span>
        <div
          style={{
            flex: 1,
            position: "relative",
            height: 14,
          }}
        >
          <div className="win-progressbar">
            <div
              className="win-progressbar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        {mainFocus && (
          <span>
            <strong>Main Focus:</strong> {mainFocus}
          </span>
        )}
      </div>
    </div>
  );
};

export default HabitList;
