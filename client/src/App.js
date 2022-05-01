import { BrowserRouter,Routes, Route,useLocation} from "react-router-dom";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./PageNotFound";

import Home from "./Home";
import Loader from "./Components/Loader";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

import Unauthorised from "./Unauthorised";

import LoginUpHandler from "./LoginUpHandler";

import UserHandlerPage from "./Components/User/UserHandlerPage";

const App = () =>
{
    const [loading,setLoading] = useState(false);
    
    
    useEffect(()=>
    {
        setLoading(true);

        setTimeout(()=>
        {
            setLoading(false);
        },2000)
        
       
    },[])

    return(
        loading?<Loader/>:
        <>
            <div class="main">
            
                        <Routes>
                            <Route path="/*" element={<Home/>} />
                            <Route path="/admin/*" element={<ProtectedRoute component={AdminDashboard}/>} />
                            <Route path="/user/*" element={<ProtectedRoute component={UserHandlerPage}/>}/>
                            <Route path="/login" element={<LoginUpHandler fil={"log"}/>}/>
                            <Route path="/register" element={<LoginUpHandler fil={"reg"}/>}/>
                            <Route path="/unauthorised" element={<Unauthorised/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                        <ToastContainer />
            </div>
        </>
    )

}

export default App;