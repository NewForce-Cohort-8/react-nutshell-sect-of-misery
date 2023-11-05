import { Route, Routes } from 'react-router-dom';
import './Nutshell.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { ArticleContainer } from './articles/ArticleContainer';
import { ArticleList } from './articles/ArticleList';
import { ArticleForm } from './articles/ArticleForm';
import { ArticleEdit } from './articles/ArticleEdit';

export const Nutshell = () => {
  return <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={
    <Authorized>
      <>
        <NavBar />
        <ArticleContainer />
      </>
    </Authorized>

  } />
  <Route path="/articles" element={<ArticleList />} />
  <Route path="/articles/create" element={<ArticleForm />} />
  <Route path="/articles/:articleId" element={<ArticleEdit />} />
</Routes>
}

export default Nutshell