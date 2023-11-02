//messsage form module added by Kari add & delete messages on the database and webpage from here
import { useState } from "react"
// import { useNavigate } from "react-router-dom" might need later if go to multi-pg
import "./Message.css"


export const MessageForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [messageState, update] = useState({
        messages: ""
    })

    const [messages, setMessages] = useState([]);

    

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
        // const navigate = useNavigate() 

    
    
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
    .then((data) => {
        // navigate("/messages")
        setMessages([...messages,data]);
        update({description:""});
    })
    }


    //function to delete new messages from the webpage/database
    const handleDeleteButtonClick = (messageId) => {
        // Perform the fetch() to DELETE the message from the API
        fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(() => {
            // Remove the deleted message from the state
            const updatedMessages = messages.filter(message => message.id !== messageId);
            setMessages(updatedMessages);
        })
        .catch(error => {
            console.error("Error deleting message:", error);
        });
    };

return (
        <div>
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
                            onChange={(evt) => {
                                const copy = { ...messageState };
                                copy.description = evt.target.value;
                                update(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary"
                >
                    Submit Message
                </button>
            </form>
            <h2>Message Window</h2>
            <div className="message-list-container">
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            {message.messages}
                            <button onClick={() => handleDeleteButtonClick(message.id)}>Delete</button>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
        
    );
};

