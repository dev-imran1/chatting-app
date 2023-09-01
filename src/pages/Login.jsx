import React, { useState } from 'react'
import bgimg from '../assets/regright.png'
import Image from '../components/Image'
import Google from '../assets/Google.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider , signInWithPopup } from "firebase/auth"; 
import { toast } from 'react-toastify';
import { logedUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let navigate = useNavigate();

    let dispatch = useDispatch();
    let [fromdata, setfromdata] =useState ({
        email:"",
        password:""
    });
    
    

    let [emailError, setEmailerror] = useState ("");
    let [passwordError, setPassworderr] = useState ("");
    let [start, setStart] = useState(false)

    let handelLogin =()=>{
        if(!fromdata.email ){
            setEmailerror("place enter your email")
        }
        if(!fromdata.password){
            setPassworderr("place enter your password")
        }
        if(fromdata.email && fromdata.password){
        signInWithEmailAndPassword(auth, fromdata.email, fromdata.password).then((user)=>{ 
          console.log(user.user.emailVerified);
          if(user.user.emailVerified){
            navigate ("/home")
            dispatch(logedUser(user.user))
            toast.success("Thank You Email & Password Succesfully Login")
          }else{
            toast.error("plase verify your email for login")
          }
    }) 
    }
    }

    let handelChange= (e)=>{
        setfromdata({
            ...fromdata,
            [e.target.name] : e.target.value,   
        })
        if(e.target.name == "email"){
            setEmailerror("")
        }
        if(e.target.name == "password"){
            setPassworderr("")
        }
        
    }

    let handelgoogle =()=>{
      signInWithPopup(auth, provider)
  .then((result) => {
    navigate("/home")
    
    toast('Your account Log in')
  })
    }

  return (
    <div className='registration'>
    <div className='reg-left'>
      <div className='text__containt'>
      <h1 className='text__containt--title'>Login to your account!</h1>
      <div className='google'>
        <Button className='googleBtn' onClick={handelgoogle}><Link to={"/home"}><Image src={Google}/></Link></Button>
      </div>
      <TextField onChange={handelChange} name='email' type='text' className='inputcss inputcssNext' id="standard-basic" label="Email Address" variant="standard" />
      {emailError &&
      <Alert severity="warning">{emailError}</Alert>
      }
      <TextField onChange={handelChange} name='password' type={start ?"text":"password"} className='inputcss' id="standard-basic" label="Password" variant="standard" />
      {start 
      ?
      <AiFillEye className='eye' onClick={()=>setStart(false)}/>
      :
      <AiFillEyeInvisible className='eye' onClick={()=>setStart(true)}/>
    }
      {passwordError &&
      <Alert severity="warning">{passwordError}</Alert>
      }
      
      <Button onClick={handelLogin} className='regbtnnext' variant="contained">Login to Continue</Button>
      <p >Don’t have an account ?  <Link className='focus' to="/"> Sign Up</Link></p>
      <p>Forgot Password <Link to="/forgotpassword" className='focus forgotfocus'>Click Here</Link></p>
      </div>
    </div>
    <div className='reg-right'>
      <Image className="reg__img" src={bgimg} alt="registraion image" />
    </div>
  </div>
  )
}

export default Login