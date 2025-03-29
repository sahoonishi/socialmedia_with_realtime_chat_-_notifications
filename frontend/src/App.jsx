import React, { useEffect } from 'react';
import Signup from './components/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Post from './components/Post';
import Editprofile from './components/Editprofile';
import Chat from './components/Chat';
import {io} from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';

const App = () => {
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      const socketio = io('http://localhost:8080',{
        query:{
          userId:user._id
        },
        transports:['websocket']
      })
      dispatch(setSocket(socketio));
      // ! Listen all events
      socketio.on('getOnlineUsers',(onlineUsers)=>{
        
      })
    }
  },[]);
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