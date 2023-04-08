import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const handlesubmit=(e)=>{
      e.preventDefault();
    }
    const[email,setemail]=useState("");
    const[pwd,setpwd]=useState("");
    const[pwd1,setpwd1]=useState("");
    const createuser=()=>{
      if(email.length>4 && pwd.length>3){
        if(pwd===pwd1){
        axios.post('http://localhost:7777/createuser',{email:email,pwd:pwd}).then((resultat)=>{if(resultat.data.status==="ok") {console.log(resultat.data.data);alert("user created seccesfuly")} else{alert('ce email exist deja');}}).catch(err=>{console.log(err)})}
        else{ alert("passwords doesn't match")}
      }
      else{alert("make sure your informations are valid")}
  }
  return (
    <div>
       <section class='reg'>
        <div class="form-box">
            <div class="form-value">
                <form action="" onSubmit={handlesubmit}>
                    <h2>create account</h2>
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
                    <button onClick={createuser}>create</button>
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