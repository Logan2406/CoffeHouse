import { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import{Modal,Button,Card} from 'react-bootstrap';
import './queue.css'


function ProductModal(props) {

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
    
    const sep ="\\";
    let id = props.orderid;

    const [userProds,setUserProds]=useState([]);

    useEffect(async()=>
    {
        const response = await axios.get("/admin/chkprods/"+id,{headers: 
                                                            { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);
        

        if(response.status==200)
        {
            console.log('Products are' + response.data.data)
            setUserProds(response.data.data)
        }
    },[id])



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Products</h4>
          {
             userProds.map((ele,i)=>
             {
                 return(
                    <div className="d-flex cart-prod" style={{marginBottom:"20px"}}>
                        <div className="d-flex">
                            <Card.Img style={{width:"15rem",padding:"10px"}} src={sep+ele.image_path} />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <Card.Body>
                                 <Card.Title>{ele.prod_name}</Card.Title>
                                 <Card.Text>
                                    Price per Item : {ele.price}
                                 </Card.Text>
                                 <Card.Text>
                                    Quantity : {ele.quantity}
                                 </Card.Text>
        
                            </Card.Body>
                </div>
                <div className="d-flex align-items-center" style={{marginLeft:"auto",paddingRight:"30px"}}>
                            <h1>Rs {ele.total}</h1>
                </div>
               
            </div>
                 )
             })
          }
        
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  





const UserQueue = () =>
{
    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const [reff,setReff] = useState(false);
    const [prod,setProd] = useState("");

    const [users,setUsers] = useState([])
    const [prodModal, setProdModalShow] = useState(false);

    useEffect(async()=>
    {
        const response = await axios.get("/admin/queuedusers",{headers: 
                                                                    { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);

        if(response.status==200)
        {
            setUsers(response.data.data)
        }
    },[reff])

    const paymentFunc = async(tabno) =>
    {
        const response = await axios.post("/admin/payment",{tab:tabno},{headers: 
                                                                           { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);
        if(response.status==200)
        {
            console.log("Payment Done successfully")
            setReff((prev)=>!prev);
        }

        
    }

    return (
        <>
        <div className="queue-div" style={{padding:"30px",width:"1800px"}}>
            <h1 style={{textAlign:"center",paddingBottom:"40px"}}>This is User in the Queue Page</h1>

            <table class="table table-borderless queue-table" style={{border:"none"}}>
                <thead>
                    <tr>
                        <th >#</th>
                        <th style={{textAlign:"center"}}>User Id</th>
                        <th style={{textAlign:"center"}}>Order Id</th>
                        <th style={{textAlign:"center"}}>Mobile No.</th>
                        <th style={{textAlign:"center"}}>Table no.</th>
                        <th style={{textAlign:"center"}}>Total Price</th>
                        <th colSpan={2} style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((ele,i)=>{return(
                        <tr>
                            <td style={{textAlign:"left"}}>{i+1}</td>
                            <td style={{textAlign:"center"}}>{ele.u_id}</td>
                            <td style={{textAlign:"center"}}>{ele.or_id}</td>
                            <td style={{textAlign:"center"}}>{ele.u_email}</td>
                            <td style={{textAlign:"center"}}>{ele.tab_id}</td>
                            <td style={{textAlign:"center"}}>{ele.total}</td>
                            <td style={{textAlign:"right"}}><button className="btn btn-warning" onClick={()=>{setProdModalShow(true);setProd(ele.or_id)}}>Order Details</button></td>
                            <td style={{textAlign:"center"}}><button className="btn btn-primary" onClick={()=>paymentFunc(ele.tab_id)}>Payment</button></td>
                        </tr>
                    )})
                }
                   
                </tbody>
                </table>
                <ProductModal
                    show={prodModal}
                    orderid={prod}
                    onHide={() => setProdModalShow(false)}/>
        </div>
        </>
    )
}

export default UserQueue;