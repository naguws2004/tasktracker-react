import configData from '../config.json'

const fetchTasks = async() => {
    const res = await fetch(configData.Urls.getUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
            },
        },
    )
    const data = await res.json()
    return data
}

const saveTask = async(data) => {
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
    await fetch(configData.Urls.putUrl + '/' + data, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const deleteTask = async(data) => {
    await fetch(configData.Urls.deleteUrl + '/' + data, {
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