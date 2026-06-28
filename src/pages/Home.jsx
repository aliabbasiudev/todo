import Timer from "../components/Timer";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-16 px-4">
      <h1 className="text-3xl font-bold text-[#6C63FF]">Focus Tracker</h1>
      <Timer />
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default Home