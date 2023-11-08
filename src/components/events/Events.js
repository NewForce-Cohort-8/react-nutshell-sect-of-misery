import { Link } from "react-router-dom"

import {getEvents, getUsers, saveEvent, deleteEvent } from "./dataAccess.js";

const contentTarget = document.querySelector(".dashboard")
const mainContainer = document.querySelector(".dashboard")

mainContainer.addEventListener("click", click => {
    const newEvent = document.querySelector("#event-form");
    if (click.target.id.startsWith("deleteEvent--")) {
        const [,requestId] = click.target.id.split("--")
        deleteEvent(parseInt(requestId))
    }

    if (click.target.id === "new-event") {
        if (newEvent.style.display === "none") {
            newEvent.style.display = "block"
        } else {
        newEvent.style.display = "none";
        }
    }

    if (click.target.id === "submitRequestEvent") {
       const userEvent = document.querySelector("input[name='eventContent']").value;
       const dataToSendToAPI = {
           event: userEvent,
           userId: parseInt(sessionStorage.activeUser)
       }
    saveEvent(dataToSendToAPI)
       newEvent.style.display = "none"
    }
})

export const Events = ({event}) => {
    return <section className="event">
        
     <div>{event.user?.name}</div>  
     <div>{event.event}</div>  

    </section>
}

export const eventHTML = () => {
    const events = getEvents();
    const users = getUsers();
    console.log(events)
     {
        events.map(event => {
                const user = users.find(user => user.id === event.userId);
                return `<section class="event" id="event-${event.id}">
                <p class="eventUser">${user.id}: ${event.event}</p>
                
                <button id="deleteEvent--${event.id}">Delete Event</button>
                </section>
                `
            }
        ).join("")}

        `<div class="event-form">
        <input type="text" name="eventContent" class="eventContent" />
        <button id="submitRequestEvent">Add Event</button>
        </div>

    </div>`
}