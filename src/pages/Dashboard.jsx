import { useApp } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tasks, theme } = useApp()
  const data = tasks.map(task => ({
    name: task.title,
    sessions: task.sessions
  }))

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-16 px-4 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#6C63FF]">داشبورد</h1>
      
      <div className={`rounded-2xl p-4 sm:p-6 shadow-lg ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
        <h2 className="text-[#6C63FF] font-bold text-base sm:text-xl mb-4">کل سشن‌ها</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
            <YAxis tick={{ fontSize: 12 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
            <Tooltip />
            <Bar dataKey="sessions" fill="#6C63FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Link to="/dashboard/week" className="text-center py-3 px-4 text-sm sm:text-base bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors">
        ۷ روز اخیر
      </Link>
    </div>
  )
}

export default Dashboard