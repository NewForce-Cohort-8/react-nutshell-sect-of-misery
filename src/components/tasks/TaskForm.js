// Author: Andy Hanks 
// Purpose: create tasks to send to API


import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const TaskForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [task, update] = useState({
        description:"",
        completed: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the task list
    */
   const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API
        const taskToSendToAPI = {
            userId: honeyUserObject.id,
            description: task.description,
            completed: task.completed,
            expectedCompletionDate: "",
            dateCompleted: "",
        }
       // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/tasks")
        })
    }
    return (
        <form className="taskForm">
            <h2 className="taskForm__title">New Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={task.description}
                        onChange={
                            (evt) => {
                               const copy = {...task}
                               copy.description = evt.target.value
                               update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">completed:</label>
                    <input type="checkbox"
                        value={task.completed}
                        onChange={
                            (evt) => {
                              const copy = {...task}
                              copy.completed = evt.target.checked
                              update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Task
            </button>
        </form>
    )
}