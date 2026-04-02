import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      priority: "medium",
    },
  });

  const selectedPriority = watch("priority");

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    addHabit(payload);
    reset({ priority: "medium" });
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition";

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Habit</h2>

        <form onSubmit={handleSubmit(onCommit)} className="flex flex-col gap-5">
          {/* Habit Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Habit Name
            </label>
            <input
              type="text"
              placeholder="e.g. Morning Exercise"
              {...register("name", { required: true })}
              className={inputClass}
            />
          </div>

          {/* Daily Goal + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Daily Goal
              </label>
              <input
                type="number"
                placeholder="30"
                {...register("goalValue", { required: true })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Unit
              </label>
              <select
                {...register("unit")}
                className={inputClass + " cursor-pointer"}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="reps">Reps</option>
                <option value="pages">Pages</option>
                <option value="glasses">Glasses</option>
              </select>
            </div>
          </div>

          {/* Start Date + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Category
              </label>
              <select
                {...register("category")}
                className={inputClass + " cursor-pointer"}
              >
                <option value="mindset">Mindset</option>
                <option value="health">Health</option>
                <option value="productivity">Productivity</option>
                <option value="finance">Finance</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Motivation
            </label>
            <textarea
              placeholder="Why is this important to you?"
              rows={3}
              {...register("motivation")}
              className={inputClass + " resize-y min-h-[80px]"}
            />
          </div>

          {/* Priority Level — custom radio UI backed by react-hook-form */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex gap-6">
              {["low", "medium", "high"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                >
                  {/* Hidden native radio keeps react-hook-form happy */}
                  <input
                    type="radio"
                    value={level}
                    {...register("priority")}
                    className="sr-only"
                  />
                  {/* Custom visual radio */}
                  <div
                    onClick={() => setValue("priority", level)}
                    className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer
                      ${
                        selectedPriority === level
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-gray-300 bg-white"
                      }`}
                  >
                    {selectedPriority === level && (
                      <div className="w-[7px] h-[7px] rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={
                      selectedPriority === level ? "font-semibold" : ""
                    }
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition mt-1 cursor-pointer"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
