//
import { useEffect, useState } from "react"
import "./Tasks.css"
import { useNavigate } from "react-router-dom"
//state is managed at the component level. Data is fetched from the DOM when a customer submites a ticket then this function stores the state of the ticket and returns an array for the ApplicationViews variable so it can then publish to the webpage.
export const TaskList = ({searchTermState}) => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFiltered] = useState([])
    const [completed, setCompleted] = useState([false])
    const [openOnly, updateOpenOnly] = useState([false])
    const navigate = useNavigate()
//get the honeyUser out of storage login
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
   
//function to filter the completed button to only display incomplete tasks clicked.
    useEffect(
        () => {
            if (completed) {
                const completedTasks = tasks.filter(task => task.completed !== true)
                setFiltered(completedTasks)
            }
            else {
                setFiltered(tasks)
            }
        },
        [completed]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks`)
            .then (response => response.json())
            .then((taskArray) => {
                setTasks(taskArray)
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
    useEffect(
        () => {
            if (openOnly) {
                const openTaskArray = tasks.filter(task => {
                return task.userId === honeyUserObject.id && task.dateCompleted ===""
            })
            setFiltered(openTaskArray)
        }
        else{
            const myTasks = tasks.filter(task => task.userId === honeyUserObject.id)
            setFiltered(myTasks)
        }
    },
        [ openOnly ]
    )
//to remove unique key prop error similar to id attribute (uniquely identifies that componenet) React uses the unique keys to update the DOM. Add a key prop primary key of each object to build key property key={`task--${task.id}`}
return <>
{

 <>
         <button onClick={ () => {setCompleted(true)}}>Completed Only</button>
         <button onClick={ () => {setCompleted(false)}}>Show All</button>

            <button onClick={() => navigate("/task/create")}>Create Task</button>
            <button onClick={() => updateOpenOnly(true)}>Open Tasks</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tasks</button>
            </>
}
<h2>List of Tasks</h2>
<article className="tasks">
    {
        filteredTasks.map(
            (task) => {
                return <section className="task" key={`task--${task.id}`}>
                    <header>{task.description}</header>
                    <footer>Completed: {task.dateCompleted}</footer>
                </section>
            }
        )
    }
          </article>
    </>
}