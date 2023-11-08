import { Route, Routes } from "react-router-dom"
import { EventsForm } from "../events/EventsForm"
import { EventsList } from "../events/EventsList"
import { EventsContainer } from "../events/EventsContainer"

export const EventsViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>React Nutshell Sect of Misery</h1>
                    <div>Testing</div>

                    <Outlet />
                </>
            }>

                <Route path="events" element={ <EventsContainer/>
                 } />
              <Route path="events/create" element={ <EventsForm /> } />
              <Route path="events" element={ <EventsList/>
                 } />
                 </Route>
                 </Routes>
    )
}