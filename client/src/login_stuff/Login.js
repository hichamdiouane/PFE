import axios from 'axios';
import {useState} from 'react';
import { Link} from 'react-router-dom';
import './Login.css';
function Login(){
   const [email,setemail]=useState("");
   const [pwd,setpwd]=useState("");
const log=()=>{
    if(email.length>5 && pwd.length>2){
    axios.post('http://localhost:7777/signin',{email:email,pwd:pwd}).then(resultat=>{
    if(resultat.data.status==='ok') {console.log(resultat.data.data); window.localStorage.setItem("token",resultat.data.data);window.localStorage.setItem("logged",true);(resultat.data.role==="admin") ? (window.location.href="./dashboard"):(window.location.href="./user")  }
   else {alert('mot de passe ou email incorrect')}}).catch(err=>{console.log(err)})}
   else{alert("make sure your informations are valid")}
}

return(
    <div>
<section className='login'>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>Login</h2>
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
                        <label for=""><input type="checkbox"/>Remember Me  <Link to="/reset">Forget Password </Link></label>
                      
                    </div>
                    <button type='button' onClick={log}>Log in</button>
                    <div class="register">
                        <p>Don't have a account <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    
</div>


);
}
export default Login;