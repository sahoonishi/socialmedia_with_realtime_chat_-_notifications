import React from 'react';
import Signup from './components/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Post from './components/Post';
import Editprofile from './components/Editprofile';
import Chat from './components/Chat';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile/:name' element={<Profile/>}/>
        <Route path='/editprofile/:name' element={<Editprofile/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App