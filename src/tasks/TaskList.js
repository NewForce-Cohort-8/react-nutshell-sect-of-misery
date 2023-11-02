import { useEffect, useState } from "react"
import "./Tasks.css"
import { useNavigate } from "react-router-dom"
//state is managed at the component level. Data is fetched from the DOM when a customer submites a ticket then this function stores the state of the ticket and returns an array for the ApplicationViews variable so it can then publish to the webpage.
export const TaskList = ({searchTermState}) => {
    const [tickets, setTasks] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState([false])
    const [openOnly, updateOpenOnly] = useState([false])
    const navigate = useNavigate()
//get the honeyUser out of storage login
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
          })
          setFiltered(searchedTickets)
        },
          [searchTermState]
    )
//function to filter the emergency only button to only display emergencies when clicked.
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
            .then (response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
        },
        []
    )
//if user is a customer it will only show their tickets, if they are staff it will show all tickets
useEffect(
    () => {
        if (honeyUserObject.staff) {
            //for employees
            setFiltered(tickets)
        }
        else {
            //for customers
            const myTickets = tickets.filter(tickets => tickets.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
    [tickets]
)
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted ===""
            })
            setFiltered(openTicketArray)
        }
        else{
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
        [ openOnly ]
    )
//to remove unique key prop error similar to id attribute (uniquely identifies that componenet) React uses the unique keys to update the DOM. Add a key prop primary key of each object to build key property key={`ticket--${ticket.id}`}
return <>
{
    honeyUserObject.staff
         ? <>
         <button onClick={ () => {setEmergency(true)}}>Emergency Only</button>
         <button onClick={ () => {setEmergency(false)}}>Show All</button>
         </>
            : <>
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </>
}
<h2>List of Tickets</h2>
<article className="tickets">
    {
        filteredTickets.map(
            (ticket) => {
                return <section className="ticket" key={`ticket--${ticket.id}`}>
                    <header>{ticket.description}</header>
                    <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                </section>
            }
        )
    }
          </article>
    </>
}