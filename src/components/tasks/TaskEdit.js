import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export const TaskEdit = () => {
    // TODO: This state object should not be blank
    const [task, assignTask] = useState({
            userId: 0,
            description: "",
            completed: false,
            expectedCompletionDate: "",
            dateCompleted: ""
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { taskId } = useParams()
    const navigate = useNavigate()

    // TODO: Get the task state from the API.
    useEffect(() => {
        getIndividualTasks(taskId)
            .then((data) => {
                assignTask(data)
            })

    }, [ taskId ])

// Fetch Function - TaskEdit.js
const getIndividualTasks = (taskId) => {
    return fetch(`http://localhost:8088/tasks/${taskId}`)
        .then(res => res.json())
}
    // PUT Function - TaskEdit.js
 const getTasksAndReplace = (task) => { 
    return fetch (`http://localhost:8088/tasks/${taskId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
})
        .then(res => res.json())
}


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Write the fetch for the PUT request to replace the object being edited

        getTasksAndReplace(task)
        .then(() => {
           navigate("/") // what does this do?
        })
        
    }

    return <form className="taskForm">
        <h2 className="taskForm__title"> Task</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={task.description}
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...task}
                            copy.description = evt.target.value
                            assignTask(copy)
                        }
                    }>{task.description}</textarea>
            </div>
            <div className="form-group">
                <label htmlFor="expectedCompletionDate">When do you need it? :</label>
                <input
                    required autoFocus
                    type="date"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={task.expectedCompletionDate}
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...task}
                            copy.expectedCompletionDate = evt.target.value
                            assignTask(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="completed">Is it done? :</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...task}
                            copy.completed = evt.target.checked
                            copy.dateCompleted = Date.now() 
                            assignTask(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}
