import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const ProtectedRoute =(props)=>
{
    console.log("I am In Admin");
    const Component = props.component;
    const [isUser,setIsUser] = useState(false);
    

    const navigate = useNavigate()

    const getRefresh = async() =>
    {
        console.log("I am in get Refresh");
        if(Cookies.get('user')===undefined)
        {
            console.log("Cannot get the cookie")
            return 'Error';
        }
        let usname = JSON.parse(Cookies.get('user')).data.user;
        let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

        const response = await axios.post("refreshToken",{username:usname},
                                                            {"headers":
                                                                {"content-type":"application/json",
                                                                "ref_token": reffTok
                                                                }
                                                                }).then(resp=>resp).catch(err=>err.response);
         
        if(response['status']===200)
        {
            console.log(response)
            console.log("refresh token is set")
            Cookies.set('user',JSON.stringify(response));
            return "no error"
        }
        else if(response.data.message==='Login Again')
        {
            console.log('Login Again');
            return "error occured";
        }                                                   

                
    }

    const getUser = async() =>
    {
        console.log("I am in get User");
        if(Cookies.get('user')===undefined)
        {
            console.log("Cannot get the cookie")
            return 'Error';
        }

        let usname = JSON.parse(Cookies.get('user')).data.user;
        let acToken = JSON.parse(Cookies.get('user')).data.actoken;
        const response = await axios.post("verify",{username:usname},
                                                        {"headers":
                                                            {"content-type":"application/json",
                                                              "auth_token": acToken
                                                            }
                                                        }).then(resp=>resp).catch(err=>err.response);
        if(response['status'] ===200)
        {
            console.log(response);
            console.log("everything Ok")
            return "verified"
        }

        else if(response.data.message==="JWT Expired")
        {
            console.log("JWT Expired")
            return "jwt expired";
        }

        else
        {
            console.log(JSON.stringify(response));
            return "not verified"
        }                                               

    }
    useEffect(async() =>
    {
        console.log("I am in Protected Route")
        let resp = await getUser();
    
        if(resp ==="verified")
        {
            console.log("User verified")
            setIsUser(true);
        }
        else if(resp ==="jwt expired")
        {
            let response = await getRefresh()

            if(response == 'no error')
            {
                setIsUser(true);
            }
            
            else
            {
                Cookies.remove('user');
                setIsUser(false);
                navigate("/login")  ;
            }
        }
        else
        {
            console.log("Error, no user");
            Cookies.remove('user');
            setIsUser(false);
            navigate("/login")   
        }

    },[])

    function goLogin()
    {
        console.log("navigating");
        navigate("/login");
    }

    return (
        <>
            {<Component/>}
        </>
    )

}

export default ProtectedRoute;