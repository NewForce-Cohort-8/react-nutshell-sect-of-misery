import { Route, Routes } from 'react-router-dom';
import './Nutshell.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { TaskForm } from './tasks/TaskForm';
import { TaskList } from './tasks/TaskList';
import { TaskEdit } from './tasks/TaskEdit';

export const Nutshell = () => {
  return <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={
    <Authorized>
      <>
        <NavBar />
        <ApplicationViews />
        <TaskList/>
      </>
    </Authorized>
} />
    <Route path="/task/TaskForm" element={<TaskForm />} />

    <Route path="/task/:taskId" element={<TaskEdit />} />
</Routes>
}

export default Nutshell