import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
export const EventsEdit = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [event, update] = useState({
        userId: 0,
        url: "",
        date: "",
        eventName: "",
        location: ""
    })
    const { eventId } = useParams()
    const navigate = useNavigate()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
        useEffect(
            () => {
                fetch(`http://localhost:8088/events/${eventId}`)
                    .then(response => response.json())
                    .then((data) => {
                        update(data)
                    })
            }, [eventId]
        )
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const handleSaveButtonClick = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }
    return (
        <>
        <NavBar />
        <Link to={"/"} ><button className="btn btn-primary">Back</button></Link>
        <form className="eventEditForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL of the event"
                        value={event.url}
                        onChange={
                            (e) => {
                                const copy = {...event}
                                copy.url = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name of the event"
                        value={event.eventName}
                        onChange={
                            (e) => {
                                const copy = {...event}
                                copy.eventName = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Date of the event"
                        value={event.date}
                        onChange={
                            (e) => {
                                const copy = {...event}
                                copy.date = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location of the event"
                        value={event.location}
                        onChange={
                            (e) => {
                                const copy = {...event}
                                copy.location = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <div className="btn">
            <button className="btn btn-primary" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Save Edits
            </button>
            </div>
        </form>
        </>
    )
}