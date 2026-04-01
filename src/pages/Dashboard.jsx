import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

const Dashboard = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--win-gray)",
        overflow: "hidden",
      }}
    >
      {/* ── Window Title Bar ── */}
      <div className="win-titlebar" style={{ flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Tiny app icon */}
          <span
            style={{
              width: 14,
              height: 14,
              background: "#ffdd00",
              border: "1px solid #000",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: "bold",
              color: "#000",
              flexShrink: 0,
            }}
          >
            H
          </span>
          <span>Habit Tracker — Track Your Journey</span>
        </div>
        <div className="win-titlebar-buttons">
          <button className="win-titlebar-btn" title="Minimize">_</button>
          <button className="win-titlebar-btn" title="Maximize">□</button>
          <button className="win-titlebar-btn" style={{ color: "#800000", fontWeight: "bold" }} title="Close">✕</button>
        </div>
      </div>

      {/* ── Menu Bar ── */}
      <div
        style={{
          background: "var(--win-gray)",
          borderBottom: "1px solid var(--bevel-shadow)",
          padding: "1px 6px",
          display: "flex",
          gap: "0px",
          flexShrink: 0,
        }}
      >
        {["File", "Edit", "View", "Habits", "Tools", "Help"].map((item) => (
          <button
            key={item}
            style={{
              background: "transparent",
              border: "2px solid transparent",
              padding: "1px 6px",
              cursor: "pointer",
              fontSize: 11,
              color: "var(--win-black)",
              fontFamily: "Tahoma, Arial, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--win-selection)";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--win-black)";
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="win-toolbar" style={{ flexShrink: 0 }}>
        {[
          { icon: "🏠", label: "Home" },
          { icon: "➕", label: "New Habit" },
          { icon: "✏️", label: "Edit" },
          { icon: "🗑", label: "Delete" },
        ].map((btn) => (
          <button key={btn.label} className="win-toolbar-btn">
            <span style={{ fontSize: 13 }}>{btn.icon}</span>
            <span>{btn.label}</span>
          </button>
        ))}
        <div className="win-toolbar-separator" />
        <button className="win-toolbar-btn">
          <span style={{ fontSize: 13 }}>📊</span>
          <span>Progress</span>
        </button>
        <button className="win-toolbar-btn">
          <span style={{ fontSize: 13 }}>⚙️</span>
          <span>Options</span>
        </button>
      </div>

      {/* ── Main Content Area ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          gap: "0px",
          padding: "4px",
        }}
      >
        {/* ── Left Sidebar (Explorer pane) ── */}
        <div
          className="win-window"
          style={{
            width: 170,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            marginRight: "4px",
            overflow: "hidden",
          }}
        >
          {/* Sidebar title bar */}
          <div
            style={{
              background: "linear-gradient(to right, #000080, #1084d0)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 11,
              padding: "2px 6px",
            }}
          >
            Navigation
          </div>

          {/* Nav items */}
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
            <div className="win-nav-item active">
              <span>📋</span> Dashboard
            </div>
            <div className="win-nav-item">
              <span>📅</span> Calendar
            </div>
            <div className="win-nav-item">
              <span>📈</span> Statistics
            </div>
            <div className="win-nav-item">
              <span>🏆</span> Achievements
            </div>
            <div className="win-nav-item">
              <span>⚙️</span> Settings
            </div>

            <div className="win-divider" style={{ margin: "4px 6px" }} />

            <div
              style={{
                padding: "4px 6px",
                fontSize: 10,
                color: "var(--win-disabled)",
                fontWeight: "bold",
              }}
            >
              CATEGORIES
            </div>
            {["Health", "Mindset", "Productivity"].map((cat) => (
              <div key={cat} className="win-nav-item">
                <span>📁</span> {cat}
              </div>
            ))}
          </div>

          {/* Sidebar Status Panel */}
          <div
            style={{
              borderTop: "1px solid var(--bevel-shadow)",
              padding: "6px",
            }}
          >
            <div
              style={{
                background: "var(--win-white)",
                border: "1px inset var(--bevel-shadow)",
                padding: "4px",
                fontSize: 10,
              }}
            >
              <div style={{ fontWeight: "bold", color: "#000080", marginBottom: 2 }}>
                🔥 5-Day Streak!
              </div>
              <div style={{ color: "#444" }}>Keep it going!</div>
            </div>
          </div>
        </div>

        {/* ── Center: Active Habits ── */}
        <div
          className="win-window"
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginRight: "4px",
          }}
        >
          {/* Panel title bar */}
          <div
            style={{
              background: "linear-gradient(to right, #000080, #1084d0)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 11,
              padding: "2px 6px",
              flexShrink: 0,
            }}
          >
            📋 Active Habits
          </div>

          {/* Column headers */}
          <div
            className="win-raised"
            style={{
              display: "flex",
              padding: "2px 6px",
              fontSize: 10,
              fontWeight: "bold",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span style={{ flex: 2 }}>Name</span>
            <span style={{ flex: 1 }}>Category</span>
            <span style={{ flex: 1 }}>Goal</span>
            <span style={{ flex: 1 }}>Streak</span>
            <span style={{ flex: 1 }}>Priority</span>
            <span style={{ flex: 1 }}>Status</span>
            <span style={{ flex: 2 }}>Actions</span>
          </div>

          <div
            className="win-sunken"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0",
            }}
          >
            <HabitList />
          </div>
        </div>

        {/* ── Right Panel: Add Habit ── */}
        <div
          className="win-window"
          style={{
            width: 240,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Panel title bar */}
          <div
            style={{
              background: "linear-gradient(to right, #000080, #1084d0)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 11,
              padding: "2px 6px",
              flexShrink: 0,
            }}
          >
            ➕ New Habit
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "6px" }}>
            <HabitForm />
          </div>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className="win-statusbar" style={{ flexShrink: 0 }}>
        <div className="win-status-panel">Ready</div>
        <div className="win-status-panel" style={{ flex: 2 }}>
          Goal: 75% complete today
        </div>
        <div className="win-status-panel">{dateStr}</div>
        <div
          style={{
            borderTop: "1px solid var(--bevel-dark)",
            borderLeft: "1px solid var(--bevel-dark)",
            borderRight: "1px solid var(--bevel-light)",
            borderBottom: "1px solid var(--bevel-light)",
            padding: "1px 8px",
            fontSize: 10,
          }}
        >
          🌐 Local
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
