import React, { useState } from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

const router = createBrowserRouter(
 
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
      </Route>
    )
  );
      

function App() {

  return (
    <>
    <RouterProvider router={router} /> 
      <ToastContainer
      position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>

    </>
  )
}

export default App
