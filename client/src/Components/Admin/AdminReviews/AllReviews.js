import {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card,ListGroup,ListGroupItem} from 'react-bootstrap';
import './review.css';


const AllReviews =() =>
{
    const [prodReviews,setProdReviews] = useState([]);

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    let sep="\\";

    useEffect(async()=>
    {
        const response = await axios.get("/admin/getallreviews",{headers: 
                                                                       { "Content-Type": "application/json",
                                                                                "ref_token":reffTok,
                                                                                "username":usname }}).then(resp=>resp).catch(err=>err);
        if(response.status==200)
        {
            setProdReviews(response.data.data);
        }

    },[])

    return(
        <>
            <div className="d-flex flex-wrap" style={{rowGap:"50px",columnGap:"70px"}}>
            {prodReviews.filter(ele=>ele.reviews.length>0).map((ele,i)=>
            {
                return(
                    <Card className="prod-review-card" style={{ minWidth: '30rem'}}>
                        <Card.Body style={{maxHeight:"70px"}}>
                            <Card.Title style={{fontSize:"30px"}}>User -- {ele.u_email}</Card.Title>
                        </Card.Body>
                        <div className="list-group-flush" style={{padding:"20px"}}>
                            {ele.prods.map((el,j)=>
                            {
                                return(
                                    <div className="d-flex justify-content-between prod" style={{marginBottom:"10px"}}><span><img src={sep+el.image_path}/></span><span style={{alignSelf:'center'}}>{el.prod_name}</span></div>
                                )   
                            })}
                            
                        </div>
                        <Card.Body>
                        <div className="list-group-flush">
                            {ele.reviews.map((el,j)=>
                            {
                                return(
                                    <div style={{margin:0}} className="d-flex justify-content-between rev-row">  {el.stars==1?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤮</span>:<></>}
                                                {el.stars==2?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😟</span>:<></>}
                                                {el.stars==3?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😌</span>:<></>}
                                                {el.stars==4?<span role="img" aria-label="face" style={{fontSize:"50px"}}>😊</span>:<></>}
                                                {el.stars==5?<span role="img" aria-label="face" style={{fontSize:"50px"}}>🤩</span>:<></>}   <span style={{alignSelf:'center'}}>{el.review}</span></div>
                                )   
                            })}
                            
                        </div>
                        </Card.Body>
                    </Card>
                )
            })}
            </div>
                                              
        </>
    )
}

export default AllReviews;