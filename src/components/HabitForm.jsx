import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset } = useForm();

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completedDates: [],   // start empty
      createdAt: new Date().toISOString(),
    };
    addHabit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onCommit)} className="space-y-4 p-4 border rounded">
      {/* Habit Name */}
      <input
        type="text"
        placeholder="e.g. Morning Exercise"
        {...register("name", { required: true })}
        className="border p-2 w-full"
      />

      {/* Daily Goal */}
      <input
        type="number"
        placeholder="30"
        {...register("goalValue", { required: true })}
        className="border p-2 w-full"
      />

      {/* Unit */}
      <select {...register("unit")} className="border p-2 w-full">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
        <option value="reps">Reps</option>
      </select>

      {/* Start Date */}
      <input
        type="date"
        {...register("startDate")}
        className="border p-2 w-full"
      />

      {/* Category */}
      <select {...register("category")} className="border p-2 w-full">
        <option value="health">Health</option>
        <option value="mindset">Mindset</option>
        <option value="productivity">Productivity</option>
      </select>

      {/* Motivation */}
      <textarea
        placeholder="Why is this important to you?"
        {...register("motivation")}
        className="border p-2 w-full"
      />

      {/* Priority Level */}
      <div className="flex gap-4">
        <label>
          <input type="radio" value="low" {...register("priority")} /> Low
        </label>
        <label>
          <input type="radio" value="medium" {...register("priority")} /> Medium
        </label>
        <label>
          <input type="radio" value="high" {...register("priority")} /> High
        </label>
      </div>

      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;