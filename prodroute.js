const express = require('express');
const app = express();


const router = express.Router();

const {getPizza,getBiryani,getDrinks,getCoffee,getFries,getIcecream,getRolls,getTea,getAllCategories, getAllVacantTables,sendmessage} = require('./productExport/userProduct')

router.get("/biryani",getBiryani);
router.get("/coffee",getCoffee);
router.get("/drinks",getDrinks);
router.get("/fries",getFries);
router.get("/icecream",getIcecream);
router.get("/rolls",getRolls);
router.get("/tea",getTea);
router.get("/pizza",getPizza);
router.get("/categories",getAllCategories);

router.get("/tables",getAllVacantTables)
router.post("/message",sendmessage)

module.exports = router;



/*const check = async () =>
{
    sql ='SELECT * FROM USER';
    const user = await query(sql);
    console.log(user);
}

check();*/





