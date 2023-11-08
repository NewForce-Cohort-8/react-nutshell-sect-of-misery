import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Events.css"

export const EventsList = ({ searchTermState }) => {
    const [events, setEvents] = useState([])
    const [openOnly, updateOpenOnly] = useState()
    const [filteredEvents, setFiltered] = useState([])
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const today = new Date()
    const formattedDate = today.toDateString()
    const newestEvent = (events.length -1)

  useEffect(
    () => {
        if (honeyUserObject) {
          setFiltered(events)

        }
    })

  useEffect(
            () => {
                if (openOnly) {
                    const openEventArray = events.filter(event => {
                        return event.userId === honeyUserObject.id === ""
                })
                setFiltered(openEventArray)
            }
                },
            [openOnly]
  )

  useEffect(
        () => {
            fetch(`http://localhost:8088/events`)
            .then(response => response.json())
            .then((eventArray) => {
                setEvents(eventArray)
            })

        },
        [] 
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/events`)
            .then(response => response.json())
            .then((eventArray) => {
                setEvents(eventArray)
            })

        },
        [] 
    )

    return  <>
    <div id="image-container">
             <img id="natural" src="https://wallup.net/wp-content/uploads/2016/01/258626-nature-landscape-lake-reflection-mountain-clouds-forest-Italy-water-summer-trees-calm.jpg"/>
             <img id="natural" src="http://wallup.net/wp-content/uploads/2015/12/217801-nature-landscape-trees-forest-mountain-Washington_state-USA-lake-mist-snow-clouds-plants-reflection.jpg"/>
            <img id="natural" src="https://www.tripsavvy.com/thmb/8L6QGTBt-Y8PpTJzpTbPPqFR1VM=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-200334603-001-5b875e50c9e77c0050cf2162.jpg"/>
            <img id="natural" src="https://a.travel-assets.com/findyours-php/viewfinder/images/res60/47000/47714-Cape-Flattery.jpg"/>
             
             </div>
             <Link to={`/events/create`}><button>Create Event</button></Link>
      <h2>List of Events</h2>

    <article className="events">
        {
            filteredEvents.map(
                (event) => {
                    if (newestEvent) {
                       return (
                            <section className="event" key={`event--${event.id}`}>
                       <header>{event.eventName}</header>
                       <div>{event.date}</div>
                       <div>{event.location}</div>
                       <div><a href={event.url} target="_blank">More Info</a></div>
                       <Link to={`/events/${event.id}`}><div className="btn-edit"><button className="btn btn-primary">Edit</button></div></Link>
                   </section>
                       )
                            }
                            
                         return (
                             <section className="event" key={`event--${event.id}`}>
                        <header>{event.eventName}</header>
                        <div>{event.date}</div>
                        <div>{event.location}</div>
                        <div><a href={event.url} target="_blank">More Info</a></div>
                        <p>{newestEvent}</p>
                    </section>
                         )
                            
                    
                 }
            )
        }
    </article>
    </>
  }
