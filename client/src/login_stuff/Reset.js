import axios from 'axios';
import {useState} from 'react';
export default function Reset(){
const [email,setemail]=useState("");
const validate=()=>{
        axios.post('http://localhost:7777/reset',{email:email}).then(result=>{if(result.data.status==="ok"){alert("check ur email");  window.location.href="./login"}else{alert('user not found');}}).catch(err=>{console.log(err)});
}
return(
<div>
<section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>your account's email</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required placeholder=" " onChange={e=>{setemail(e.target.value)}} />
                        <label for="">Email</label>
                    </div>
                    <button type='button' onClick={validate}>validate</button>
                </form>
            </div>
        </div>
    </section>  
</div>
);
}