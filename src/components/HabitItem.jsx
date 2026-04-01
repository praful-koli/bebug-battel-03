import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit, index }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...habit });
  const [hovered, setHovered] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);
  const streak = getStreak(habit.completedDates);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  const priorityLabel = {
    low: <span className="win-badge-low">[LOW]</span>,
    medium: <span className="win-badge-medium">[MED]</span>,
    high: <span className="win-badge-high">[HIGH]</span>,
  };

  const categoryIcon = {
    health: "❤️",
    mindset: "🧠",
    productivity: "⚡",
  };

  const rowBg = hovered
    ? "#dde8f8"
    : index % 2 === 0
    ? "#ffffff"
    : "#f5f3ee";

  if (editing) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 6px",
          gap: "6px",
          background: "#fffde0",
          borderBottom: "1px solid #c8c4be",
        }}
      >
        <span style={{ fontSize: 12, marginRight: 2 }}>✏️</span>
        <input
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          className="win-input"
          style={{ flex: 2 }}
          autoFocus
        />
        <button className="win-btn win-btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="win-btn" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      className="win-listitem"
      style={{
        background: rowBg,
        borderBottom: "1px solid #c8c4be",
        padding: "3px 6px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Done checkbox (simulated Win2K style) */}
      <div
        onClick={() => toggleHabit(habit.id)}
        style={{
          width: 13,
          height: 13,
          border: "2px inset #808080",
          background: isDoneToday ? "#000080" : "#fff",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "2px solid #404040",
          borderLeft: "2px solid #404040",
          borderRight: "2px solid #dfdfdf",
          borderBottom: "2px solid #dfdfdf",
        }}
        title={isDoneToday ? "Mark as not done" : "Mark as done"}
      >
        {isDoneToday && (
          <span style={{ color: "#fff", fontSize: 9, lineHeight: 1, fontWeight: "bold" }}>
            ✓
          </span>
        )}
      </div>

      {/* Habit name */}
      <span
        style={{
          flex: 2,
          fontWeight: isDoneToday ? "normal" : "normal",
          textDecoration: isDoneToday ? "line-through" : "none",
          color: isDoneToday ? "#808080" : "#000",
          fontSize: 11,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {categoryIcon[habit.category] || "📌"} {habit.name}
      </span>

      {/* Category */}
      <span
        style={{
          flex: 1,
          fontSize: 10,
          color: "#000080",
          textTransform: "capitalize",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {habit.category}
      </span>

      {/* Goal */}
      <span style={{ flex: 1, fontSize: 10, color: "#333" }}>
        {habit.goalValue} {habit.unit}
      </span>

      {/* Streak */}
      <span style={{ flex: 1, fontSize: 10, color: "#444" }}>
        🔥 {streak}d
      </span>

      {/* Priority */}
      <span style={{ flex: 1, fontSize: 10 }}>
        {priorityLabel[habit.priority] || habit.priority}
      </span>

      {/* Status */}
      <span
        style={{
          flex: 1,
          fontSize: 10,
          color: isDoneToday ? "#006400" : "#800000",
          fontWeight: "bold",
        }}
      >
        {isDoneToday ? "✓ Done" : "✗ Pending"}
      </span>

      {/* Actions */}
      <div style={{ flex: 2, display: "flex", gap: "3px" }}>
        <button
          className="win-btn"
          onClick={() => toggleHabit(habit.id)}
          style={{ minWidth: 55, fontSize: 10, padding: "1px 6px" }}
        >
          {isDoneToday ? "Undo" : "Complete"}
        </button>
        <button
          className="win-btn"
          onClick={() => setEditing(true)}
          style={{ minWidth: 40, fontSize: 10, padding: "1px 6px" }}
        >
          Edit
        </button>
        <button
          className="win-btn win-btn-danger"
          onClick={() => deleteHabit(habit.id)}
          style={{ minWidth: 40, fontSize: 10, padding: "1px 6px" }}
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
