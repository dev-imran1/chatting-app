import React, { useState } from 'react'
import bgimg from '../assets/regimg.png'
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import Alert from '@mui/material/Alert';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Registration = () => {
  const auth = getAuth();

  let navigate = useNavigate();
  let [fromdata, setfromdata]=useState({
    email:"",
    fullname:"",
    password:""
  })

  let [emailError , setEmailerror] = useState("")
  let [fullnameError , setFullnameerror] = useState("")
  let [passwordlError , setPassworderror] = useState("")
  let [open , setOpen] =useState(false)
  let [load, setLoad] = useState(false)

  let handelChange =(e)=>{
    setfromdata({
      ...fromdata,
      [e.target.name]: e.target.value
    })
  

    if(e.target.name == "email"){
      setEmailerror("");
    }

    if(e.target.name == "fullname"){
      setFullnameerror("");
    }

    if(e.target.name == "password"){
      setPassworderror("");
    }
  }



  
  let handelRegistration=()=>{

    if(!fromdata.email){
      setEmailerror("plase Input your Email")
    }
    if(!fromdata.fullname){
      setFullnameerror("plase Input your full name")
    }
    if(!fromdata.password){
      setPassworderror("plase Input your Password")
    }

    if(fromdata.email && fromdata.fullname && fromdata.password){

      let pattern = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i;  
      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if(!pattern.test(fromdata.email)){
           setEmailerror("Invalid Email")
          }
        
        if(!fromdata.fullname.length > 3){
          setFullnameerror("plase up to 3 words")
        }
        if(!re.test(fromdata.password)){
           setPassworderror(" min 8 letter password, with at least a symbol, upper and lower case letters and a number")
          }

          setLoad(true);
      createUserWithEmailAndPassword(auth, fromdata.email, fromdata.password)
                  .then(() => {


            sendEmailVerification(auth.currentUser).then(() => {
                  setfromdata({
                  email:"",
                  fullname:"",
                  password:""
                            }) 
    setLoad(false)
    toast.success("Registration successfully! Please Verfiy Your Email");

                setTimeout(()=>{
                  navigate("/login ")
                },1000)
       });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode.includes("email")){
      toast.error("Email alrady exists");
    }
    setLoad(false)

  });

    }

  };

  return (
    <div className='registration'>
      <div className='reg-left'>
        <div className='text__containt'>
        <h1 className='text__containt--title'>Get started with easily register</h1>
        <p className='text__containt--paragraph'>Free register and you can enjoy it</p>
        <TextField onChange={handelChange}  type='text' className='inputcss' name='email' id="outlined-basic" label="Email Address" variant="outlined" value={fromdata.email}/>
        {emailError && 
        <Alert className='alertinput' severity="warning">{emailError}</Alert>
        }
        <TextField onChange={handelChange}  type='email' className='inputcss' name='fullname' id="outlined-basic" label="Full name" variant="outlined" value={fromdata.fullname}/>
        {fullnameError && 
        <Alert className='alertinput' severity="warning">{fullnameError}</Alert>
        }
        <TextField onChange={handelChange} type={open ? "text" : "password"} className='inputcss'name='password' id="outlined-basic" label="Password" variant="outlined" value={fromdata.password}/>

        {open 
        ?
        <AiFillEye onClick={()=>setOpen(false)} className='eye'/>
        :
        <AiFillEyeInvisible  onClick={()=>setOpen(true)} className='eye'/>
        }

        {passwordlError && 
        <Alert className='alertinput' severity="warning">{passwordlError}</Alert>}

        {load 
        ?
        <Button  className='regbtn' variant="contained" disabled>
          <RotatingLines
          strokeColor="black"
          strokeWidth="2"
          animationDuration="0.75"
          width="20"
          visible={true}/>
        </Button>
        :
        <Button onClick={handelRegistration} className='regbtn' variant="contained" >
          Sign Up
          </Button>
        }

        <p>Already  have an account ? <Link className='focus' to="/login"> Sign In</Link></p>
        </div>
      </div> 
      <div className='reg-right'>
        <Image className="reg__img" src={bgimg} alt="registraion image" />
      </div>
    </div>

  )
}

export default Registration


