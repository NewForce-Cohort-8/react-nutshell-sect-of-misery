//used information from TicketForm Chapter 7 Honey Rae

import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const MessageForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [messageState, update] = useState({
        messages: ""
    })

    

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
        const navigate = useNavigate() 

    
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
       
        

    // TODO: Create the object to be saved to the API
    const messageToSendToAPI = {
        userId: honeyUserObject.id,
        messages: messageState.description
    } 

    // TODO: Perform the fetch() to POST the object to the API
    return fetch(`http://localhost:8088/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageToSendToAPI)

    })
    .then(response => response.json())
    .then(() => {
        navigate("/messages")
    })
    }

    return (
        <form className="messageForm">
            <h2 className="messageForm__title">Messages</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Message:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter new message here"
                        value={messageState.description}
                        onChange={
                          (evt) => {
                            const copy = {...messageState}
                            copy.description = evt.target.value
                            update(copy)
                          }

                        } />
                </div>
            </fieldset>
            
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Message
            </button>
        </form>
    )
}