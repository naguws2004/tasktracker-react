import { useState } from "react"
import DateTimePicker from 'react-datetime-picker';
import { useAuth0 } from "@auth0/auth0-react"

const AddTask = ({onAdd}) => {
  const [TaskName, setTaskName] = useState('')
  const [TaskDateTime, setTaskDateTime] = useState(new Date())
  const [Remind, setReminder] = useState(false)
  const { user, isAuthenticated } = useAuth0()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!TaskName) {
      isAuthenticated && alert("Please add Task Name!")
      return
    }

    const EmailId = user.email
    onAdd({EmailId, TaskName, TaskDateTime, Remind})

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