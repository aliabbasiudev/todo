import { useApp } from "../context/AppContext";

const TaskList = () => {
  const { tasks, deleteTask, theme } = useApp()

  if (tasks.length === 0) return (
    <div className={`rounded-2xl p-4 sm:p-6 shadow-lg text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A1A2E] text-[#E8E8F0]' : 'bg-white text-[#1A1A2E]'}`}>
      <p className="text-sm sm:text-base text-[#6C63FF]">هنوز تسکی نداری — یکی اضافه کن!</p>
    </div>
  )

  return (
    <div className={`rounded-2xl p-4 sm:p-6 shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
      <h2 className="text-[#6C63FF] font-bold text-base sm:text-xl mb-4">تسک‌ها</h2>
      <div className="flex flex-col gap-2 sm:gap-3">
        {tasks.map(task => (
          <div key={task.id} className={`flex justify-between items-center p-3 sm:p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'border-[#6C63FF33] hover:border-[#6C63FF]' : 'border-[#6C63FF22] hover:border-[#6C63FF]'}`}>
            <div>
              <p className="font-bold text-sm sm:text-base">{task.title}</p>
              <p className="text-xs sm:text-sm text-[#6C63FF]">{task.time} دقیقه | {task.sessions} بار انجام شده</p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-600 transition-colors text-lg sm:text-xl p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList