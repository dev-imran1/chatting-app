import React, { useState } from 'react'
import bgimg from '../assets/regright.png'
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { toast } from 'react-toastify';


const Login = () => {
    const auth = getAuth();

    let navigate = useNavigate();
    console.log(navigate);
  
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
            let EMAIL_REGEX = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i; 
            let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if(!EMAIL_REGEX.test(fromdata.email)){
                setEmailerror("invalid emai")
            }
            if(!re.test(fromdata.password)){
                setPassworderr("min 8 letter password, with at least a symbol, upper and lower case letters and a number")
            }
      
        signInWithEmailAndPassword(auth, fromdata.email, fromdata.password).then((user)=>{ 

          if(user.user.emailVerified){
            navigate ("/home")
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
    


  return (
    <div className='registration'>
    <div className='reg-left'>
      <div className='text__containt'>
      <h1 className='text__containt--title'>Login to your account!</h1>
      <div className='google'>
        <Link ><FcGoogle /> </Link>
        <p>Login with Google</p>
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
      </div>
    </div>
    <div className='reg-right'>
      <Image className="reg__img" src={bgimg} alt="registraion image" />
    </div>
  </div>
  )
}

export default Login