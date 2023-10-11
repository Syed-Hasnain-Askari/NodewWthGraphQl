import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import CourseRegistation from './AddCourse'
import CourseList from '../component/CourseList'
export default function Dashboard() {
  return (
    <div>
    <Navbar/>
    <CourseList/>
    </div>
  )
}
