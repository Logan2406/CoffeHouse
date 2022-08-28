import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import{Modal,Button,Card,Col} from 'react-bootstrap';



const AllPaidUsers = () =>
{

    const sep= "\\";
    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
    
    const [allOrder,setAllOrders]=useState([]);
    useEffect(async()=>
    {
        const response = await axios.get("http://localhost:4000/admin/allpaidusers",{headers: 
                                                                    { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);

        if(response.status=200)
        {
            setAllOrders(response.data.data);
        }
    },[])


    return(
        
            <div className="d-flex justify-content-between" style={{columnGap:"20px",marginTop:"30px",marginBottom:"30px",paddingRight:"40px"}}>
                
                <div style={{flex:4}}>
                {
                    allOrder.map((ele,i)=>
                    {
                        return(
                            <div className="paid-user" style={{padding:"40px",width:"100%", rowGap:"30px",marginBottom:"30px"}}>
                                
                                <div className="d-flex justify-content-between">
                                <h1>User: {ele.u_email}</h1>
                                <h1>Date: {ele.his_date?ele.his_date.slice(0,10):""}</h1>
                                </div>
                                <div className="d-flex justify-content-between">
                                    
                                <div className="d-flex flex-column" style={{rowGap:"20px"}}>
                                        {
                                            ele.orders.map((el,i)=>
                                            {
                                                return(
                                                    <div className="d-flex">
                                                       
                                                        <img src={sep+el.image_path} style={{width:"10%"}}/>
                                                            <div className="d-flex align-items-center" style={{width:"100%"}}>
                                                            <table className="table paid-user-table table-borderless" style={{border:"none",width:"90%"}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{textAlign:"center"}}>{el.prod_name}</th>
                                                                        <th style={{textAlign:"left",width:"20%"}}>Quantity : <span className="paid-span">{el.quantity}</span></th>
                                                                        <th style={{textAlign:"left",width:"25%"}}>Price/Item : Rs. <span className="paid-span">{el.price}</span></th>
                                                                        <th style={{textAlign:"right",width:"40px"}}>Amount : Rs. <span className="paid-span">{el.price*el.quantity}</span></th>
                                                                    </tr>
                                                                </thead>
                                                                </table>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div style={{alignSelf:"center",width:"28rem"}}>
                                        <h1>Rs. {ele.total}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                
                </div>
                
    )
}


export default AllPaidUsers;