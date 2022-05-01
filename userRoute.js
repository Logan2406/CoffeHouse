const express = require('express');

const app = express();
const {getUserInfo,changePassword,getAllMyOrders,postAllReview,editAllReview,postProductReview,editProductReview,getProductsForUser,updateUserInfo,getMyDistinctProduct,setMyProductReview} = require('./userExport/userData')

const router = express.Router();

router.get('/getInfo',getUserInfo);
router.post('/changepass',changePassword);
router.post('/updateInfo',updateUserInfo)
router.get('/myorders',getAllMyOrders);
router.post('/addreview',postAllReview);
router.put('/updatereview',editAllReview);
router.post('/addprodreview',postProductReview);
router.put('/updateprodreview',editProductReview);
router.get('/productsforreview',getProductsForUser);

router.get('/myproducts',getMyDistinctProduct);
router.post('/myprodreview',setMyProductReview);

module.exports = router;