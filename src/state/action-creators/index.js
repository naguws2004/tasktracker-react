export const updateTasksInStore = (tasks) => {
    return (dispatch) => {
        dispatch({
            type: "update",
            payload: tasks
        })
    }
}
