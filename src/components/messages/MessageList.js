import { useEffect, useState } from "react"
import "./Message.css"

//state is managed at the component level. Data is fetched from the DOM when a customer submites a ticket then this function stores the state of the ticket and returns an array for the ApplicationViews variable so it can then publish to the webpage. 
export const MessageList = () => {
    
    const [filteredMessages, setFiltered] = useState([])
 

//get the honeyUser out of storage login 
    // const localHoneyUser = localStorage.getItem("honey_user")
    // const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages?_expand=user`)
            .then (response => response.json())
            .then((messageArray) => {
                setFiltered(messageArray)
                console.log(messageArray)
            })
        },
        []
    )


//to remove unique key prop error similar to id attribute (uniquely identifies that componenet) React uses the unique keys to update the DOM. Add a key prop primary key of each object to build key property key={`message--${message.id}`}
return <> 
<h2>List of Messages</h2>

<article className="messages">
    {
        filteredMessages.map(
            (message) => {
                return <section className="message" key={`message--${message.id}`}>   
                    <div>{message?.user?.username}: {message.msg}</div>
                    
                </section>
            }
        )
    }
          </article>
    </>
}
