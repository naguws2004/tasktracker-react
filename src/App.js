import { useState, useEffect } from "react"
import Welcome from './components/Welcome' 
import Menu from './components/Menu'
import Header from './components/Header' 
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import { fetchTasks, updateTasks } from "./backend/apiEngine"

function App() {
  const name = "Nagesh K";
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async()=>{ 
        const data = await fetchTasks()
        setTasks(data)
    }
    getTasks()
  },[])
  
  // Refresh Data from server
  const refreshData = async()=>{ 
    const data = await fetchTasks()
    setTasks(data)
  }

  // Save Data to server
  const saveData = async(data)=>{ 
    await updateTasks(data)
  }

  // Add Task in local cache
  const addTask = (task) => {
    const TaskId = Math.floor(Math.random() * 1000) + 1
    const newTask = { TaskId, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task in local cache
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task)=>task.TaskId!==taskId))
  }

  // Toggle Reminder in local cache
  const toggleReminder = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.TaskId === taskId ? { ...task, Remind: !task.Remind } : task
      )
    )
  }

  return (
    <>
      <div className="welcome">
        <Welcome name={name}/>
      </div>
      <div className="container">
        <Menu onRefreshClick={refreshData} onSaveClick={()=>saveData({tasks})} />
        <Header onAddClick={()=> setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        {
          showAddTask && <AddTask onAdd={addTask} />
        }
        { 
          tasks.length > 0 
          ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          : <div style={{display: 'flex', justifyContent: 'center'}}>No Tasks to Show</div>
        }
      </div>
    </>
  );
}

export default App;