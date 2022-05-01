import { useState,useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
const LoginUpHandler =(props) =>
{
    const [login,setLogin] = useState(true);

    //setuseEffect and check and validate the cookie and then render
    useEffect(()=>
    {
        if(props.fil==='reg')
        {
            setLogin(false);
        }
        else
        {
            setLogin(true);
        }

    },[])


    const setLoginHandler = (val)=>
    {
        if(val==="up")
        {
            setLogin(false)
        }

        else
        {
            setLogin(true)
        }
    }
    return(
        <>
            {login?<Login log={login} setSign={setLoginHandler}/>:<Signup log={login} setSign={setLoginHandler}/>}
        </>
    )
}

export default LoginUpHandler;