import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset } = useForm();

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    addHabit(payload);
    reset();
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    marginBottom: 2,
    fontWeight: "bold",
    color: "#000",
  };

  const fieldStyle = { marginBottom: 8 };

  return (
    <form
      onSubmit={handleSubmit(onCommit)}
      style={{ display: "flex", flexDirection: "column", gap: "0px" }}
    >
      {/* Groupbox: Basic Info */}
      <div className="win-groupbox" style={{ marginBottom: 8 }}>
        <span className="win-groupbox-label">Basic Info</span>

        <div style={fieldStyle}>
          <label style={labelStyle}>Habit Name:</label>
          <input
            type="text"
            placeholder="e.g. Morning Exercise"
            {...register("name", { required: true })}
            className="win-input"
          />
        </div>

        <div style={{ display: "flex", gap: "6px", ...fieldStyle }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Goal:</label>
            <input
              type="number"
              placeholder="30"
              {...register("goalValue", { required: true })}
              className="win-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Unit:</label>
            <select {...register("unit")} className="win-select">
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="reps">Reps</option>
            </select>
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Start Date:</label>
          <input
            type="date"
            {...register("startDate")}
            className="win-input"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Category:</label>
          <select {...register("category")} className="win-select">
            <option value="health">Health</option>
            <option value="mindset">Mindset</option>
            <option value="productivity">Productivity</option>
          </select>
        </div>
      </div>

      {/* Groupbox: Details */}
      <div className="win-groupbox" style={{ marginBottom: 8 }}>
        <span className="win-groupbox-label">Details</span>

        <div style={fieldStyle}>
          <label style={labelStyle}>Motivation:</label>
          <textarea
            placeholder="Why is this important to you?"
            {...register("motivation")}
            className="win-textarea"
            rows={3}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Priority Level:</label>
          <div style={{ display: "flex", gap: "12px", marginTop: 2 }}>
            {["low", "medium", "high"].map((p) => (
              <label
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  fontSize: 11,
                }}
              >
                <input
                  type="radio"
                  value={p}
                  {...register("priority")}
                  style={{ cursor: "pointer" }}
                />
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
        <button
          type="submit"
          className="win-btn win-btn-primary"
          style={{ minWidth: 90 }}
        >
          OK
        </button>
        <button
          type="button"
          className="win-btn"
          onClick={() => reset()}
          style={{ minWidth: 70 }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default HabitForm;
