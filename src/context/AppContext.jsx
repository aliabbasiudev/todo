import { createContext, useContext, useState, useEffect } from 'react' ;

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext)
}
export const AppProvider =({children})=>{
    const [tasks,setTasks]=useState([]);
    const [theme,setTheme]= useState('light');
    const [loaded, setLoaded] = useState(false);
   

    useEffect(()=>{
        const saveTasks = localStorage.getItem('tasks')
        const saveTheme = localStorage.getItem('theme')
        if(saveTasks) setTasks(JSON.parse(saveTasks))
        if(saveTheme) setTheme(saveTheme)
        setLoaded(true)
    },[])
    
    useEffect(()=>{
        if(!loaded) return
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks, loaded])

useEffect(()=>{
    if(!loaded) return
    localStorage.setItem('theme', theme)
},[theme, loaded])

 const addTasks =(tasks)=>{
    setTasks(prev => [...prev,{...tasks,id:Date.now(), sessions: 0}])

 };



 const deleteTask =(id)=>{
    setTasks(prev => prev.filter(t => t.id !== id))

 };

 const toggleTheme =()=>{
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
 };

 const incrementSession = (id) => {
    setTasks(prev => prev.map(task => 
        task.id === id ? { 
            ...task, 
            sessions: task.sessions + 1,
            history: [...(task.history || []), Date.now()]
        } : task
    ))
}

return (
    <AppContext.Provider value={{tasks,addTasks,deleteTask,theme,toggleTheme ,incrementSession}}>
        {children}
    </AppContext.Provider>
)    
}