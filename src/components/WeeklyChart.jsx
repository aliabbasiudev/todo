import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyChart = () => {
  const { tasks, theme } = useApp()

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toLocaleDateString('fa-IR')
  }).reverse()

  const data = last7Days.map(day => ({
    name: day,
    sessions: tasks.reduce((acc, task) => {
      const count = (task.history || []).filter(timestamp =>
        new Date(timestamp).toLocaleDateString('fa-IR') === day
      ).length
      return acc + count
    }, 0)
  }))

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-16 px-4 pb-10">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="text-[#6C63FF] text-2xl">←</Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6C63FF]">۷ روز اخیر</h1>
      </div>

      <div className={`rounded-2xl p-4 sm:p-6 shadow-lg ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
            <YAxis tick={{ fontSize: 12 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
              <Tooltip
                 contentStyle={{
                 backgroundColor: theme === 'dark' ? '#1A1A2E' : 'white',
                 border: '1px solid #6C63FF',
                 borderRadius: '8px',
                 color: theme === 'dark' ? '#E8E8F0' : '#1A1A2E'
                               }}
             />
            <Bar dataKey="sessions" fill="#6C63FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeeklyChart