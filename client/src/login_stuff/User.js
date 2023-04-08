import React,{Component} from "react";
import axios from "axios";
export default class User extends Component{
    constructor(props){
        super(props)
        this.state={
            nom:"",
            email:"hamham",
            password:"123"
    }
    }
    

    
    componentDidMount(){
        axios.post("http://localhost:7777/getuser",{token:window.localStorage.getItem("token")}).then(result=>{this.setState({email:result.data.email})
    console.log(result.data);this.setState({nom:result.data.name}); this.setState({password:result.data.pwd})
    })
    }

render(){
    const logout=()=>{
        window.localStorage.clear();
        window.location.href="./login"
    }
    return(
        <div>
            name:<h1>{this.state.nom}</h1>
            email:<h1>{this.state.email}</h1>
            pwd:<h1>{this.state.password}</h1>
            <button onClick={logout}>log out</button>
        </div>
    );
}
}