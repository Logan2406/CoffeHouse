import { Routes,Route,Link } from "react-router-dom";

import AllReviews from "./AllReviews";
import ProdReviews from "./ProdReviews";

const ReviewHandler =() =>
{
    return(
        <>
         <div className="d-flex flex-row justify-content-between use-page-nav" style={{marginTop:"10px",columnGap:"40px",marginBottom:"100px"}}>
                    <button className="btn allOrder" style={{height:"70px",flex:1}}><Link to="/admin/reviews/">All Reviews</Link></button>
                    <button className="btn allReview" style={{height:"70px",flex:1}}><Link to="/admin/reviews/prodreview">Product Reviews</Link></button>
        </div>
        <div style={{paddingLeft:"90px",paddingRight:"90px"}}>
            <Routes>
                <Route path="/" element={<AllReviews/>}/>
                <Route path="/prodreview" element={<ProdReviews/>}/>
            </Routes>
        </div>
        </>
    )
}

export default ReviewHandler;