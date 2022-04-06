//import { useState, useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useAuth0 } from "@auth0/auth0-react"
import Welcome from './components/Welcome' 
import Menu from './components/Menu'
import Header from './components/Header' 
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import { actionCreators } from './state/index'
import { fetchTasks, saveTask, updateTask, deleteTask, updateTasks } from "./backend/apiEngine"

function App() {
  //const [tasks, setTasks] = useState([])
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [ showAddTask, setShowAddTask ] = useState(false)
  const [ isDataLoaded, setIsDataLoaded ] = useState(false)
  const tasks = useSelector((state)=> state.tasksList)
  const dispatch = useDispatch()
  const { updateTasksInStore } = bindActionCreators(actionCreators, dispatch)
  
  // useEffect(()=>{
  //   const getTasks = async() => { 
  //     const emailId = await getUserEmailId()
  //     alert(emailId)
  //     const data = await fetchTasks(emailId)
  //     updateTasksInStore(data) 
  //     // setTasks(data)
  //   }
  //   isAuthenticated && getTasks()
  // },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const getUserEmailId = async() => { 
    try {
      const emailId = user.email
      return emailId
    } catch(err) {
      alert('Email Id could not be fetched. App will not work! Try refreshing your browser.')
      return ''
    }
  }

  // Refresh Data from server
  const refreshData = async()=>{ 
    const emailId = await getUserEmailId()
    const data = await fetchTasks(emailId)
    updateTasksInStore(data)
    //setTasks(data)
    setIsDataLoaded(true)
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
  const deleteATask = async(task) => {
    const remainingTasks = tasks.filter((t)=>t.TaskId!==task.TaskId)
    updateTasksInStore(remainingTasks)
    deleteTask(task)
    //setTasks(tasks.filter((t)=>t.TaskId!==task.TaskId))
  }

  // Toggle Reminder in local cache
  const toggleReminder = async(task) => {
    updateTasksInStore(
      tasks.map((t) =>
        t.TaskId === task.TaskId ? { ...t, Remind: !t.Remind } : t
      )
    )
    updateTask(task)
    // setTasks(
    //   tasks.map((t) =>
    //     t.TaskId === task.TaskId ? { ...t, Remind: !t.Remind } : t
    //   )
    // )
  }

  // if user details loading
  if (isLoading)
    return (
      <>
        <div className="welcome">
          Loading the App...Please wait...
        </div>
      </>
    ) 
  
  !isDataLoaded && isAuthenticated && refreshData()

  // if loaded
  return (
    <>
      <div className="welcome">
        <Welcome />
      </div>
      {
        isAuthenticated &&
        <div className="container">
          {/* <Menu onRefreshClick={refreshData} onSaveClick={()=>saveData({tasks})} /> */}
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
      }
    </>
  )
}

export default App
