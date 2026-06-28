import { useState } from 'react'
import { useApp } from "../context/AppContext";
import { useTimer } from "../hooks/useTimer";

const Timer = () => {
  const { theme, tasks, incrementSession } = useApp()
  const [selectedTask, setSelectedTask] = useState(null)
  const selected = tasks.find(task => task.id === Number(selectedTask))
  const { timer, pause, timerLeft, reset } = useTimer(
    selected?.time || 25,
    () => { if (selectedTask) incrementSession(Number(selectedTask)) }
  )

  const minutes = String(Math.floor(timerLeft / 60)).padStart(2, '0')
  const seconds = String(timerLeft % 60).padStart(2, '0')

  return (
    <div className={`rounded-2xl p-8 shadow-lg text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
      <select
        onChange={(e) => { setSelectedTask(e.target.value); reset() }}
        className={`w-full p-3 rounded-xl mb-6 border-2 border-[#6C63FF] outline-none transition-colors ${theme === 'dark' ? 'bg-[#0F0F1A] text-[#E8E8F0]' : 'bg-[#F8F5F0] text-[#1A1A2E]'}`}
      >
        <option value="">یه تسک انتخاب کن</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>{task.title}</option>
        ))}
      </select>

      <div className="text-7xl font-bold text-[#6C63FF] mb-8 tracking-widest">
        {minutes}:{seconds}
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={timer} className="px-8 py-3 bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors">
          شروع
        </button>
        <button onClick={pause} className={`px-8 py-3 rounded-xl font-bold border-2 border-[#6C63FF] transition-colors ${theme === 'dark' ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
          توقف
        </button>
      </div>
    </div>
  )
}

export default Timer