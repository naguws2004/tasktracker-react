import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Welcome from './components/Welcome' 
import Menu from './components/Menu'
import Header from './components/Header' 
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import { actionCreators } from './state/index'
import { fetchTasks, saveTask, updateTask, deleteTask, updateTasks } from "./backend/apiEngine"

function App() {
  const name = "Nagesh K";
  //const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  const tasks = useSelector((state)=> state.tasksList)
  const dispatch = useDispatch()
  const { updateTasksInStore } = bindActionCreators(actionCreators, dispatch)
  
  useEffect(()=>{
    const getTasks = async()=>{ 
        const data = await fetchTasks()
        updateTasksInStore(data)
        //setTasks(data)
    }
    getTasks()
  },[])
  
  // Refresh Data from server
  const refreshData = async()=>{ 
    const data = await fetchTasks()
    updateTasksInStore(data)
    //setTasks(data)
  }

  // Save Data to server
  const saveData = async(data)=>{ 
    await updateTasks(data)
  }

  // Add Task in local cache
  const addATask = async(task) => {
    const TaskId = Math.floor(Math.random() * 1000) + 1
    const newTask = { TaskId, ...task }
    updateTasksInStore([...tasks, newTask])
    saveTask(newTask)
    //setTasks([...tasks, newTask])
  }

  // Delete Task in local cache
  const deleteATask = async(taskId) => {
    const remainingTasks = tasks.filter((task)=>task.TaskId!==taskId)
    updateTasksInStore(remainingTasks)
    deleteTask(taskId)
    //setTasks(tasks.filter((task)=>task.TaskId!==taskId))
  }

  // Toggle Reminder in local cache
  const toggleReminder = async(taskId) => {
    updateTasksInStore(
      tasks.map((task) =>
        task.TaskId === taskId ? { ...task, Remind: !task.Remind } : task
      )
    )
    updateTask(taskId)
    // setTasks(
    //   tasks.map((task) =>
    //     task.TaskId === taskId ? { ...task, Remind: !task.Remind } : task
    //   )
    // )
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
          showAddTask && <AddTask onAdd={addATask} />
        }
        { 
          tasks.length > 0 
          ? <Tasks tasks={tasks} onDelete={deleteATask} onToggle={toggleReminder} />
          : <div style={{display: 'flex', justifyContent: 'center'}}>No Tasks to Show</div>
        }
      </div>
    </>
  );
}

export default App;
