const reducer = (state = [], action) => {
    switch(action.type)
    {
        case "update":
            return state = action.payload 
        default:
            return state
    }
}

export default reducer