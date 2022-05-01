import {Card,Button,Modal,Row,Col} from "react-bootstrap"
import {useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import { AiOutlineStar} from "react-icons/ai";
import {useSelector,useDispatch} from "react-redux";
import {addToCart} from "../../Actions/cartAction"; 
import './product.css'
const ProdViewModal = (props) =>
{

  const sep="\\";
  const price = props.prod_price;
  const [quant,setQuant] = useState(1);
  const [prodprice,setProdprice]=useState(props.prod_price);

    return(
        <Modal
        {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={()=>{setQuant(1);setProdprice(props.prod_price)}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.prod_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-around align-items=center">
          <Col>
              <img src={sep+props.prod_img} style={{height:"350px",width:"100%"}}/>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
              <p>Description : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt malesuada maximus. Morbi id hendrerit tortor. Ut viverra interdum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sem porta lorem fringilla egestas. Proin sed rutrum leo. Sed.</p>
              <p>Category : {props.cat}</p>
              <p>Price :{prodprice}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



const ProdModal = (props) =>
{

  const dispatch = useDispatch();

  const sep="\\";
  const price = props.prod_price;
  const [quant,setQuant] = useState(1);
  const [prodprice,setProdprice]=useState(props.prod_price);

  const incQuant = () =>
  {
      if(quant<10)
      {
        let vari = quant+1;
        setQuant(vari);
        setProdprice(vari*price);

      }

  }

  const decQuant = () =>
  {
      if(quant>=2)
      {
        let vari = quant-1;
        setQuant(vari);
        setProdprice(vari*price);
      }
  }

  const addCart=()=>
  {
    dispatch(addToCart({name:props.prod_name,img:props.prod_img,quantity:quant,prodId:props.id,price:props.prod_price}));
    props.onHide();
  }


    return(
        <Modal
        {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={()=>{setQuant(1);setProdprice(props.prod_price)}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.prod_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-around align-items=center">
          <Col>
              <img src={sep+props.prod_img} style={{height:"350px",width:"100%"}}/>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
              <p>Description : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt malesuada maximus. Morbi id hendrerit tortor. Ut viverra interdum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sem porta lorem fringilla egestas. Proin sed rutrum leo. Sed.</p>
              <p>Category : {props.cat}</p>
              <p>Price :{prodprice}</p>
              <div className="d-inline-flex flex-row justify-content-between" style={{marginBottom:"5px"}}>
              <Button onClick={()=>{decQuant()}}>-</Button><input value={quant} style={{textAlign:"center",border:"1px solid blue"}}/><Button onClick={()=>{incQuant()}}>+</Button>
              </div>
              <Button onClick={()=>addCart()} >Add to cart</Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



const Product =(props) =>
{
    const [modalShow,setModalShow] = useState(false);
    const [modalViewShow,setViewModalShow] = useState(false);
    const sep="\\";
    const [showOrder,setShowOrder] = useState(false);


    useEffect(()=>
    {
      if(Cookies.get('user')!==undefined)
      {
        let user = JSON.parse(Cookies.get('user'));
  
        console.log(user);
    
        if(user!==undefined)
        {
            if(user.data.role=='Admin')
            {
                setShowOrder(true);
            }

        }
      }
     
    },[]);
  

    return(
        <>
            <Card className="prod-card" style={{ width: '25rem' ,padding:"5px"}}>
                <Card.Img className="prod-image" variant="top" src={sep+props.img}/>
                <Card.Body>
                    <Card.Title>{props.val}</Card.Title>
                    <div className="d-flex flex-row justify-content-between mb-2">
                    <Card.Text>
                        <Button className="d-flex justify-content-around"><p>4.6</p><AiOutlineStar style={{height:"25px",width:"30px"}}/></Button>
                    </Card.Text>

                    <Card.Text style={{fontWeight:"700",fontSize:"25px"}}>
                        Rs.{props.price} {props.type}
                    </Card.Text>
                    </div>

                    {showOrder?<Button className="d-flex orderButton justify-content-center" style={{width:"100%",height:"40px"}} onClick={()=>setModalShow(true)} variant="primary">Order It</Button>
                    :<Button className="d-flex orderButton justify-content-center" style={{width:"100%",height:"40px"}} onClick={()=>setViewModalShow(true)} variant="warning">View Product</Button>}
                </Card.Body>
            </Card>
            <ProdModal id={props.id} cat={props.cat} descr={props.des} prod_img={props.img} prod_price ={props.price} prod_name={props.val} show={modalShow} onHide={()=>setModalShow(false)}/>
            <ProdViewModal id={props.id} cat={props.cat} descr={props.des} prod_img={props.img} prod_price ={props.price} prod_name={props.val} show={modalViewShow} onHide={()=>setViewModalShow(false)}/>
                 
        </>
    )
}




export default Product;