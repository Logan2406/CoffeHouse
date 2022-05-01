const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);


const fast2sms = require('fast-two-sms')

module.exports ={
    getPizza: async function(req,res)
    {

        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=8'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getIcecream:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=5'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getDrinks:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=6'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getCoffee:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=2'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getBiryani:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=1'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getTea:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=3'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getFries:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=4'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    }
    ,
    getRolls:async function(req,res)
    {
        const sql = 'SELECT * FROM PRODUCT WHERE cat_id=7'
        const prod =  await query(sql);
        console.log(prod);
        res.send(prod);
    },


    getAllCategories:async function(req,res)
    {
        const sql ='SELECT * FROM CATEGORY';
        const cats = await query(sql);
        res.send(cats);
    }

,

    getAllVacantTables:async function(req,res)
    {
        console.log("vacant tables");
        let sql = `SELECT tab_cat, COUNT(*) as count from ORDERTABLE where booked=0 GROUP BY tab_cat UNION SELECT tab_cat, 0 as count from ORDERTABLE where tab_cat NOT IN (SELECT tab_cat from ORDERTABLE where booked=0 GROUP BY tab_cat) GROUP BY tab_cat ORDER BY tab_cat`
        let rows = await query(sql);
        let obj = {
            one:rows[0].count,
            two:rows[1].count,
            four:rows[2].count,
            six:rows[3].count
        }
        return res.status(200).send({data:obj});
    }

    ,

    getAllBookedTables:async function(req,res)
    {
        console.log("I am in Booked Table")
        console.log("vacant tables");
        let sql = `SELECT tab_cat, COUNT(*) as count from ORDERTABLE where booked=1 GROUP BY tab_cat UNION SELECT tab_cat, 0 as count from ORDERTABLE where tab_cat NOT IN (SELECT tab_cat from ORDERTABLE where booked=1 GROUP BY tab_cat) GROUP BY tab_cat ORDER BY tab_cat`
        let rows = await query(sql);
        let obj = {
            one:rows[0].count,
            two:rows[1].count,
            four:rows[2].count,
            six:rows[3].count
        }
        return res.status(200).send({data:obj});
    }
,
    sendmessage:async function(req,res)
    {
        let num = req.body.num;
        let msg = req.body.msg;


        let options = {authorization : process.env.SMS_API_KEY , message : msg ,  numbers : [num]} 
        const resp = await fast2sms.sendMessage(options) //Asynchronous Function.
        return res.send(resp);
    }
}
