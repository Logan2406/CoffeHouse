const express = require('express')
const app = express();
const util=require('util')
const mysql = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const query = util.promisify(mysql.query).bind(mysql);

const createToken =async (usname) =>
{
    console.log("username"+usname);
    return jwt.sign(
        {usname},
        process.env.JWT_TOK_SECRET,
        {
            expiresIn:2*60
        }
    )
}


const createRefreshToken = async (usname) =>
{
    console.log("username"+usname);
    return jwt.sign(
        {usname},
        process.env.JWT_REF_SECRET,
        {
            expiresIn:24*60*60
        }
    )

}


const validUser = async (u_name) =>
{
    console.log("I am in Valid User method")
    sql = `SELECT * FROM USER where u_email = '${u_name}'`;
    rows = await query(sql);

    console.log("Rows :"+rows);
   
    if(rows.length===0)
    {
        
        return 0;
    }

    return rows[0];

}

const checkAndDelete = async(u_id) =>
{
    let sql = `SELECT * FROM USERTOKEN where uname = '${u_id}'`;
    rows = await query(sql);

    if(rows.length === 0 )
    {
        return 0;
    }

    sql =`DELETE FROM USERTOKEN where uname = '${u_id}'`;
    await query(sql)
    
    return 1;

}



const saveAccess = async(id,aToken,rToken) =>
{
    sql =`INSERT INTO USERTOKEN VALUES(${id},'${aToken}','${rToken}')`;
    await query(sql);

}


const saveNewAccess = async(id,aToken) =>
{
    sql =`UPDATE USERTOKEN SET actok='${aToken}' where uname=${id}`;
    await query(sql);

}

const getRefreshToken  = async(uid) =>
{
    sql =`SELECT * FROM USERTOKEN where uname=${uid}`;
    rows = await query(sql);
    console.log(rows);
    return rows[0].reftok;
}



const checkRefreshToken = async(uemail,reff) =>
{
    us = await validUser(uemail);
    console.log("This is user for check:"+us.u_id);
    ref = await getRefreshToken(us.u_id);
    
    if(ref===reff)
    {
        console.log("Value got");
        return true;
    }
   
    return false;

}


const deleteUserToken = async(uemail) =>
{
    us = await validUser(uemail);
    sql =`DELETE FROM USERTOKEN where uname=${us.u_id}`;
    await query(sql);

}




module.exports ={


    refreshToken : async function (req,res,next)
    {

       ref_token = req.headers['ref_token']

       val = await checkRefreshToken(req.body.username,ref_token);

       if(val===true)
       {
            const {usname,exp} = await jwt.verify(ref_token, process.env.JWT_REF_SECRET,(err,response) =>
            {   
                if (err) 
                {

                    console.log(err);
                    console.log("error occured");
                    
                    deleteUserToken(req.username)

                    return res.status(403).send({message:"Login Again"});
                 }
                 else{
                     console.log("Yeh dekho "+JSON.stringify(response));
                     return response;
                 }   

            });
            
            sql=`SELECT * from USER where u_email='${req.body.username}'`;
            rows = await query(sql);
            let accTok = await createToken(req.body.username);
            await saveNewAccess(rows[0].u_id,accTok);

            return res.status(200).send({actoken:accTok,refToken:ref_token,user:req.body.username,role:rows[0].u_role})
            // res.status(200).send({actoken:accTok,refToken:refTok,user:user.u_email,message:"Login successful"});
       }
       //delete the entry form database
        await deleteUserToken(req.username)
        return res.status(403).send({message:"Login Again"});

    },

    verifyUser: async function(req,res,next)
    {
        ac_token = req.headers['auth_token'];

        console.log("token received: "+ac_token);

        if(ac_token===undefined)
        {
            console.log("ac_token undefined")
            return res.status(403).send({msg:"No Token found"});
        }

        //check the authtoken is same or not

        let err_msg="";
        let err_flag=false;
        await jwt.verify(ac_token, process.env.JWT_TOK_SECRET,(err,response) => 
        {
            if (err) {

               if(err.message==='jwt expired')
               {
                    console.log("jwt token expired")
                    err_flag=true;
                    err_msg="JWT Expired"

               }
               else{
                    console.log(err);
                    err_flag=true
                    console.log("error occured");
                    err_msg="Error Occured Please Login again";
               }
                    
            }
            else{
                err_flag=false;
                console.log("Yeh dekho "+JSON.stringify(response));

            }
           
        });

       if(err_flag===true)
       {
        res.status(402).send({message:err_msg})
       }
       return res.status(200).send({message:'User Verified'});
        next();
    },



    loginUser :async function(req,res,next)
    {
        const uname = req.body.username;
        const upass = req.body.password;

        console.log("username"+uname);
        console.log("password"+upass);
        //first check username is in database or not

        let user = await validUser(uname);
        console.log('This is user :'+user);
        
        if(user===0)
        {
            return res.status(400).send({message:"NO user found"})
        }

        //if present first delete that and then proceed
        console.log(user.u_id);
        await checkAndDelete(user.u_id);

        const auth = await bcrypt.compare(upass,user.u_pass);
        
        if(auth)
        {
            console.log("Logged successful");
            let accTok = await createToken(user.u_email);
            let refTok = await createRefreshToken(user.u_email);
            await saveAccess(user.u_id,accTok,refTok);
            return res.status(200).send({actoken:accTok,refToken:refTok,user:user.u_email,role:user.u_role});

        }
        else
        {
            console.log("Pasword not matched");
            return res.status(400).send({message:"Password not matched"});
        }

    },
    logoutUser:async function(req,res,next)
    {
        //logout is done with refresh token
        console.log("I am in LOgout user");
        console.log(req.headers.username)
        sql = `SELECT * from USER where u_email = '${req.headers.username}'`;
        rows = await query(sql);
        console.log("ROWS :"+JSON.stringify(rows));
        if(!(rows===undefined))
        {
            sql =`DELETE FROM USERTOKEN where uname = ${rows[0].u_id}`;
            await query(sql);
            return res.status(200).send({message:"Logout Successful"});
        }
        
        return res.status(403).send({message:"Wrong USER"});
    },
    verifyLoginUser: async function(req,res,next)
    {
        console.log('This is verify Login')
        let usname = req.headers['username'];
        let reffToken = req.headers['ref_token'];
        console.log(reffToken); //---> undefined
        //let accToken = req.headers['acc_token'];


        let val = await checkRefreshToken(usname,reffToken);
        console.log("This is value :"+val);
        if(val===true)
       {
            jwt.verify(reffToken, process.env.JWT_REF_SECRET,(err,response) =>
            {   
                if (err) 
                {

                    console.log(err);
                    console.log("error occured");
                    
                    deleteUserToken(req.username)

                    return res.status(403).send({message:"Login Again"});
                 }
                 else{
                     console.log("Yeh dekho "+JSON.stringify(response));
                 }   

            });
            
            next();
            // res.status(200).send({actoken:accTok,refToken:refTok,user:user.u_email,message:"Login successful"});
       }
       //delete the entry form database
        else{
            console.log("I am away also");
            await deleteUserToken(usname)
            return res.status(403).send({message:"Login Again"});
        }
       
    },
    grantRole:function(roles)
    {
        return async function demoFunction(req,res,next)
        {
            console.log("This is for ROLE")
            let u_name = req.headers['username'];

            if(u_name===undefined)
            {
                return res.status(403).send({message:"No User send"});
            }
            console.log("This is username"+u_name);
            let sql = `SELECT * FROM USER WHERE u_email ='${u_name}'`;
            let rows = await query(sql)

            if(rows.length===0)
            {
                
                return res.status(404).send({message:"No user found"})
            }
            console.log("This is Roles "+roles);
            
            console.log(JSON.stringify(rows[0]))
            if(roles.includes(rows[0].u_role))
            {
                console.log("this is true");
                next();
            }
            else
            {
                return res.status(403).send({message:"Not Authorized for the User"});
            }
           
        }   
    },

    forgetPass:async function(req,res,next)
    {

        let phoneNum = req.body.phonenum;
        // check for valid user

        let sql = `SELECT * FROM USER WHERE u_email='${phoneNum}'`;

        rows = await query(sql);

        if(row.length<1)
        {
            return res.status(404).send({msg:"No User Found"});
        }
        else
        {
                let newpp = Date.now().toString();

                sql = `UPDATE USER SET u_pass='${newpp}' where u_email='${phoneNum}'`;
                rows = await query(sql);

                return res.status(200).send({msg:"Password Update Successfully"});

        }

    }

    ,
    demosql: async function(req,res,next)
    {
       let somneName = __dirname;

        return res.status(200).send({data:somneName,token:process.env.JWT_TOK_SECRET})
    }
}