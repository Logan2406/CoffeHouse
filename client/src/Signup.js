import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const SignUp = (props) =>
{
    const navigate = useNavigate()

    const [details,setDetails] = useState({
            phone:"",
            password:"",
    });

    const [errDet,setErrDet] = useState({
        phone:"",
        password:"",
});


const handleChange = (e) =>
{
    if(e.target.name=='phone')
    {
        setDetails({...details,phone:e.target.value});
    }
    else
    {
        setDetails({...details,password:e.target.value});
    }
}



const handleSubmit = async(e) =>
{
    e.preventDefault();
        console.log("Submitting the user form");

        let response = await axios.post("/login",
                                    {
                                    username:details.phone,
                                    password:details.password
                                    },
                                    {"headers":{"content-type":"application/json"}}).then(res=>res).catch(err=>err)
    
        console.log("This is user :"+JSON.stringify(response));

        if(response['status']===200)
        {
            console.log("Status is 200");
            Cookies.set('user',JSON.stringify(response));
            navigate('/user')

        }
        else
        {
            Cookies.remove('user');
        }

        let uString = JSON.parse(Cookies.get("user"));

}

    return(
             <div className="container d-flex justify-content-center align-items-center" style={{paddingTop:"30px",paddingBottom:"30px",minHeight:"100vh",overflowY:"auto"}}>
                <form className="login-form-container" onSubmit={handleSubmit} style={{width:"700px",padding:"30px"}}>
                    <h1 style={{textAlign:"center",fontSize:"50px"}}>Sign Up Form</h1>
                    <div class="btn-group"  role="group" aria-label="Basic example">
                            <button type="button" onClick={()=>props.setSign("in")} class={props.log?"btn btn-primary":"btn btn-secondary"}>Admin Login</button>
                            <button type="button" onClick={()=>props.setSign("up")} class={props.log?"btn btn-secondary":"btn btn-primary"}>User Login</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter Mobile Number</label>
                        <input type="text" className="form-control" value ={details.phone} onChange={handleChange} id="phone" name="phone" aria-describedby="emailHelp" placeholder="Enter email"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  className="form-control" value={details.password} onChange={handleChange} id="password" name="password" placeholder="Password"/>
                    </div>


                    <h3>Forget Password ?</h3>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
    )
}

export default SignUp;