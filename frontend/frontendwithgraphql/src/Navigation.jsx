import React from 'react'
import {
    Route,
    Routes,
  } from "react-router-dom"
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CourseRegistation from './pages/AddCourse'
import Dashboard from './pages/Dashboard'
import EditCourse from './pages/EditCourse'
export default function Navigation() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={ <Dashboard/> } />
      <Route exact path="/dashboard" element={ <Dashboard/> } />
      <Route exact path="/addcourse" element={ <CourseRegistation/> } />
      <Route exact path="/editcourse/:id?" element={ <EditCourse/> } />
      <Route path="/signup" element={ <SignUp/> } />
      <Route path="/signin" element={ <SignIn/> } />
    </Routes>
  </div>
  )
}
