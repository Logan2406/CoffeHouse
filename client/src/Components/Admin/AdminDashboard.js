import {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiTableFill} from 'react-icons/ri'
import {MdDashboardCustomize} from 'react-icons/md';
import {HiUserGroup} from 'react-icons/hi';
import {MdFastfood} from 'react-icons/md';
import {BiAddToQueue} from 'react-icons/bi';
import {MdPayment} from 'react-icons/md';
import Cookies from "js-cookie";
import { Routes,Route,Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllUsers from "./AdminUser/AllUsers";
import AllProducts from "./AdminProduct/AllProducts";
import BookTable from "./AdminBooking/BookTable";
import UserQueue from "./AdminQueue/UserQueue";
import PaidUsers from "./AdminUser/PaidUsers";
import ReviewHandler from './AdminReviews/ReviewHandler';
import AllPaidUsers from './AdminUser/AllPaidUsers';

const AdminDashboard =() =>
{

    
    const navigate  = useNavigate();
    const [active,setActive] = useState("Book a Table");
    useEffect(async ()=>
    {
        console.log(" I am form Dashboard");
        
    },[]);

    const setNav =(val)=>
    {
        setActive(val);
    }


    const logOut  =  async() =>
    {
        let usname = await JSON.parse(Cookies.get('user')).data.user;
        console.log("username ="+usname);
        let response = await axios.get("/logout",{headers:{"Content-Type":"application/json","username":usname}}).then(res=>res).catch(err=>err)
        if(response['status']===200)
        {
            Cookies.remove('user');
            navigate('/login');
        }

    }

    return (
        <div className="d-flex" style={{minHeight:"100vh"}}>
                <div className="sidebar d-flex" style={{paddingLeft:"20px",paddingRight:"20px"}}>
                        <div className="myrow d-flex side-header">
                            <h1>Admin Pannel</h1>
                             <GiHamburgerMenu style={{fontSize:"50px"}}/>
                        </div>

                        <div className="row" style={{width:"100%"}}>
                            <div className="col">
                            <div className={`d-flex side-nav-links ${active=="Manage Users" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <HiUserGroup style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Manage Users")} to="/admin/users">Manage Users</Link>
                            </div>
                            <div  className={`d-flex side-nav-links ${active=="Manage Products" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <MdFastfood style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Manage Products")} to="/admin/products">Manage Products</Link>
                            </div>
                            <div  className={`d-flex side-nav-links ${active=="Book a Table" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <RiTableFill style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Book a Table")} to="/admin/">Book a Table</Link>
                            </div>
                            <div  className={`d-flex side-nav-links ${active=="Queue" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <BiAddToQueue style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Queue")} to="/admin/queue">Queue</Link>
                            </div>
                            <div  className={`d-flex side-nav-links ${active=="Payment Done" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <MdPayment style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Payment Done")} to="/admin/paidusers">Payment Done</Link>
                            </div>
                            
                            <div  className={`d-flex side-nav-links ${active=="Past Orders" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <MdPayment style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Past Orders")} to="/admin/allorders">Past Orders</Link>
                            </div>

                            <div  className={`d-flex side-nav-links ${active=="Reviews" ? "nav-active-but":""}`} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <MdPayment style={{fontSize:"40px",marginRight:"10px",color:"wheat"}}/>
                                <Link onClick={()=>setNav("Reviews")} to="/admin/reviews">Reviews</Link>
                            </div>
                            
                            </div>
                            
                        </div>

                        <div className="myrow d-flex side-footer justify-content-between">
                                <button className="align-self-center" onClick={logOut} class="btn btn-danger">Log Out</button>
                                <img style={{height:"80px",width:"80px",border:"4px solid black",borderRadius:"50%"}} src ="\img_avatar.png"/>
                        </div>

                </div>

                <div className="admin-content" style={{padding:"30px"}}>
                        <Routes>
                            <Route path="" element={<BookTable/>}/>
                            <Route path="/users" element={<AllUsers/>}/>
                            <Route path="/products/*" element={<AllProducts/>}/>
                            <Route path="/queue/*" element={<UserQueue/>}/>
                            <Route path="/paidusers/*" element={<PaidUsers/>}/>
                            <Route path="allorders/*" element={<AllPaidUsers/>}/>
                            <Route path="/reviews/*" element={<ReviewHandler/>}/>
                        </Routes>
                </div>
        </div>
    )
}

export default AdminDashboard;