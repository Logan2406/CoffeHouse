const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload');


require('dotenv').config({path:'./config.env'});

const {loginUser,verifyUser,grantRole,refreshToken,verifyLoginUser,logoutUser,demosql} = require('./Utils/demoAuth');

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:3000");
    next();
});

app.use(fileUpload());


app.use(cors());


const prod_router = require('./prodroute');
const user_router = require('./userRoute');
const admin_router = require('./adminRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/product",prod_router);
app.use("/user",verifyLoginUser,grantRole(['User']),user_router);
app.use("/admin",verifyLoginUser,grantRole(["Admin"]),admin_router);






//Main Auth 
app.post("/login",loginUser);
app.post("/verify",verifyUser);
app.post("/refreshToken",refreshToken);
app.get("/logout",logoutUser);

//app.post("/forgetpass",forgetPass)



app.get("/demosql",demosql);


if(process.env.NODE_ENV =="production")
{
    app.use(express.static("client/build"))
}



const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>
{
    console.log(`Server is running on port ${PORT}`);
})