import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie";
import axios from "axios";
import {Card,Button,Modal} from 'react-bootstrap';
import "./user.css";

function ReviewModal(props) {

    const [smiley,setSmiley] = useState(0);
    const [reviewObj,setReviewObj] = useState({stars:0}); 

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;


    const handleChange = (e) =>
    {
        if(e.target.name =='stars')
        {
            setSmiley(e.target.value);
            switch(e.target.value)
            {
                case "1 - Very Bad, I won't visit Again" : setReviewObj({...reviewObj,stars:1});break;
                case "2 - Bad, Doesn't Taste Good" : setReviewObj({...reviewObj,stars:2}); break;
                case "3 - Average, Not Special" : setReviewObj({...reviewObj,stars:3}); break;
                case "4 - Very Good, I like It" : setReviewObj({...reviewObj,stars:4}); break;
                case "5 - Excellent" : setReviewObj({...reviewObj,stars:5}); break;
                default: setReviewObj({...reviewObj,stars:0}); break;
            }
        }
        else
        {
            setReviewObj({...reviewObj,review:e.target.value});
        }
    }



    const handleSubmit = async(e) =>
    {
            e.preventDefault();
            const response = await axios.post("http://localhost:4000/user/myprodreview",{stars:reviewObj.stars,prod_id:props.prodId},{headers: 
                                                                        { "Content-Type": "application/json",
                                                                        "ref_token":reffTok,
                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);
            if(response.status==200)
            {
                console.log(response.data.msg);
                props.setReff(prev=>!prev);
                props.onHide();
            }
    }

    return (
      <Modal
        {...props}
        size="lg"
        onExit={()=>setSmiley(0)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Give us your FeedBack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="staticEmail" style={{fontSize:"20px"}} className="col-4">Rate the Food out of 5 :</label>
                
                <div className="col-3">
                    {smiley=="1 - Very Bad, I won't visit Again"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>:<></>}
                    {smiley=="2 - Bad, Doesn't Taste Good"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>:<></>}
                    {smiley=="3 - Average, Not Special"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>:<></>}
                    {smiley=="4 - Very Good, I like It"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>:<></>}
                    {smiley=="5 - Excellent"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>:<></>}
                </div>
                <div className="col-5">
                
                <select class="form-control" id="stars" name='stars' onChange={handleChange}>
                    <option>Select an Option</option>
                    <option>1 - Very Bad, I won't visit Again</option>
                    <option>2 - Bad, Doesn't Taste Good</option>
                    <option>3 - Average, Not Special</option>
                    <option>4 - Very Good, I like It</option>
                    <option>5 - Excellent</option>
                </select>
                </div>
            
            </div>
            <div className="d-flex justify-content-between" style={{columnGap:"20px"}}>
            
                    <span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>
                    <span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>
                    <span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>
                    <span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>
                    <span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>
               
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }





const MyProductReviews =() =>
{   

    const [reviewShow, setReviewShow] = useState(false);
    const [demoProdId,setDemoProdId]  = useState("");
    const [reff,setReff] = useState(false);

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
    
    const sep ="\\";

    const [myProducts,setMyProducts] = useState([]);

        useEffect(async()=>{

            const response = await axios.get("http://localhost:4000/user/myproducts",{headers: 
                                                                        { "Content-Type": "application/json",
                                                                                "ref_token":reffTok,
                                                                                "username":usname }}).then(resp=>resp).catch(err=>err);
            if(response.status=200)
            {
            setMyProducts(response.data.data);
            }


        },[reff])


        return(
            <>
            
            <div className="d-flex flex-row justify-content-between use-page-nav" style={{marginTop:"50px",columnGap:"40px"}}>
                <button className="btn  btn-danger allOrder" style={{height:"70px",flex:1}}><Link to="/user">Home</Link></button>
                <button className="btn btn-warning allReview" style={{height:"70px",flex:1}}><Link to="/user/myallorder">My All Orders</Link></button>
            </div>
                <h1 style={{textAlign:"center",color:"wheat",marginTop:"100px"}}>MY PRODUCT REVIEWS</h1>
                <div className="d-flex flex-wrap" style={{rowGap:"20px",columnGap:"20px",paddingBottom:"50px",paddingTop:"50px"}}>
                {myProducts.map((ele,i)=>{
                    return(
                        <Card className="prod-rev-prod" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={sep+ele.image_path} style={{width:"20rem",height:"18rem"}}/>
                            <Card.Body>
                                <Card.Title>{ele.prod_name}</Card.Title>
                                {
                                    ele.reviews.length>0? 
                                    <div className="d-flex justify-content-between">
                                                {ele.reviews[0].stars==1?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>:<></>}
                                                {ele.reviews[0].stars==2?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>:<></>}
                                                {ele.reviews[0].stars==3?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>:<></>}
                                                {ele.reviews[0].stars==4?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>:<></>}
                                                {ele.reviews[0].stars==5?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>:<></>}
                                                <Button variant="warning">Edit Rating</Button> 
                                   </div>:
                                   <div className="d-flex justify-content-end">
                                    <Button variant="primary" style={{height:"75px"}} onClick={()=>{setDemoProdId(ele.prod_id);setReviewShow(true)}}>Give Rating</Button> 
                                </div>
                                }
                               
                                
                            </Card.Body>
                    </Card>
                    )

                })}
                    
                </div>
                <ReviewModal  setReff={setReff} show={reviewShow} prodId={demoProdId} onHide={()=> setReviewShow(false)}/>
            </>
        )
}

export default MyProductReviews