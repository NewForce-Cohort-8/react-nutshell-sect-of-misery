import { useEffect, useState } from "react"
import "./Message.css"
import { MessageEdit } from "./MessageEdit"


//defines the react functional component MessageList
export const MessageList = () => {

  //filteredMessages holds the array, setFiltered is used to update it.
    const [filteredMessages, setFiltered] = useState([])


 

//get the honeyUser out of storage login 
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

   


//useEffect hook used to fetch messages from the URL and stores them in state
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

  //rendering the list of messages. 
return <> 

<h2>List of Messages</h2>
    <MessageEdit />
    </>
}
