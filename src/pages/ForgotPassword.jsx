import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import { Link , useNavigate} from 'react-router-dom';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";


const ForgotPassword = () => {

    const auth = getAuth();
    let navigate = useNavigate();
    let [email, setEmail]= useState("");

    let handelForgot =()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
           toast('Plase check your email & change your password')

           setTimeout(()=>{ 
            navigate("/login")
           }, 1000)
      

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorMessage.includes("email")){
                toast('Your email not matching')
            } 
          });
    }

    // let handelForgotChange =(e)=>{
    //     setEmail(e.target.value)
    // }


  return (
    <div className='forgotpage'>
        <div className="forgotbox">
            <h3>Forgot Password</h3>
        <TextField onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="email" variant="outlined" />
        <br/>
        <Button onClick={handelForgot} variant="contained" className='forgotbtn'>Contained</Button>
        </div>
    </div>
  )
}

export default ForgotPassword