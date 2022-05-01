const express = require('express')
const {getProducts,getBiryani,getCoffee,getDrinks,getFries,getIceCream,getPizza,getRolls,getTea, editProduct,addProduct, deleteProduct,addUser,getVacant,setTable,checkout,getBookedUsers,getQueuedUsers,getAllUsers,chekprods,paid,getPaidUsers,removeTable,getAllReviews,getAllPaidUsers} = require('./productExport/adminProducts')
const path=require('path')
const router = express.Router();

const {getAllVacantTables,getAllBookedTables} =require("./productExport/userProduct")
console.log("I am Admin Router");

router.get('/getProducts/all',getProducts);
router.get('/getProducts/biryani',getBiryani);
router.get('/getProducts/icecream',getIceCream);
router.get('/getProducts/rolls',getRolls);
router.get('/getProducts/fries',getFries);
router.get('/getProducts/drinks',getDrinks);
router.get('/getProducts/pizza',getPizza);
router.get('/getProducts/coffee',getCoffee);
router.get('/getProducts/tea',getTea);

const getPath = () =>
{
    let dir = __dirname;
    return path.join(dir,'../client/public/prod_img');
}


/*
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: getPath(), 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const upload=multer({ storage: imageStorage,
    limits:{fileSize:10000000},})
*/


router.put('/update/:id',editProduct);
router.post('/addproduct',addProduct);
router.delete('/deleteprod/:id',deleteProduct);
router.post('/adduser',addUser);

router.get('/tablesinfo',getAllVacantTables);
router.get('/tablesbooked',getAllBookedTables);

router.get('/bookedusers',getBookedUsers);
router.get('/queuedusers',getQueuedUsers);
router.get('/allusers',getAllUsers);


router.post('/getvacant',getVacant);
router.post('/settable',setTable);
router.post('/revtable',removeTable);

router.get('/chkprods/:id',chekprods);
router.post('/checkout',checkout);
router.post('/payment',paid);

router.get('/paidusers',getPaidUsers);
router.get('/allpaidusers',getAllPaidUsers);

router.get('/getallreviews',getAllReviews);





module.exports = router;


