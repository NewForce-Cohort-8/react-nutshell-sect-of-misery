import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const EventsDetails = () => {
    const {eventsId} = useParams() 
    const [events, updateEvent] = useState({})

    useEffect(
        () => {
             fetch(`http://localhost:8088/events=${eventsId}`)
            .then(response => response.json())
            .then((data) => {
                const singleEvent = data[0]
                updateEvent(singleEvent)
        })
    },
        [eventId]
    )

    return <section className="event">
    <header className="event__header">Name: {events?.user?.name}</header>
    <div>Date: {events?.user?.date}</div>
    <div>Location: {events.location}</div>
    
</section>

}