import { useState } from "react"

const AddTask = ({onAdd}) => {
  const [TaskName, setTaskName] = useState('')
  const [TaskDateTime, setTaskDateTime] = useState('')
  const [Remind, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!TaskName) {
      alert("Please add Task Name!")
      return
    }

    onAdd({TaskName, TaskDateTime, Remind})

    setTaskName('')
    setTaskDateTime('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task Name</label>
            <input type="text" placeholder="Add Task Name" value={TaskName}
              onChange={(e) => setTaskName(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Task Date & Time</label>
            <input type="text" placeholder="Add Task Date & Time" value={TaskDateTime}
              onChange={(e) => setTaskDateTime(e.target.value)} />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={Remind}
              onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  )
}

export default AddTask