import { useApp } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tasks, theme } = useApp()
  const data = tasks.map(task => ({
    name: task.title,
    sessions: task.sessions
  }))

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-16">
      <h1 className="text-3xl font-bold text-[#6C63FF]">داشبورد</h1>
      <div className={`rounded-2xl p-6 shadow-lg ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
        <h2 className="text-[#6C63FF] font-bold text-xl mb-4">کل سشن‌ها</h2>
        <BarChart width={400} height={300} data={data}>
          <XAxis dataKey="name" stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
          <YAxis stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
          <Tooltip />
          <Bar dataKey="sessions" fill="#6C63FF" radius={[6, 6, 0, 0]} />
        </BarChart>
      </div>
      <Link to="/dashboard/week" className="text-center p-3 bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors">
        ۷ روز اخیر
      </Link>
    </div>
  )
}

export default Dashboard