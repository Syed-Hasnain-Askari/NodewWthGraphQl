import React from 'react'
import {
    Route,
    Routes,
  } from "react-router-dom"
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
export default function Navigation() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={ <SignIn/> } />
      <Route path="/signup" element={ <SignUp/> } />
      <Route path="/signin" element={ <SignIn/> } />
    </Routes>
  </div>
  )
}
