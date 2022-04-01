import configData from '../config.json'

const fetchTasks = async() => {
    const res = await fetch(configData.Urls.getUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
    )
    const data = await res.json()
    return data
}

const updateTasks = async(data) => {
    var json = data
    var tasks=json[Object.keys(json)[0]]; 
    await fetch(configData.Urls.updateTasksUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks)
    })
}

export {
    fetchTasks,
    updateTasks
}