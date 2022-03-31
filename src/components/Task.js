import { FaTimes } from "react-icons/fa"

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div 
        className={`task ${task.Remind ? 'reminder' : ''}`} 
        onDoubleClick={() => onToggle(task.TaskId)}>
        <h3>
          {task.TaskName} 
          <FaTimes 
            style={{color:'#900C3F', cursor:'pointer'}}
            onClick={() => onDelete(task.TaskId)} 
          />
        </h3>
        <p>{task.TaskDateTime}</p>
    </div>
  )
}

export default Task