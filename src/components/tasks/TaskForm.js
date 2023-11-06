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
            expectedCompletionDate: task.expectedCompletionDate,
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
            navigate("/")
        })
    }
    return (
        // task description field
        <form className="taskForm">
            <h2 className="taskForm__title">New Task Entry</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">New Task:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="To-do"
                        value={task.description}
                        onChange={
                            (evt) => {
                               const copy = {...task}
                               copy.description = evt.target.value
                               update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="expectedCompletionDate">Expected Completion Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder=""
                        value={task.expectedCompletionDate}
                        onChange={
                            (evt) => {
                               const copy = {...task}
                               copy.expectedCompletionDate = evt.target.value
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