import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) =>
{
    //const [userPresent,isUserPresent] = useState(false);
    const [formError, setFormError] = useState({username:"",password:""});

    const notify = (val) => toast.error(val,{
        position: toast.POSITION.TOP_CENTER
      });

    const successFul = (val) => toast.success(val,{
        position: toast.POSITION.TOP_CENTER
      })

    let navigate = useNavigate();

    const [user,setUser] = useState({
        username:"",
        password:""
    });

    const [userCookie,setUserCookie] = useState("");


    const handleFormError = (e) =>
    {

        if(user.username=="")
        {
            setFormError({...formError,username:"Please Enter a Valid Input"});
        }
        
        if(user.password=="")
        {
            setFormError({...formError,password:"Please Enter a Valid Input"});
        }
    }

    const handleChange = (e)=>
    {
        console.log("Value Changed")
        let nam=e.target.name;
        if(nam==='username')
        {
            setUser({...user,username:e.target.value});
            if(e.target.value=="")
            {
                setFormError({...formError,username:"Enter a Valid Username"});
            }
            else
            {
                setFormError({...formError,username:""});
            }
        }
        else
        {
            setUser({...user,password:e.target.value});
            if(e.target.value=="")
            {
                setFormError({...formError,password:"Enter a Valid Password"});
            }
            else
            {
                setFormError({...formError,password:""});
            }
        }
       
    }

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        console.log("SUbmitting the form");

        if(formError.username.length>3 || formError.password.length>3 || user.username<1 || user.password<1)
        {
            notify("Check the Errors and Please enter Valid Details");
        }

        else
        {

        
        let response = await axios.post("http://localhost:4000/login",
                                    {
                                    username:user.username,
                                    password:user.password
                                    },
                                    {"headers":{"content-type":"application/json"}}).then(res=>res).catch(err=>err)
    
        console.log("This is user :"+JSON.stringify(response));

        if(response['status']===200)
        {
            console.log("Status is 200");
            Cookies.set('user',JSON.stringify(response));
            navigate('/admin')
            successFul('Successfully Logged In');

        }
        else
        {
            Cookies.remove('user');
        }

        let uString = JSON.parse(Cookies.get("user"));

        setUserCookie(uString.data.user);
        }
    }

    return(
        
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <form className="login-form-container" onSubmit={handleSubmit} style={{width:"500px",padding:"30px"}}>
                    <h1 style={{textAlign:"center",fontSize:"50px"}}>Login Form</h1>
                    <div class="btn-group"  role="group" aria-label="Basic example">
                            <button type="button"   onClick={()=>props.setSign("in")} class={props.log?"btn btn-primary":"btn btn-secondary"}>Admin Login</button>
                            <button type="button"   onClick={()=>props.setSign("up")} class={props.log?"btn btn-secondary":"btn btn-primary"}>User Login</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter Username</label>
                        <input type="text" value= {user.username} onChange={handleChange} onBlur={handleFormError} className="form-control" id="email" name="username" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small style={{color:"red"}}>{formError.username}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value= {user.password} onChange={handleChange} onBlur={handleFormError} className="form-control" id="password" name="password" placeholder="Password"/>
                        <small style={{color:"red"}}>{formError.password}</small>
                    </div>
                
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h1>{userCookie}</h1>
        </div>
    );
}
export default Login;