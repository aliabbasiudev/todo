import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const WeekiyChart =()=>{
 const{tasks}=useApp()

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
})) ;
return(
    <>
    <Link to={'/dashboard'}>/</Link>
      <BarChart width={400} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sessions" fill="#8884d8" />
</BarChart>
    </>
)
}

export default WeekiyChart