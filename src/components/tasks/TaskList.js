//
import { useEffect, useState } from "react"
import "./Tasks.css"
import { useNavigate } from "react-router-dom"
import { TaskEdit } from "./TaskEdit"
import { getAllTasksFetch } from "../views/ApplicationViews"
//state is managed at the component level. Data is fetched from the DOM when a customer submites a ticket then this function stores the state of the ticket and returns an array for the ApplicationViews variable so it can then publish to the webpage.
export const TaskList = ({}) => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFiltered] = useState([])


    const navigate = useNavigate()
//get the honeyUser out of storage login
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
   //////////////////////////////////////////////////////////////////////////////////////////
    // const completeButtonClick = (event) => {
    //     event.preventDefault()
    //     // TODO: Create the object to be saved to the API
    //     const taskToSendToAPI = {
    //         userId: honeyUserObject.id,
    //         description: task.description,
    //         completed: task.completed,
    //         expectedCompletionDate: task.expectedCompletionDate,
    //         dateCompleted: Date.now()
    //     }
    //    // TODO: Perform the fetch() to POST the object to the API
    //     return fetch(`http://localhost:8088/tasks`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(taskToSendToAPI)
    //     })
    //     .then(response => response.json())
    //     .then(() => {
    //         navigate("/")
    //     })
    // }

    //////////////////////////////////////////////////////////////////////////////////////////
//function to filter the completed button to only display incomplete tasks clicked.

    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks`)
            .then (response => response.json())
            .then((taskArray) => {
     const openTaskArray = taskArray.filter(task => {
                return task.userId === honeyUserObject.id && task.completed === false
            })
                setTasks(openTaskArray)
            })
        },
        []
    )
    
//if user is a customer it will only show their tasks, if they are staff it will show all tasks
useEffect(
    () => {
        // --This bit was to sort whether staff or not
        // if (honeyUserObject.staff) {
        //     //for employees
        //     setFiltered(tasks)
        // }
        // else {
            //for customers
            const myTasks = tasks.filter(tasks => tasks.userId === honeyUserObject.id)
            setFiltered(myTasks)
        // }
    },
    [tasks]
)
////////////////////not sure what this was for
    // useEffect(
    //     () => {
            
    //             const openTaskArray = tasks.filter(task => {
    //             return task.userId === honeyUserObject.id && task.dateCompleted ===""
    //         })
    //         setFiltered(openTaskArray)
    //     },

 
    //     [ openOnly ]
    // )

    const getAllTasks = () => {
        fetch(`http://localhost:8088/tasks`)
        .then (response => response.json())
        .then((taskArray) => {
            const openTaskArray = taskArray.filter(task => {
            return task.userId === honeyUserObject.id && task.completed === false
        })
            setTasks(openTaskArray)
        })
    }

    const getTasksAndReplace = (singleTask) => { 
        return fetch (`http://localhost:8088/tasks/${singleTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleTask)
    })
            .then(res => res.json())
            .then(getAllTasks())
    }

//to remove unique key prop error similar to id attribute (uniquely identifies that componenet) React uses the unique keys to update the DOM. Add a key prop primary key of each object to build key property key={`task--${task.id}`}
return <>
{

 <>


            { <button onClick={() => navigate("/task/TaskForm")}>Create Task</button> }

            </>
}
<h2>List of Tasks</h2>
<article className="tasks">
    {
        filteredTasks.map(
            (task) => {
                return <section className="task" key={`task--${task.id}`}>
                    <header>{task.description}</header>
                    <div>{task.dateCompleted}</div>
                    <div>{task.expectedCompletionDate}</div>
                    <div className="form-group">
                    <label htmlFor="completed">Is it done? :</label>
                    <input type="checkbox"
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...task}
                            copy.completed = evt.target.checked
                            copy.dateCompleted = Date.now()
                            getTasksAndReplace(copy)
                        }
                    } />
            </div>
                    <footer>Completed: {task.completed ? "Yes" : "No"}</footer>

                    { <button onClick={() => navigate(`/task/${task.id}`)}>Edit Task</button> }
                </section>
            }
        )
    }
          </article>
    </>
}