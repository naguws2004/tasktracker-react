import { FaTimes } from "react-icons/fa"

const Task = ({task, onDelete, onToggle}) => {
  
  const taskDate = new Date(task.TaskDateTime)
  const dateString = taskDate.toDateString() + ' ' + taskDate.toLocaleTimeString()
  
  return (
    <div 
        className={`task ${task.Remind ? 'reminder' : ''}`} 
        onDoubleClick={() => onToggle(task)}>
        <h3>
          {task.TaskName} 
          <FaTimes 
            style={{color:'#900C3F', cursor:'pointer'}}
            onClick={() => onDelete(task)} 
          />
        </h3>
        <p>{dateString}</p>
    </div>
  )
}

export default Task