import { Route, Routes } from 'react-router-dom';
import './Nutshell.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { EventsForm } from './events/EventsForm';
import { EventsList } from './events/EventsList';
import { EventsEdit } from './events/EventsEdit';

export const Nutshell = () => {
  return <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={
    <Authorized>
      <>
        <NavBar />
        <ApplicationViews />
        <EventsList />
      </>
    </Authorized>

  } />
<Route path="/events/create" element={<EventsForm />} />
<Route path="/events/:eventId" element={<EventsEdit />} />
</Routes>
}

export default Nutshell