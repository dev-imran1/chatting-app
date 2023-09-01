import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logedUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch()

  let data = useSelector(state =>(state.logedUser.value));
  
  useEffect(()=>{
        if(!data){
          navigate("/login")
        }
      },[])

  let handelLogout =(()=>{
    signOut(auth).then(() => {
      dispatch(logedUser(null));
      localStorage.removeItem("user")
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