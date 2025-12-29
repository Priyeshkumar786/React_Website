import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
// import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from "./components/Footer"
import Booking from './pages/Booking'
import BookingConfirm from "./pages/BookingConfirm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";







function App() {
  return (
    
    <>


    <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />

          <Route path="/appointment/:docId/booking" element={<Booking />} />
          <Route path="/BookingConfirm" element={<BookingConfirm />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


        </Routes>
        <Footer />


      </div></>
  )

}

export default App









