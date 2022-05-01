const express = require('express')
const app = express();
const util=require('util')
const mysql = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const query = util.promisify(mysql.query).bind(mysql);


module.exports=
{
    login:async function(req,res,next)
    {
        let num = req.body.num;
        let pass = req.body.pass;

        let sql = `Select * from USER where u_email ='${num}'`;
        let rows = await query(sql);

        if(rows!=null||rows.length==0)
        {
            return res.status(400).send({msg:"No User Found"});
        }
        else
        {
            let user = rows[0];

            const auth = await bcrypt.compare(pass,user.u_pass);

            if(auth)
            {
                //create token
            }
        }

    },

}