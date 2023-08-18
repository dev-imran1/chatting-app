import React from 'react';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let handelLogout =(()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/login");
      toast.success("Your Email Successfully Logout")
    })
  })
  return (
    <div>
      <Button className='logoutbtn' onClick={handelLogout} variant="contained">Log Out</Button>
    </div>
  )
}

export default Home