import { Route, Routes } from 'react-router-dom';
import './Nutshell.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';

export const Nutshell = () => {
  return <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={
    <Authorized>
      <>
        <NavBar />
        <ApplicationViews />
      </>
    </Authorized>

  } />
</Routes>
}

export default Nutshell