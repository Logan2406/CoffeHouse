
import { Routes,Route } from "react-router-dom"
import UserPage from "./UserPage"
import MyAllOrders from "./MyAllOrders";
import MyProductReviews from "./MyProductReviews";
import NavBar from "../Nav/Navbar";
const UserHandlerPage = () =>
{
    return(
    <>
    <NavBar/>
    <div style={{paddingLeft:"100px",paddingRight:"100px"}}>
        <Routes>
            <Route path="/" element={<UserPage/>}/>
            <Route path="/myallorder" element={<MyAllOrders/>}/>
            <Route path="/myprodreview" element={<MyProductReviews/>}/>
        </Routes>
    
    </div>
    </>)
}

export default UserHandlerPage;