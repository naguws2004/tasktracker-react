import configData from '../config.json'

const fetchTasks = async(data) => {
    const res = await fetch(configData.Urls.getUrl + '/' + data, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
            },
        },
    )
    const result = await res.json()
    alert('Tasks retrieved. No. of tasks: ' + result.length)
    return result
}

const saveTask = async(data) => {
    alert('Adding new task "' + data.TaskName + '"')
    await fetch(configData.Urls.postUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

const updateTask = async(data) => {
    alert('Updating reminder for task "' + data.TaskName + '"')
    await fetch(configData.Urls.putUrl + '/' + data.TaskId, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const deleteTask = async(data) => {
    alert('Deleting task "' + data.TaskName + '"')
    await fetch(configData.Urls.deleteUrl + '/' + data.TaskId, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const updateTasks = async(data) => {
    var json = data
    var tasks=json[Object.keys(json)[0]]; 
    await fetch(configData.Urls.updateTasksUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks)
    })
}

export {
    fetchTasks,
    saveTask,
    updateTask,
    deleteTask,
    updateTasks
}