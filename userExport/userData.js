const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);
const path = require('path')
const bcrypt = require('bcrypt');
const { request } = require('http');

const findUserId = async(uname) =>
{
    let sql =  `SELECT u_id from USER where u_email='${uname}'`;
    let rows = await query(sql); 
    return rows[0].u_id;
}


module.exports = {

    getUserInfo: async function(req,res,next)
    {
        let usname = req.headers['username'];

        let userId = await findUserId(usname);

        let sql = `SELECT * FROM USER_DESC  where u_id=${userId}`;

        let rows = await query(sql);
        
        console.log(rows[0])
        
        return res.status(200).send({userDet:rows[0]});

    },

    updateUserInfo :async function(req,res,next)
    {
           
            let usname = req.headers['username'];
            let userId = await findUserId(usname);


            let userDetails = req.body.userDet;
            console.log(JSON.stringify(userDetails));

            
            let sql = `UPDATE USER_DESC SET fname='${userDetails.name}',add_line_1='${userDetails.address1}',add_line_2='${userDetails.address2}',city='${userDetails.city}',state='${userDetails.state}',gender='${userDetails.gender}',dist='${userDetails.dist}',postoff='${userDetails.postOff}'  where u_id=${userId}`;
            await query(sql);

            let dob =  new Date(userDetails.dob).toISOString().slice(0, 10)
            sql = `UPDATE USER_DESC SET dob='${dob}',pincode=${req.body.pincode} where u_id=${userId}`;
            await query(sql);







    },
    
    changePassword: async function(req,res,next)
    {
        console.log("I am in Change Password");
        let newPass = req.body.newPass
        let userName = req.headers.username;

        try{
                        const salt = await bcrypt.genSalt();
                        const passw = await bcrypt.hash(newPass,salt);
                        sql = `UPDATE USER SET u_pass ='${passw}' WHERE u_email='${userName}'`;
                        let rows = await query(sql); 
                        return res.status(200).send({msg:"Password Changed Successfully"});
        }
        catch(err)
        {
            console.log(err)
            return res.status(403).send({msg:"Error Occurred"});
        }
        
    },
    getAllMyOrders : async function(req,res,next)
    {
        console.log("I am in ALL my ORders pg")
        let usname = req.headers.username;
        let sql = `SELECT his_id,USER.u_id,his_date,u_email,total FROM USERORDER_HIS,USER where USER.u_email = '${usname}' AND USERORDER_HIS.u_id=USER.u_id ORDER BY his_date DESC`;
        let rows = await query(sql);
        let productRows=[];
        let newRows=[];
        let reviewRows=[];
        for(let i=0;i<rows.length;i++)
        {
            sql = `SELECT pr_id,PRODUCT.prod_id,prod_name,quantity,price,image_path FROM PRODUCTORDER_HIS,PRODUCT where his_id=${rows[i].his_id} AND PRODUCTORDER_HIS.prod_id=PRODUCT.prod_id`;
            productRows = await query(sql);
            sql = `SELECT re_id,rev_date,stars,review,or_id FROM ALLREVIEW where or_id=${rows[i].his_id}`;
            reviewRows=await query(sql);
            newRows.push({...rows[i],orders:productRows,reviews:reviewRows});
        }


        return res.status(200).send({data:newRows});
    }
    ,

    postAllReview:async function(req,res,next)
    {
        console.log("I am in postAll Review")
        let usname = req.headers.username;
         //get the u_id form USER table;
        let id = await findUserId(usname);
        console.log("ID is "+id);
        //todays date = new Date().toISO()...  

        let todaysDate = new Date().toISOString().slice(0,10);
    
        //starts from req.body.stars

        let stars = req.body.stars;
        //reviwe from req.body.review

        let review = req.body.review;
        //or_id -----> req.body his_id
        let his_id = req.body.his_id;
        console.log("His id " +his_id);

        //---> INSERT INTO ALLREVIEW
        let sql = `INSERT INTO ALLREVIEW(u_id,rev_date,stars,review,or_id) VALUES(${id},'${todaysDate}',${stars},'${review}',${his_id})`;
        let rows = await query(sql);

        console.log("Date inserted successfully");

        return res.status(200).send({msg:"Review Inserted Successfully"});
    }

    ,
    editAllReview : async function(req,res,next)
    {
        console.log(" I am in Update Review");
        let re_id = req.body.re_id;
        //todays date = new Date().toISO()...  
        let todaysDate = new Date().toISOString().slice(0,10);

        let stars = req.body.stars;
       
        let review = req.body.review;

        //UPDATE ALLREVIEW with re_id

        console.log("Stars "+stars);
        console.log("Re_id "+re_id);
        console.log("Review "+review);
        console.log("Todays Date "+todaysDate);

        let sql = `UPDATE ALLREVIEW SET rev_date='${todaysDate}',stars=${stars},review='${review}' where re_id =${re_id}`;
        let rows =await query(sql);

        return res.status(200).send({msg:"Review Updated Successfully"});
    }
    
    ,
   
    postProductReview :async function(req,res,next)
    {
           let usname = req.headers.username;
            
           //get the u_id form USER table;

           let id = await findUserId(usname);
            //todays date = new Date().toISO()...  

            let todaysDate = new Date().toISOString().slice(0,10);
            //stars from req.body.stars

            let stars = req.body.stars;
            //reviwe from req.body.review
            let review = req.body.review;
            //prod_id from req.body.prod_id

            let prod_id = req.body.prod_id;

            //insert this data into the PRODREVIEW

            let sql = `INSERT INTO PRODREVIEW(u_id,prod_id,rev_date,stars,review,or_id) VALUES(${id},${prod_id},'${todaysDate}',${stars},'${review}',${his_id})`;
            let rows = await query(sql);
            return res.status(200).send({msg:"Review Inserted Successfully"});
    }
,
    editProductReview :async function(req,res,next)
    {

        let re_id = req.body.re_id;

        let todaysDate = new Date().toISOString().slice(0,10);

        let stars = req.body.stars;
       
        let review = req.body.review;


        let sql = `UPDATE TABLE PRODREVIEW SET rev_date = '${todaysDate}',stars=${stars},review=${review} where re_id =${re_id}`;
        let rows =await query(sql);

        return res.status(200).send({msg:"Review Updated Successfully"});
    
    },
    
    getProductsForUser: async function(req,res,next)
    {
        let usname = req.headers.username;
        
        let id = await findUserId(usname);
        
        let sql = `SELECT his_id,his_date FROM USERORDER_HIS where u_id=${id} ORDER BY his_date DESC`;
        let rows = await query(sql);
        let prodRows = [];
        let newRows =[];
        for(let i=0;i<rows.length;i++)
        {
            sql = `SELECT pr_id,PRODUCT.prod_id,prod_name,image_path FROM PRODUCTORDER_HIS,PRODUCT where his_id = ${rows[i].his_id} AND PRODUCTORDER_HIS.prod_id=PRODUCTprod_id`;
            prodRows = await query(sql);
            
            let reviewRows = [];
            for(let j=0;j<prodRows.length;j++)
            {
                sql = `SELECT re_id,rev_date,stars,review FROM PRODREVIEW where or_id=${rows[i].his_id}`;
                let demoRows = await query(sql);
                reviewRows.push(demoRows);
                prodRows.push({...prodRows[i],reviews:demoRows});
            }
        

            newRows.push({...rows[i],products:prodRows});
        }

        return res.status(200).send({data:newRows});
        
    }
    ,
    getMyDistinctProduct:async function(req,res,next)
    {
        let usname = req.headers.username;
        
        let id = await findUserId(usname);

        let finalRows=[];
        let sql=`SELECT DISTINCT PRODUCT.prod_id as prod_id,prod_name,image_path FROM USERORDER_HIS,PRODUCTORDER_HIS,PRODUCT where USERORDER_HIS.u_id=${id} AND USERORDER_HIS.his_id=PRODUCTORDER_HIS.his_id AND PRODUCTORDER_HIS.prod_id=PRODUCT.prod_id`;
        let rows = await query(sql);

        for(let i=0;i<rows.length;i++)
        {
            sql = `SELECT re_id,stars from PRODREVIEW where prod_id=${rows[i].prod_id} AND u_id=${id}`;
            let newRows = await query(sql)
            let x = {...rows[i],reviews:newRows};
            finalRows = [...finalRows,x]; 

        }
        return res.status(200).send({data:finalRows});
    }
   ,
   setMyProductReview:async function(req,res,next)
   {

    console.log(" I am in Product Review");
    let usname = req.headers.username;
        
    let id = await findUserId(usname);
    
    let todaysDate = new Date().toISOString().slice(0,10);

    let prodId = req.body.prod_id;
    let stars = req.body.stars;


    let sql = `INSERT INTO PRODREVIEW(u_id,prod_id,rev_date,stars) VALUES(${id},${prodId},'${todaysDate}',${stars})`;
    rows = await query(sql);


    return res.status(200).send({msg:"Ratind Added successfully"});
   }
}