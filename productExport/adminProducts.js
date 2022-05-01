const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);
const path = require('path')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const fast2sms = require('fast-two-sms')

const chechAndUser=async (phoneNum)=>
{
            //check if phone present --- if present return uid
            let sql = `SELECT * from USER where u_email='${phoneNum}'`;
            let rows = await query(sql);

            if(rows.length>0)
            {
                return rows[0].u_id;
            }

            else
            {
                let  time = Date.now().toString();

                try
                {
                        const salt = await bcrypt.genSalt();
                        const passw = await bcrypt.hash(time,salt);
                        sql = `INSERT INTO USER(u_email,u_pass,u_role) VALUES('${phoneNum}','${passw}','User')`;
                        rows = await query(sql);
                        
                        

                        let msg = `Your Password is ${time}`

                        let options = {authorization : process.env.SMS_API_KEY , message : msg ,  numbers : [phoneNum]} 
                        const resp = await fast2sms.sendMessage(options) //Asynchronous Function.
                }
                catch(err)
                {
                    console.log(err);
                    return -1;
                }
                //set password

                sql =`SELECT u_id from USER where u_email='${phoneNum}'`;
                rows = await query(sql);

                sql = `INSERT INTO USER_DESC(u_id) VALUES('${rows[0].u_id}')`;
                let newRows = await query(sql);

                return rows[0].u_id;

            }

            // if not --- add the user and return the uid
} 






module.exports = {

    getProducts :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    }
    ,
    getBiryani :async function(req,res,next)
    {
        console.log("I am in Biryani Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=1';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    }
    ,
    getPizza :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=8';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    },
    getIceCream :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=5';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    }
    ,
    getDrinks :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=6';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    }
    ,
    getCoffee :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=2';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    },
    getTea :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=3';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    },
    getFries :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=4';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    },
    getRolls :async function(req,res,next)
    {
        console.log("I am in get Products")
        let sql = 'SELECT * FROM PRODUCT WHERE cat_id=7';
        let prods =  await query(sql);
        console.log(prods);
        res.status(200).send({products:prods});
    },

    //Edit and Delete Product


    editProduct : async function(req,res,next)
    {
        console.log("I am in Edit Product");
        let id  = req.params.id
        let prod = req.body.prod

        console.log("Id  :"+id);
        console.log("Product  :"+JSON.stringify(prod));

       let sql=`UPDATE PRODUCT SET prod_name='${prod.product_name}',price=${prod.price} where prod_id=${id}`

       await query(sql)
        
        res.status(200).send("Corret");
    },
    addProduct :async function(req,res,next)
    {
        //let file = req.file
        //console.log(req.file)

        let product = JSON.parse(req.body.objArr);

        let category= product.category_id;

        let catFolder = "";
        let cat_id =0;
        let img_path ="";
        switch(category)
        {
            case 'Biryani' : {catFolder="Biryani"; cat_id=1;break;}
            case 'IceCream' : {catFolder="IceCream";cat_id=5;break;}
            case 'Rolls' : {catFolder="Rolls";cat_id=7;break;}
            case 'Fries' : {catFolder="Fries";cat_id=4;break;}
            case 'Drinks' : {catFolder="Drinks";cat_id=6;break;}
            case 'Pizzaa' : {catFolder="Pizza";cat_id=8;break;}
            case 'Coffee' : {catFolder="Coffee";cat_id=2;break;}
            case 'Tea' : {catFolder="Tea";cat_id=3;break;}
            default : catFolder="";
        }

        if(req.files!==undefined||req.files!==null)
        {
            const file = req.files.image;
            
            let sep ="\\";

            console.log("This is file Type------------------------------------------------------"+file.name);
            let newFileName = Date.now()+file.name;
            let filePath = path.join(__dirname,'../client/public/prod_img/'+catFolder+"/"+newFileName);

           img_path =`prod_img${"\\\\"}${catFolder}${"\\\\"}${newFileName}`;

           //img_path =path.join("prod_img"+sep+catFolder+sep+newFileName);
            await file.mv(filePath,err=>
            {
                if(err)
                {
                    console.log(err)
                }
            })   
        }
        
    

        let sql= `INSERT INTO PRODUCT (prod_name,description,price,cat_id,image_path) VALUES('${product.product_name}','${product.description}',${product.price},${cat_id},'${img_path}')` 
            
        await query(sql);

        return res.status(200).send({msg:"Product Added"});
        
        //console.log("This is the object" + req.body.objArr);
         // res.send(file)

           /* var sql = "insert into PRODUCT  (prod_name,description,price,cat_id,image_path) values (    ?, ?, ?,?,?)"; 
             mysqlConnection.query(sql, [ product.product_name, product.description,parseInt(product.price),parseInt(product.category_id),req.file.filename], (err, rows, fields) => {
             if (!err){
             res.send(rows);
             }
             else
             console.log(err);
             })   */

             //let cat_id =


            // let sql = `INSERT INTO PRODUCT(prod_name,description,price,cat_id,image_path) VALUES('${product.name}','${product.description},${parseInt(product.price)}')`
    
        
    },
    deleteProduct: async function(req,res,next)
    {
        let id  = req.params.id;

        sql =`DELETE FROM PRODUCT where prod_id=${id}`
        await query(sql);
    }



,

    // USer Funtion

    addUser:async function(req,res,next)
    {
            console.log('I am in ADD USER');
            let num=req.body.num;
            let uname = req.body.usname;
            let time = Date.now().toString();

            let sql = `Select * From USER where u_email='${num}'`;

            rows = await query(sql);

            if(rows.length>0)
            {
                return res.status(403).send({msg:"User Exist"});
            }
            else{

                try{
                    const salt = await bcrypt.genSalt();
                    const passw = await bcrypt.hash(time,salt);
    
                    sql = `Insert into USER(u_email,u_pass,u_role) values('${num}','${passw}','User')`;
    
                    await query(sql);

                   // sql = `Insert into USER_DESC(u_id) Values('${}')`
                    //send the message to the number;
    
                }
                catch(e)
                {
                    console.log(e)
                    return res.send(404).send({msg:"Error Occured"})
                }

                return res.status(200).send({msg:"User Added",tt:time})

            }

            

    },

    deleteUser: async function(req,res,next) 
    {
        let num=req.body.num;
        
        let sql =`DELETE FROM USER where user_email'${num}'`;

        await query(sql);

        return res.status(200).send({msg:"User Deleted successfully"});
    }
,





getVacant: async function(req,res,next)
{
        let tabCat = req.body.category;


        let sql =`SELECT * from ORDERTABLE where booked=0 AND tab_cat=${tabCat}`
        let rows = await query(sql);
        console.log("Vacant Table : "+rows[0].tab_id);
        res.status(200).send({tabnum:rows[0].tab_id});



},
    setTable: async function(req,res,next)
    {

            console.log("This is Phone number : "+req.body.phnum);
            console.log("This is Table number : "+req.body.tableNo);
            
            let tabno = req.body.tableNo;

            let uid = await chechAndUser(req.body.phnum);

            if(uid==-1)
            {
                return res.status(403).send({msg:"Error Occured"});
            }
            else
            {
                console.log(uid);
                console.log(" I GOT THE USER ID ");

                let sql =`UPDATE ORDERTABLE SET booked=1,u_id=${uid} where tab_id=${tabno}`;
                    
                let rows = await query(sql);
            }
           
            return res.status(200).send({msg:"User Added"});

    },
    removeTable:async function (req,res,next)
    {
        let tabno = req.body.tableNo;
        let sql =`UPDATE ORDERTABLE SET booked=0 ,u_id=NULL where tab_id=${tabno}`;
        let rows = await query(sql);
        
        return res.status(200).send({msg:"User Removed successfully"});


    }
    ,

    getAllUsers :async function(req,res,next)
    {
        console.log("I am in ALL USERS");
        let sql =`SELECT u_id,u_email FROM USER`;
        let rows = await query(sql);

        return res.status(200).send({data:rows});
    }
,
    getBookedUsers: async function(req,res,next)
    {
        let sql = `SELECT USER.u_id,u_email,tab_id,tab_cat FROM USER,ORDERTABLE where USER.u_id=ORDERTABLE.u_id AND booked=1`;
        rows = await query(sql);

        console.log(rows)

        let newRows = [];

        let newres =32;



        for(let i=0;i<rows.length;i++)
        {
            let ele=rows[i];
            sql =`SELECT * FROM USERORDER where u_id=${ele.u_id}`;
            newres = await query(sql);
            if(newres.length>0)
            {
                console.log("ordered");

                ele.status="ordered";
                newRows.push(ele)
                console.log(newRows)
            }
            else
            {
                console.log("not ordered");
                ele.status="unordered";
                newRows.push(ele)
                console.log(newRows)
            }

        }
        

        console.log(newRows);
        return res.status(200).send({data:newRows});


    }
    ,

    getQueuedUsers :async function(req,res,next)
    {
        console.log("I am in Queued Users");
        let sql = `SELECT USER.u_id,or_id, tab_id,u_email,total FROM USERORDER,USER where USERORDER.u_id=USER.u_id`;
        rows = await query(sql);

        console.log(rows);

        return res.status(200).send({data:rows});

    }
    ,
    chekprods:async function(req,res,next)
    {
        console.log('I am in Check Products')

        let id = req.params.id;
        let sql = `SELECT PRODUCTORDER.prod_id,or_id,quantity,prod_name,price,image_path,price*quantity as total FROM PRODUCTORDER,PRODUCT where PRODUCTORDER.or_id=${id} AND PRODUCT.prod_id=PRODUCTORDER.prod_id`

        let rows = await query(sql);
        return res.status(200).send({data:rows});

    }
    ,
    checkout:async function(req,res,next)
    {


        let products =req.body.items;
        let tabno  = req.body.tab;

        console.log("Products are : "+JSON.stringify(products));
        console.log("Table No  is : "+tabno);

        // get the u_id from the ORDERTABLE with the help of tab_id

        let sql =`SELECT u_id from ORDERTABLE where tab_id=${tabno}`;
        
        let rows = await query(sql);

        let u_id = rows[0].u_id;
       
        // add in USERORDER ---- or_id auto generate have to do,,,,,  u_id, total,tab_id
        
        let totalPrice = 0;

        products.forEach((ele)=>{
            totalPrice = totalPrice + (ele.prod_price*ele.prod_quant);
        })

        
        sql =`INSERT INTO USERORDER(u_id,total,tab_id) VALUES(${u_id},${totalPrice},${tabno})`; 

        rows = await query(sql);


        sql = `SELECT or_id from USERORDER where tab_id =${tabno}`;
        rows = await query(sql);
        let ord_id = rows[0].or_id;

        //loop
        //add products with getting the u_id form USERORDER --->  pr_id auto generate ---  prod_id foreign key, or_id.., quantity..
        //end loop

        products.forEach(async(ele)=>{
            sql = `INSERT INTO PRODUCTORDER(prod_id,or_id,quantity) VALUES(${ele.prod_id},${ord_id},${ele.prod_quant})`;
            await query(sql);
        })

        //send a OTP 

        return res.status(200).send({msg:"Order Placed Successfully"});
    },

    paid :async function(req,res,next)
    {
        //get the tab_no = req.body.tab
        console.log("I am in payment");
        let tabno = req.body.tab;
        console.log("Table no "+tabno);


        // get the u_id from the ORDERTABLE with the help of tab_id
        let sql = `SELECT u_id from ORDERTABLE where tab_id=${tabno}`;
        let rows = await query(sql)
        
        let u_id = rows[0].u_id;

        //get the entry of USERORDER with u_id
        sql =`SELECT * FROM USERORDER where u_id=${u_id}`;
        rows = await query(sql);

        let orderrow = rows[0];
       
      
       //get the all the products with or_id and in PRODUCTORDER
       
       sql = `SELECT * FROM PRODUCTORDER where or_id=${orderrow.or_id}`;
       rows = await query(sql);
       productrows = rows;


       //make booked =1 entry from ORDERTABLE and make u_id = null with tab_id

        sql =`UPDATE ORDERTABLE SET booked=0 ,u_id=NULL where tab_id=${tabno}`;
        rows = await query(sql);

       //remove all products with the or_id
        sql = `DELETE FROM PRODUCTORDER where or_id=${orderrow.or_id}`;
        rows = await query(sql);

       //remove the enrty form USERORDER and ADD this in USERORDER_HIS ----- > with a date
       sql =  `DELETE FROM USERORDER where or_id=${orderrow.or_id}`;
       rows = await query(sql);


       let todaysDate = new Date().toISOString().slice(0, 10);
       console.log("Date :"+todaysDate);

       sql =`INSERT INTO USERORDER_HIS VALUES (${orderrow.or_id},${orderrow.u_id},${orderrow.total},'${todaysDate}')`;
       rows = await query(sql);

       //add all the products in the PRODUCTORDER_HIS

       for(let i=0;i<productrows.length;i++)
       {
           sql = `INSERT INTO PRODUCTORDER_HIS VALUES(${productrows[i].pr_id},${productrows[i].prod_id},${productrows[i].or_id},${productrows[i].quantity})`;
           rows = await query(sql);
       }
       

       //send an OTP

       return res.status(200).send({msg:"PAYMENT DONE SUCCESSFULLY"});
       
    }
,


    getPaidUsers : async function(req,res,next)
    {

        let todaysDate = new Date().toISOString().slice(0, 10);
        console.log(todaysDate);
        //let sql = `SELECT * FROM USERORDER_HIS,PRODUCTORDER_HIS where his_date = '${todaysDate}' AND USERORDER_HIS.his_id=PRODUCTORDER_HIS.his_id`;
        
        let sql = `SELECT his_id,USER.u_id,his_date,u_email,total FROM USERORDER_HIS,USER where his_date = '${todaysDate}' AND USERORDER_HIS.u_id=USER.u_id`;
        let rows = await query(sql);
        let productRows=[];
        let newRows=[];
        let grandTotal =0;


        for(let i=0;i<rows.length;i++)
        {
            sql = `SELECT pr_id,PRODUCT.prod_id,prod_name,quantity,price,image_path FROM PRODUCTORDER_HIS,PRODUCT where his_id=${rows[i].his_id} AND PRODUCTORDER_HIS.prod_id=PRODUCT.prod_id`;
            productRows = await query(sql);
            newRows.push({...rows[i],orders:productRows});
            grandTotal=grandTotal+rows[i].total;

        }

        return res.status(200).send({data:newRows,grtotal:grandTotal,ordercount:newRows.length});

    },
    getAllPaidUsers: async function(req,res,next)
    {
        let sql = `SELECT his_date,his_id,USER.u_id,his_date,u_email,total FROM USERORDER_HIS,USER where USERORDER_HIS.u_id=USER.u_id ORDER BY his_date DESC`;
        let rows = await query(sql);
        let productRows=[];
        let newRows=[];


        for(let i=0;i<rows.length;i++)
        {
            sql = `SELECT pr_id,PRODUCT.prod_id,prod_name,quantity,price,image_path FROM PRODUCTORDER_HIS,PRODUCT where his_id=${rows[i].his_id} AND PRODUCTORDER_HIS.prod_id=PRODUCT.prod_id`;
            productRows = await query(sql);
            newRows.push({...rows[i],orders:productRows});

        }

        return res.status(200).send({data:newRows});
    }
    ,
    

    getAllReviews:async function(req,res,next)
    {
        let finalRows = []   
        let sql = `SELECT his_id,USER.u_id,u_email,his_date FROM USERORDER_HIS,USER where USERORDER_HIS.u_id=USER.u_id`;
        let rows = await query(sql);
        for(let i=0;i<rows.length;i++)
        {
            sql=`SELECT stars,review from ALLREVIEW where ALLREVIEW.u_id=${rows[i].u_id} AND or_id=${rows[i].his_id}`;
            let reviewRows = await query(sql);
            sql = `SELECT prod_name,image_path FROM PRODUCT,PRODUCTORDER_HIS where PRODUCTORDER_HIS.his_id=${rows[i].his_id} AND PRODUCT.prod_id=PRODUCTORDER_HIS.prod_id`;
            let prodRows = await query(sql);
            
            let x = {...rows[i],reviews:reviewRows,prods:prodRows};
            finalRows = [...finalRows,x];
        }

        return res.status(200).send({data:finalRows})
    }

}