import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { green, lightGreen, red } from '@mui/material/colors';
import './Login.css';


function Register() {
    const [alert1,setalert1]=useState(false);
    const [alert2,setalert2]=useState(false);
    const [alert3,setalert3]=useState(false);
    const [alert4,setalert4]=useState(false);
    const handlealert=()=>{
        setalert1(false);
        setalert2(false);
        setalert3(false);
        setalert4(false);

    }
    const handlesubmit=(e)=>{
      e.preventDefault();
    }
    const[email,setemail]=useState("");
    const[pwd,setpwd]=useState("");
    const[pwd1,setpwd1]=useState("");
    const createuser=()=>{
      if(email.length>4 && pwd.length>3){
        if(pwd===pwd1){
            axios.post('http://localhost:7777/createuser',{email:email,password:pwd})
                .then((resultat)=>{
                    if(resultat.data.status==="ok") {
                        console.log(resultat.data.data);
                        handlealert();setalert3(true)
                    } else{
                        handlealert();setalert4(true)
                    }})
                .catch(err=>{console.log(err)})}
        else{
            handlealert(); setalert1(true)
        }
      }
      else{
        handlealert(); setalert2(true)
        }
    }
  return (
    <div>
        {alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[50] }}>
                        passwords doesn't match
                    </Alert>
                </Stack> : null}
        {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: lightGreen[500], backgroundColor: lightGreen[50] }}>
                        make sure your informations are valid
                    </Alert>
                </Stack> : null}
        {alert3 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" sx={{ color: green[500], backgroundColor: green[50] }}>
                        user created seccesfuly
                    </Alert>
                </Stack> : null}
        {alert4 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[50] }}>
                        This email has already been used
                    </Alert>
                </Stack> : null}
       <section class='login'>
        <div class="form-box">
            <div class="form-value">
                <form action="" onSubmit={handlesubmit}>
                    <h2 className='txt'>create account</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required onChange={e=>{setemail(e.target.value)}}/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>{setpwd(e.target.value)}}/>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>{setpwd1(e.target.value)}}/>
                        <label for="">repeat Password</label>
                    </div>
                    <div class="forget">
                        
                      
                    </div>
                    <button className='btn' onClick={createuser}>create</button>
                    <div class="register">
                        <p>you have account? <Link to="/login">sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>



    </div>
    
  )
}

export default Register;