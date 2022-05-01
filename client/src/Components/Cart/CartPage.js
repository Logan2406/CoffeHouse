import { Cart } from "react-bootstrap-icons"
import { useState,useEffect } from "react";
import {Row,Col} from "react-bootstrap";
import {Container,Card,Button,Modal} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import CartProduct from "./CartProduct";
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteAll } from "../../Actions/cartAction";


import "./cart.css";


function CheckoutPop(props) {
    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const [tabno,setTabno] = useState("");

    const dispatch = useDispatch();

    const checkout = async () =>
    {
        const response = await axios.post("/admin/checkout",{items:props.cart,tab:tabno},{headers: 
                                                                                        { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);

        //remove all elements from the cart

        


        if(response.status=200)
        {
            props.onHide();
            props.setToltalPrice(0);
            dispatch(deleteAll());
        }

       

    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Items for Checkout</h1>
          <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th style={{textAlign:"left"}}>#</th>
                    <th style={{textAlign:"center"}}>Product Name</th>
                    <th style={{textAlign:"center"}}>Quantity</th>
                    <th style={{textAlign:"center"}}>Price per Item</th>
                    <th style={{textAlign:"right"}}>Total Price</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:"left"}}>
                {props.cart.map((ele,i)=>{return(
                    <tr>
                    <th >{i+1}</th>
                    <td>{ele.prod_name}</td>
                    <td>{ele.prod_quant}</td>
                    <td>{ele.prod_price}</td>
                    <td style={{textAlign:"right"}}>{ele.prod_price*ele.prod_quant}</td>
                    </tr>
                )}
                )
                }
                <tr class="table-warning">
                    <th colspan="3" style={{textAlign:"left"}}>Grand Total</th>
                    <th colspan="2" style={{textAlign:"right"}}>{props.total}</th>
                    </tr>
                </tbody>
           </table>
           <form>
            <div class="form-group">
                <label for="tableno"><h2>Customer Table No. </h2></label>
                <input onChange={(e)=>setTabno(e.target.value)} value={tabno} type="text" class="form-control" id="tabno" placeholder="Enter the Table No"/>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={checkout}>Check Out</Button>
        </Modal.Footer>
      </Modal>
    );
  }















const CartPage = () =>
{
    const cart = useSelector((state)=>state.manageCart);
    const [totalPrice, setToltalPrice] = useState(0)
    const [popShow, setpopShow] = useState(false);
    const [reff,setReff] = useState(false);



    const calculateTotal = () =>
    {
        let total = 0;
        cart.forEach(ele=>
            {
                total= total+(ele.prod_price*ele.prod_quant);
            })

        setToltalPrice(total);
    }


    useEffect(()=>
    {
        calculateTotal();
    },[])



    return (<>        
    <div className="d-flex justify-content-center" style={{paddingTop:"60px",paddingBottom:"100px"}}>
            <Row className="cart-row">
                <Col className="d-flex flex-column cart-product-col">
                    {cart.map((ele,i)=>
                    {
                        console.log(ele.prod_img)
                        return(<CartProduct calTotal ={calculateTotal} ind={i} prod={ele} />)
                    })}

                </Col>
                
                <Col className="cart-summary-col">
                <Card className="cart-sum" style={{ width: '18rem' }}>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title style={{textAlign:"center",fontWeight:"bolder",fontSize:"40px"}}>Summary</Card.Title>
                        <Card.Text style={{fontSize:"20px"}}>
                            No of Items : {cart.length}
                        </Card.Text>
                        <Card.Text>
                            <h1>Rs. {totalPrice} </h1>
                        </Card.Text>
                        <Button variant="primary" style={{marginTop:"10px",marginBottom:"10px"}} onClick={()=>setpopShow(true)}>Check Out</Button>
                        <Button variant="danger" style={{marginTop:"10px",marginBottom:"10px"}} >Clear All Products</Button>
                        
                        
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        <CheckoutPop cart={cart} total={totalPrice} setToltalPrice={setToltalPrice} setReff ={setReff} show={popShow} onHide={()=>setpopShow(false)}/>
        </>
    )
}

export default CartPage;