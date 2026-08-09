import { useApp } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import { getAIInsight } from '../api/gemini'

const WORD_DELAY_MS = 45 

const Dashboard = () => {
  const { tasks, theme } = useApp()
  const data = tasks.map(task => ({
    name: task.title,
    sessions: task.sessions
  }))
  const [displayedInsight, setDisplayedInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const streamIntervalRef = useRef(null)

  
  useEffect(() => {
    return () => clearInterval(streamIntervalRef.current)
  }, [])

 
  const streamText = (fullText) => {
    clearInterval(streamIntervalRef.current)
    const words = fullText.split(' ')
    let i = 0
    setDisplayedInsight('')
    setStreaming(true)

    streamIntervalRef.current = setInterval(() => {
      i++
      setDisplayedInsight(words.slice(0, i).join(' '))
      if (i >= words.length) {
        clearInterval(streamIntervalRef.current)
        setStreaming(false)
      }
    }, WORD_DELAY_MS)
  }

  const handleInsight = async () => {
    setLoading(true)
    setError('')
    setDisplayedInsight('')
    try {
      const result = await getAIInsight(tasks)
      setLoading(false)
      streamText(result)
    } catch (err) {
      console.error('AI insight failed:', err)
      setError('دریافت تحلیل با مشکل مواجه شد، دوباره امتحان کن')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-16 px-4 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#6C63FF]">داشبورد</h1>
      
      <div className={`rounded-2xl p-4 sm:p-6 shadow-lg ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
        <h2 className="text-[#6C63FF] font-bold text-base sm:text-xl mb-4">کل دفعات انجام شده</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
            <YAxis tick={{ fontSize: 12 }} stroke={theme === 'dark' ? '#E8E8F0' : '#1A1A2E'} />
            <Tooltip
            cursor={{ fill: 'rgba(108, 99, 255, 0.1)' }}
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

      <Link to="/dashboard/week" className="text-center py-3 px-4 text-sm sm:text-base bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors">
        ۷ روز اخیر
      </Link>
      <div className={`rounded-2xl p-4 sm:p-6 shadow-lg ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
  <h2 className="text-[#6C63FF] font-bold text-base sm:text-xl mb-4">تحلیل AI</h2>
  <button
    onClick={handleInsight}
    disabled={loading || streaming || tasks.length === 0}
    className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5a52e0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {loading ? 'در حال تحلیل...' : 'تحلیل کن'}
  </button>
  {error && (
    <p className="mt-4 text-sm sm:text-base text-red-500">{error}</p>
  )}
  {displayedInsight && (
    <p className={`mt-4 text-sm sm:text-base leading-7 ${theme === 'dark' ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
      {displayedInsight}
      {streaming && <span className="inline-block w-2 h-4 bg-[#6C63FF] ml-1 animate-pulse align-middle" />}
    </p>
  )}
</div>
    </div>
  )
}

export default Dashboard