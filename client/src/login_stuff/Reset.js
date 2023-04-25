import axios from 'axios';
import {useState} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { lightBlue,red } from '@mui/material/colors';
import './Login.css';

export default function Reset(){
    const [alert1,setalert1]=useState(false);
    const [alert2,setalert2]=useState(false);
    const [email,setemail]=useState("");
    const validate=()=>{
        axios.post('http://localhost:7777/reset',{email:email}).then(result=>{
            if(result.data.status==="ok"){
                setalert1(true);  
                setTimeout(() => {
                    window.location.href="./login";
                }, 3000);
                
            }else{
            setalert2(true)
        }}).catch(err=>{console.log(err)});
}
return(
<div>
    {alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="info"variant="filled" sx={{ color: lightBlue[500], backgroundColor: lightBlue[50] }}>
                        check ur email
                    </Alert>
                </Stack> : null}
    {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[50] }}>
                    user not found
                    </Alert>
                </Stack> : null}
<section className='login'>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 className='txt'>your account's email</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required placeholder=" " onChange={e=>{setemail(e.target.value)}} />
                        <label for="">Email</label>
                    </div>
                    <button className='btn' type='button' onClick={validate}>validate</button>
                </form>
            </div>
        </div>
    </section>  
</div>
);
}