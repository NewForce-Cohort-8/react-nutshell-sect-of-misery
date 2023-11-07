import { useState } from "react"
import React from 'react';

export const MessageForm = () => {
    
    
    
    
    const [messageState, updatemessageState] = useState({
        username: "",
        message: "",
    })

    
   const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)  

const handleSaveButtonClick = (event) => {
        event.preventDefault()

        
        // TODO: Create the object to be saved to the API
        
        const messageToSendToAPI = {
            userId: honeyUserObject.id,
            msg: messageState.msg
            }



        

    // TODO: Perform the fetch() to POST the object to the API
       return fetch(`http://localhost:8088/messages`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageToSendToAPI)
    })
    .then(response => {
        if (response.ok) {
            // Message added successfully, trigger page reload
            window.location.reload();
        } else {
            // Handle errors from the API if necessary
            console.error('Error:', response.status);
        }
    })
    .catch(error => {
        // Handle other types of errors, like network issues
        console.error('Error:', error);
    });
};

    return (
        <form className="messageForm">
            <h2 className="messageForm__title">Messages</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="msg">Enter Message here:</label>
                     <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={messageState.msg}
                        
                        onChange={
                            (evt) => {
                                // TODO: Update message property
                                const copy = {...messageState}
                                copy.msg = evt.target.value
                                updatemessageState(copy)
                                
                                
                            }
                            
                        } />
                </div>
            </fieldset>
          
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Message
            </button>
        </form>
    )
    
}



