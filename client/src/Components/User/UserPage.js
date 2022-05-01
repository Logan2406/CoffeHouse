import {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {AiFillEdit} from  'react-icons/ai';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Modal,Button} from 'react-bootstrap';

import "./user.css";

function EditModal(props) {

    
    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const [pinCode,setPinCode] = useState("");
    const [postOffice,setPostOffice] = useState([]);

    const [userData,setUserData] = useState({name:"",dob:"",gender:"",address1:"",address2:"",city:"",dist:"",state:"",postOff:""})

    useEffect(()=>
    {
        setUserData({...userData,name:props.user.fname,dob:props.user.dob,gender:props.user.gender,city:props.user.city,address1:props.user.add_line_1,address2:props.user.add_line_2,dist:props.user.dist,state:props.user.state,postOff:props.user.postoff})
    },[])

    const handleChange =(e)=>
    {
        if(e.target.name==='pincode')
        {
            setPinCode(e.target.value);
        }

        if(e.target.name==='postOf')
        {
            setUserData({...userData,city:e.target.value});
            setUserData({...userData,postOff:e.target.value});
        }

        if(e.target.name==='city')
        {
            setUserData({...userData,city:e.target.value});
        }

        if(e.target.name==='gender')
        {
            setUserData({...userData,gender:e.target.value});
        }
        if(e.target.name==='address1')
        {
            setUserData({...userData,address1:e.target.value});
        }
        if(e.target.name==='address2')
        {
            setUserData({...userData,address2:e.target.value});
        }
        if(e.target.name==='fname')
        {
            setUserData({...userData,name:e.target.value});
        }
        if(e.target.name==='dob')
        {
            setUserData({...userData,dob:e.target.value});
            console.log(userData.dob);
        }
    
    }

    const getPinData = async() =>
    {
        const response = await axios.get('http://www.postalpincode.in/api/pincode/'+pinCode).then(resp=>resp).catch(err=>err);

        if(response.data.Status==="Success")
        {
            setPostOffice(response.data.PostOffice);
            setUserData({...userData,dist:response.data.PostOffice[0].District,state:response.data.PostOffice[0].State});

        }
        else
        {
            setPostOffice([]);
            setUserData({...userData,dist:"",state:""});
        }
        

    }

    const submitForm =async(e) =>
    {
        e.preventDefault();

        const response = await axios.post("/user/updateInfo",{userDet:userData,pincode:pinCode},{headers: 
                                                                                    { "Content-Type": "application/json",
                                                                                    "ref_token":reffTok,
                                                                                    "username":usname }}).then(resp=>resp).catch(err=>err);
        if(response.status==200)
        {
            props.Hide();
        }


    }



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label for="exampleInputEmail1">Enter Full Name</label>
                <input type="text" className="form-control" id="fname" name="fname" onChange={handleChange} value={userData.name} placeholder="Enter Full name" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Address Line 1</label>
                <input type="text" className="form-control" id="address1" name="address1" onChange={handleChange} placeholder="Enter Address" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Address Line 2</label>
                <input type="text" className="form-control" id="address2" name="address2" onChange={handleChange}  placeholder="Enter Address" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Date of Birth</label>
                <input type="date"  onChange={handleChange} className="form-control" id="dob" name="dob" value={userData.dob}/>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Gender</label>
                <select class="form-control" id="gender" value={userData.gender} name="gender" onChange={handleChange}>
                    <option>SELECT ONE VALUE</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">City</label>
                <input type="text" value={userData.city} onChange={handleChange} className="form-control" id="city" name="city" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">District</label>
                <input type="text" value={userData.dist} className="form-control" id="dist" name="dist" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">State</label>
                <input type="text" value={userData.state} className="form-control" id="state" name="state"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">PinCode</label>
                <input type="text" className="form-control" id="pincode" name="pincode" onChange={handleChange}  placeholder="Pin Code" />
            </div>
            <button className="btn btn-warning" type="button" style={{marginTop:"10px",marginBottom:"10px"}} onClick={()=> getPinData()}>Get PostOffices</button>
            <div className="form-group">
                <label for="exampleFormControlSelect2">Select the Post Office</label>
                <select className="form-control" id="postOf" name="postOf" onChange={handleChange}>
                <option>--------Select an Option---------</option>
                  {postOffice.map((ele,i)=>
                  {
                      return(
                          <option value={ele.Name}>{ele.Name}</option>
                      )
                  })}
                </select>
            </div>

            <button style={{marginTop:"10px"}} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }









function ChangePassword(props) {

    const [passData,setPassData] = useState({newpass:"",confpass:""});

    const [passError,setPassError] = useState({newpass:"",confpass:""});

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const submitForm = async(e) =>
    {
        e.preventDefault();
        if(passData.newpass===passData.confpass)
        {

            setPassError({...passError,confpass:""});


            if(passError.newpass.length<3 && passError.confpass.length<3)
            {
                
            const response = await axios.post("/user/changepass",{newPass:passData.newpass},{headers: 
                                        { "Content-Type": "application/json",
                                        "ref_token":reffTok,
                                        "username":usname }}).then(resp=>resp).catch(err=>err);
                if(response.status===200)
                {
                     console.log.apply("Password Changed Successfully");
                     props.onHide();
                }
            }
            else
            {

            }


        }
        else
        {
            setPassError({...passError,confpass:"Password is not Matching"});
        }



    }

    const handleChange = (e) =>
    {
        setPassData({...passData,[e.target.name]:e.target.value});
    }

    const handlePass =(e) =>
    {
        let passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passValidation.test(passData.newpass))
        {
            setPassError({...passError,newpass:"Please Enter a Valid Password"});
        }
        else
        {
            setPassError({...passError,newpass:""});
        }
    }



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onEnter={()=>{setPassError({...passError,newpass:"",confpass:""});setPassData({...passData,newpass:"",confpass:""})}}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={submitForm}>
                <div className="form-group" style={{padding:"10px"}}>
                    <label for="exampleInputPassword1">Enter New Password</label>
                    <input type="password" className="form-control" id="new-pass"  onBlur={handlePass} onChange ={handleChange} value={passData.newpass} name="newpass" placeholder="New Password" />
                    {passError.newpass.length<3?"":<small style={{color:"red"}}>{passError.newpass}</small>}
                </div>
                <div className="form-group" style={{padding:"10px"}}>
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="conf-pass"  onChange ={handleChange} value={passData.confpass} name="confpass" placeholder="New Password" />
                    {passError.confpass.length<3?"":<small style={{color:"red"}}>{passError.confpass}</small>}
                
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                
            </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }




const UserPage = () =>
{
    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [passModal, setPassModal] = useState(false);
    const [editModal,setEditModal] = useState(false);

    const [userData,setUserData] = useState({});

    let ac=useState("")
    useEffect(async ()=>
    {
        let uname = JSON.parse(Cookies.get('user')).data.user;   
        setUsername(uname);
        
        const response = await axios.get("/user/getInfo",{headers: 
                                        { "Content-Type": "application/json",
                                        "ref_token":reffTok,
                                        "username":usname }}).then(resp=>resp).catch(err=>err);

        if(response.status==200)
        {
                setUserData({...response.data.userDet,dob:response.data.userDet.dob.slice(0,10)});
        }


    },[])

    const logOut  =  async() =>
    {
        let usname = await JSON.parse(Cookies.get('user')).data.user;
        console.log("username ="+usname);
        let response = await axios.get("/logout",{headers:{"Content-Type":"application/json","username":usname}}).then(res=>res).catch(err=>err)
        if(response['status']===200)
        {
            Cookies.remove('user');
            navigate('/login');
        }

    }



    
      


    return (
        <>
        
        <div className="container" style={{paddingTop:"50px"}}>
        
        <div className="d-flex flex-row justify-content-between use-page-nav" style={{marginTop:"10px",columnGap:"40px",marginBottom:"100px"}}>
                    <button className="btn allOrder" style={{height:"70px",flex:1}}><Link to="/user/myallorder">My All Order</Link></button>
                    <button className="btn  allReview" style={{height:"70px",flex:1}}><Link to="/user/myprodreview">My All Reviews</Link></button>
            </div>
           
            <div className="d-flex justify-content-between userCont" style={{columnGap:"20px",paddingBottom:"60px"}}>

                <div className="d-flex align-items-center flex-column align-self-start userHandle" style={{flex:1,padding:"20px"}}>
                    <img src="img_avatar.png" style={{width:"60%",border:"4px solid black",borderRadius:"50%"}}/>
                    <br/>
                    <h4>Mobile - {username}</h4>
                    <div className="d-flex flex-column" style={{rowGap:"10px"}}>
                        <button className='btn btn-warning' onClick={() => setPassModal(true)}>Change Password</button>
                        <button className='btn btn-danger' onClick={()=>logOut()} >Log Out</button>
                    </div>
                </div>
                <div className="align-self-stretch userDet" style={{flex:4,padding:"20px"}}>
                    <div className="d-flex justify-content-between">
                        <h1>User Details</h1>
                        <button className="btn btn-primary" onClick={()=>setEditModal(true)}><AiFillEdit/>Edit</button>
                    </div>
                    <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}></hr>
                    <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Full Name : <span style={{fontWeight:"normal"}}>{userData.fname}</span></h3>
                    <div className="d-flex flex-wrap" style={{columnGap:"50px"}}>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Gender : <span style={{fontWeight:"normal"}}>{userData.gender}</span></h3>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Date of Birth: <span style={{fontWeight:"normal"}}>{userData.dob}</span></h3>
                    </div>
                    <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Address Line 1 : <span style={{fontWeight:"normal"}}>{userData.add_line_1}</span></h3> 
                    <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Address Line 2 : <span style={{fontWeight:"normal"}}>{userData.add_line_2}</span></h3>
                    
                    <div className="d-flex flex-wrap" style={{columnGap:"50px"}}>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>City : <span style={{fontWeight:"normal"}}>{userData.city} </span></h3>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Dist : <span style={{fontWeight:"normal"}}>{userData.dist}</span></h3>
                    </div>
                    
                    <div className="d-flex flex-wrap" style={{columnGap:"50px"}}>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>State : <span style={{fontWeight:"normal"}}>{userData.state}</span></h3>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>Pin Code : <span style={{fontWeight:"normal"}}>{userData.pincode}</span></h3>
                        <h3 style={{fontWeight:"bolder",marginTop:"20px",marginBottom:"20px"}}>P.O: <span style={{fontWeight:"normal"}}>{userData.postoff}</span></h3>
                    </div>

                   
                    <span style={{fontSize:"20px", fontWeight:"bolder"}}> First Visit : 01/01/2001</span> <span style={{marginLeft:"40px",marginRight:"40px"}}></span> <span style={{fontSize:"20px", fontWeight:"bolder"}}>Lastest Visit : 01/01/2001</span>
                </div>
                
            </div>
          

         </div>

         <ChangePassword show={passModal} onHide={() =>setPassModal(false)} />
         <EditModal user={userData} show={editModal} onHide={() =>setEditModal(false)} />
         
         </>
    )
}

export default UserPage;