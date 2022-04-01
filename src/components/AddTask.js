import { useState } from "react"
import DateTimePicker from 'react-datetime-picker';

const AddTask = ({onAdd}) => {
  const [TaskName, setTaskName] = useState('')
  const [TaskDateTime, setTaskDateTime] = useState(new Date())
  const [Remind, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!TaskName) {
      alert("Please add Task Name!")
      return
    }

    onAdd({TaskName, TaskDateTime, Remind})

    setTaskName('')
    setTaskDateTime(new Date())
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <span>
              <label>Task Name</label>
              <input type="text" placeholder="Add Task Name" value={TaskName}
                onChange={(e) => setTaskName(e.target.value)} />
            </span>
        </div>
        <div className="form-control form-control-check">
            <span>
              <label>Task Date & Time</label>
              &nbsp;<DateTimePicker onChange={(e) => setTaskDateTime(e)} value={TaskDateTime} />
            </span>
            <span>
              <label>Set Reminder</label>
              <input type="checkbox" checked={Remind}
                  onChange={(e) => setReminder(e.currentTarget.checked)} />
            </span>
        </div>
        <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  )
}

export default AddTask