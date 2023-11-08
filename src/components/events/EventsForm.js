import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventsForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [event, update] = useState({
    description: "",
    completed: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()

        // TODO: Create the object to be saved to the API
       
        const eventToSendToAPI = {
            userId: honeyUserObject.id,
            url: event.url,
            date: event.date,
            eventName: event.eventName,
            location: event.location,
        }

       // TODO: Perform the fetch() to POST the object to the API

       return fetch(` http://localhost:8088/events `, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")

            } )
    }

    return (
        <form className="eventsForm">
            <h2 className="eventsForm__title">New Event</h2>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="description">URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="url"
                        value={event.url}
                        onChange={
                            (evt) => {
                        const copy = {...event}
                        copy.url = evt.target.value
                        update(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                    <label htmlFor="date">Date</label>
                    <input
                        required autoFocus
                        type="Date"
                        className="form-control"
                        placeholder="Date"
                        value={event.date}
                        onChange={
                            (evt) => {
                        const copy = {...event}
                        copy.date = evt.target.value
                        update(copy)
                            }
                        } />
                    </fieldset>

                    <fieldset>
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="eventName"
                        value={event.eventName}
                        onChange={
                            (evt) => {
                        const copy = {...event}
                        copy.eventName = evt.target.value
                        update(copy)
                            }
                        } />
                    </fieldset>

                    <fieldset>
                    <label htmlFor="location">Location</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="location"
                        value={event.location}
                        onChange={
                            (evt) => {
                        const copy = {...event}
                        copy.location = evt.target.value
                        update(copy)
                            }
                        } />
                    </fieldset>

            <button className="btn btn-primary" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Submit Event
            </button>
        </form>
    )
}