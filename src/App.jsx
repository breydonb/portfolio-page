import React from 'react';
import Footer from './components/Footer';

import { Route, Routes,BrowserRouter as Router, Navigate} from 'react-router-dom';

import LandingPage from "./components/LandingPage";
import About from "./components/About"
import Contact from "./components/Contact"
import ProjectPage from "./components/projects/ProjectPage"
import Blog from './components/blog/Blog';
import SignUp from './components/authentication/SignUp';
import Login from './components/authentication/Login';
import ErrorNotFound from './components/ErrorHandling/ErrorNotFound';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/';
import './App.css';

import NavigationBar from './components/NavigationBar';
import Account from './components/authentication/Account';

import { UserAuth } from './contexts/AuthContext';

function App (){
  const { user } = UserAuth();
  return (
    <Router>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={user ? <Account /> : <Navigate to="/login" />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>

      {/* <Footer /> */}

    </Router>

  )
}

export default App
