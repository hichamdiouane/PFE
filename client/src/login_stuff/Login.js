import axios from 'axios';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { lightGreen, red } from '@mui/material/colors';

import './Login.css';
function Login(){
   const [email,setemail]=useState("");
   const [alert1,setalert1]=useState(false);
   const [alert2,setalert2]=useState(false);
   const [pwd,setpwd]=useState("");
const log=()=>{
    if(email.length>5 && pwd.length>2){
    axios.post('http://localhost:7777/signin',{email:email,password:pwd}).then(resultat=>{
    if(resultat.data.status==='ok') {console.log(resultat.data.data); window.localStorage.setItem("token",resultat.data.data);window.localStorage.setItem("logged",true);(resultat.data.role==="admin") ? (window.location.href="./dashboard"):(window.location.href="./login")  }
   else {setalert2(false) ; setalert1(true)}}).catch(err=>{console.log(err)})}
   else{ setalert1(false) ; setalert2(true)}
}

return(
    <div>
        {alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[50] }}>
                         mot de passe ou email incorrect
                    </Alert>
                </Stack> : null}
        {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: lightGreen[500], backgroundColor: red[50] }}>
                        make sure your informations are valid
                    </Alert>
                </Stack> : null}
<section className='login'>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class="txt">Login</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required  onChange={e=>setemail(e.target.value)} placeholder=" " />
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>setpwd(e.target.value)} placeholder=" "/>
                        <label for="">Password</label>
                    </div>
                    <div class="forget">
                        <label for=""><input type="checkbox"/>Remember Me  </label>
                        <Link to="/reset"style={{color: "white"}} >Forget Password </Link>
                      
                    </div>
                    <button class="btn" type='button' onClick={log}>Log in</button>
                    <div class="register">
                        <p >Don't have a account <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    
</div>


);
}
export default Login;