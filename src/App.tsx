import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import User from './Components/User';
import UserState from './Contexts/UserState';
import AlertState from './Contexts/AlertState';

function App() {
  return (
    <>
    <AlertState>
      <UserState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="user/:id" element={<User/>} />
          </Routes>
        </BrowserRouter>
      </UserState>
    </AlertState>
    
    </>
  )
}

export default App