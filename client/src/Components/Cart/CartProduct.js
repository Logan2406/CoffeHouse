
import {Card,Button} from "react-bootstrap";
import {useState,useEffect} from 'react';
import { useDispatch } from "react-redux";
import {saveProd,removeFromCart} from "../../Actions/cartAction"; 
import "./cart.css";


const CartProduct = (props) =>
{
    const dispatch = useDispatch();

    const [quant,setQuant] = useState(props.prod.prod_quant);
    
    const decQuant = () =>
    {
            if(!(quant<2))
            {
                setQuant((prev)=>prev-1);
            }

    }

    const incQuant = () =>
    {
        if(!(quant>9))
        {
            setQuant((prev)=>prev+1);
        }

    }

    const saveP = () =>
    {
        let x = props.ind;
        dispatch(saveProd({i:x,quantity:quant}));
        props.calTotal();
    }


    const deletProd = () =>
    {
        dispatch(removeFromCart(props.ind));
        props.calTotal();
    }

    return(
        <>
            <div className="d-flex cart-prod" style={{marginBottom:"20px"}}>
                <div className="d-flex">
                    <Card.Img style={{width:"15rem",padding:"10px"}} src={props.prod.prod_img} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Card.Body>
                        <Card.Title>{props.prod.prod_name}</Card.Title>
                        <Card.Text>
                            Price per Item : {props.prod.prod_price}
                        </Card.Text>
                        <div className="d-flex" style={{paddingBottom:"10px"}}>
                            <Button onClick={()=>{decQuant()}}>-</Button><input value={quant} style={{textAlign:"center",border:"1px solid blue"}}/><Button onClick={()=>{incQuant()}}>+</Button>
                        </div>
                        <Button variant="warning" onClick={saveP}>Save</Button>
                    </Card.Body>
                </div>
                <div className="d-flex align-items-center" style={{marginLeft:"auto",paddingRight:"30px"}}>
                            <h1>Rs {props.prod.prod_price*props.prod.prod_quant}</h1>
                            
                            <Button variant="danger" onClick={()=>deletProd()} style={{marginLeft:"30px"}}>Delete</Button>
                </div>
               
            </div>
        </>
    )
}

export default CartProduct;