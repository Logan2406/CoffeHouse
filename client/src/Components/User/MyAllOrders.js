import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';
import {Modal,Button} from 'react-bootstrap';
import "./user.css";


function ReviewModal(props) {

    const [smiley,setSmiley] = useState(0);
    const [reviewObj,setReviewObj] = useState({stars:0,review:""}); 

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
            const response = await axios.post("/user/addreview",{stars:reviewObj.stars,review:reviewObj.review,his_id:props.his_id},{headers: 
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
                <label htmlFor="staticEmail" style={{fontSize:"20px"}}className="col-4">Rate the Food out of 5 :</label>
                
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
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Write you genuine FeedBack :</label>
                <textarea onChange={handleChange} class="form-control" id="review" name="review" rows="3"></textarea>
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


  const EditModal = (props) => {

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const [editRev,setEditRev] = useState({stars:0,review:""});
    const [smiley,setSmiley] = useState("");
    useEffect(()=>
    {
        setEditRev({...editRev,stars:props.ed.stars,review:props.ed.review});
        console.log(editRev);
        switch(props.ed.stars)
        {
            case 1: setSmiley("1 - Very Bad, I won't visit Again");break;
            case 2: setSmiley("2 - Bad, Doesn't Taste Good");;break;
            case 3: setSmiley("3 - Average, Not Special");break;
            case 4: setSmiley("4 - Very Good, I like It");break;
            case 5: setSmiley("5 - Excellent");break;
            default : setSmiley("0");break;

        }



    },[props.ed])
   

    const handleChange = (e) =>
    {
        if(e.target.name =='stars')
        {
            setSmiley(e.target.value);
            switch(e.target.value)
            {
                case "1 - Very Bad, I won't visit Again" : setEditRev({...editRev,stars:1});break;
                case "2 - Bad, Doesn't Taste Good" : setEditRev({...editRev,stars:2}); break;
                case "3 - Average, Not Special" : setEditRev({...editRev,stars:3}); break;
                case "4 - Very Good, I like It" : setEditRev({...editRev,stars:4}); break;
                case "5 - Excellent" : setEditRev({...editRev,stars:5}); break;
                default: setEditRev({...editRev,stars:0}); break;
            }
        }
        else
        {
            setEditRev({...editRev,review:e.target.value});
        }
    }

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const response = await axios.put("/user/updatereview",{stars:editRev.stars,review:editRev.review,re_id:props.ed.reId},{headers: 
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="stars" style={{fontSize:"20px"}}className="col-4">Rate the Food out of 5 :</label>
                
                <div className="col-3">
                    {smiley=="1 - Very Bad, I won't visit Again"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>:<></>}
                    {smiley=="2 - Bad, Doesn't Taste Good"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>:<></>}
                    {smiley=="3 - Average, Not Special"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>:<></>}
                    {smiley=="4 - Very Good, I like It"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>:<></>}
                    {smiley=="5 - Excellent"?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>:<></>}
                </div>
                <div className="col-5">
                
                <select value={smiley} class="form-control" id="stars" name='stars' onChange={handleChange}>
                    <option>Select an Option</option>
                    <option>1 - Very Bad, I won't visit Again</option>
                    <option>2 - Bad, Doesn't Taste Good</option>
                    <option>3 - Average, Not Special</option>
                    <option>4 - Very Good, I like It</option>
                    <option>5 - Excellent</option>
                </select>
                </div>
                <div class="form-group">
                <label for="exampleFormControlTextarea1">Write you genuine FeedBack :</label>
                <textarea value={editRev.review} onChange={handleChange} class="form-control" id="review" name="review" rows="3"></textarea>
            </div>
            
                <button style={{marginTop:"20px",width:"20%"}} type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>

        </Modal.Footer>
      </Modal>
    );
  }
  








const MyAllOrders = () =>
{

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
    
    const sep ="\\";
    const[orders,setOrders] = useState([]); 

    const [reff,setReff] = useState(false);


    const [reviewShow, setReviewShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const [hisId, setHisId] = useState("");
    const [editObj,setEditObj] = useState({reId:"",review:"",stars:""});

    const handleEdit =(id,st,rev) =>
    {
        console.log("Stars :"+st);
        setEditObj({reId:id,review:rev,stars:st});
        console.log(editObj);
        setEditShow(true);
    }

    useEffect(async()=>{
        const response = await axios.get("/user/myorders",{headers: 
                                                                    { "Content-Type": "application/json",
                                                                    "ref_token":reffTok,
                                                                    "username":usname }}).then(resp=>resp).catch(err=>err);
        if(response.status=200)
        {
            setOrders(response.data.data);
        }

    },[reff])

        return(
            <>
            <div className="d-flex flex-row justify-content-between use-page-nav" style={{marginTop:"50px",columnGap:"40px"}}>
                    <button className="btn btn-danger allOrder" style={{height:"70px",flex:1}}><Link to="/user">Home</Link></button>
                    <button className="btn btn-warning allReview" style={{height:"70px",flex:1}}><Link to="/user/myprodreview">My All Reviews</Link></button>
            </div>
                <div class="container" style={{padding:"50px"}}>
                {orders.map((ele,i)=>
                {
                    return(<div className="d-flex flex-column user-prod-div">
                        <div className="userProd" style={{padding:"30px"}}>
                            <h1>Date : {ele.his_date.slice(0,10)}</h1>
                            <hr/>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column" style={{rowGap:"20px",flex:6}}>
                                    {ele.orders.map((el,i)=>
                                        {
                                            return(
                                                <div className="d-flex prod-table-inside">
                                                    <img className="prod-img" src={sep+el.image_path} style={{width:"10%"}}/>
                                                    <table className="table table-borderless" style={{border:"none"}}>
                                                        <thead>
                                                            <tr>
                                                                <th style={{verticalAlign:"middle",textAlign:"center"}} >{el.prod_name}</th>
                                                                <th style={{verticalAlign:"middle"}} ># Items : {el.quantity}</th>
                                                                <th style={{verticalAlign:"middle"}} >Price/Item : {el.price}</th>
                                                                <th style={{verticalAlign:"middle"}} >Total : {el.price*el.quantity}</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                                <div style={{alignSelf:"center",flex:1}}>
                                    <h1>Rs. {ele.total}</h1>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                                {
                                    ele.reviews.map((el,i)=>
                                    {
                                        return(
                                            <div  className="d-flex review-div" style={{fontWeight:"bolder",paddingLeft:"50px",paddingRight:"60px"}}>
                                                <div >
                                                {el.stars==1?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>:<></>}
                                                {el.stars==2?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>:<></>}
                                                {el.stars==3?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>:<></>}
                                                {el.stars==4?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>:<></>}
                                                {el.stars==5?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>:<></>}
                                                </div>
                                                <div className="align-self-center" style={{paddingTop:"10px",paddingLeft:"60px"}}>
                                                    <p>{el.review}</p>
                                                </div>
                                                <div className="d-flex align-self-center review-handle" style={{marginLeft:"auto",columnGap:"40px"}}>
                                                    <button className="btn btn-primary" onClick={()=>handleEdit(el.re_id,el.stars,el.review)}>Edit </button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        <button className="btn btn-warning" onClick={()=>{setReviewShow(true) ;setHisId(ele.his_id)}} style={{width:"40%",marginLeft:"auto",marginRight:"auto",marginTop:"40px",marginBottom:"40px"}}>Add Review</button>
                        </div>

                    )
                })}
                </div>
                <ReviewModal setReff={setReff} show={reviewShow} his_id={hisId} onHide={()=> setReviewShow(false)}/>
                <EditModal  setReff={setReff} ed={editObj} show={editShow} onHide={()=> setEditShow(false)}/>
            </>
        )

}

export default MyAllOrders;