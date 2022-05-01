import { Offcanvas,Card,Button } from "react-bootstrap";

import {useSelector,useDispatch} from "react-redux";
import {removeFromCart} from "../../Actions/cartAction"; 
import { useNavigate } from "react-router-dom";
import "./cart.css"

const CartOverlay = (props) =>
{
    const cart = useSelector((state)=>state.manageCart);
    const dispatch = useDispatch(); 
    const sep="\\";
    const navigate = useNavigate();
    return (
        <>
            <Offcanvas className="cartOverlay" show={props.show} onHide={props.handleClose} placement={"end"}{...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> <Button variant="warning" onClick={()=>navigate("/mycart")}>Visit My Cart</Button></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   {cart.map((ele,i)=>
                   {
                       return(
                        <Card className="overlayCard" style={{ width: '18rem', marginBottom:"10px",marginTop:"10px"}}>
                            <Card.Img variant="top" src={sep+ele.prod_img} />
                            <Card.Body>
                                <Card.Title>{ele.prod_name}</Card.Title>
                                <Card.Text>
                                        Quantity : {ele.prod_quant}
                                </Card.Text>
                                <Card.Text>
                                        Price : {ele.prod_quant * ele.prod_price}
                                </Card.Text>
                                <Button onClick={()=>{dispatch(removeFromCart(i))}} variant="primary">Remove Item</Button>
                            </Card.Body>
                            </Card>
                       )
                   })}
                </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default CartOverlay;