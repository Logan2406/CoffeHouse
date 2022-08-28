import {Modal,Button} from 'react-bootstrap';
import { useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

import "./aduser.css"
const UserTable = () =>
{

  let usname = JSON.parse(Cookies.get('user')).data.user;
  let reffTok = JSON.parse(Cookies.get('user')).data.refToken;


  const [users,setUsers] =useState([])
  
  useEffect(async()=>
  {
    const response = await axios.get("http://localhost:4000/admin/allusers",{headers: 
                                                      { "Content-Type": "application/json",
                                                      "ref_token":reffTok,
                                                      "username":usname }}).then(resp=>resp).catch(err=>err);

    if(response.status==200)
    {
        console.log("USERS" +users);
        setUsers(response.data.data);
    }

  },[])





    return(
        <table className="table table-hover table-borderless admin-user-table">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th >#</th>
                    <th >User_ID</th>
                    <th >Mobile Number</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
            {users.map((ele,i)=>{
              return(
                <tr>
                    <td>{i+1}</td>
                    <td>{ele.u_id}</td>
                    <td>{ele.u_email}</td>
                    <td><button className="btn btn-warning">Details</button></td>
                    <td><button className="btn btn-danger">Remove</button></td>
                </tr>
              )}
            
            )
              
            } 
            </tbody>
        </table>
    )

}

const AddUser = (props)=> {

  const [phoneNumber,setPhoneNumber] = useState("");
  const [userName,setUserName] = useState("");
  let usname = JSON.parse(Cookies.get('user')).data.user;
  let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

  const submitForm = async(e) =>
  { 
      e.preventDefault();
      

      const resp = await axios.post('http://localhost:4000/admin/adduser',{num:phoneNumber},{headers: 
                                                                            { "Content-Type": "application/json",
                                                                                            "ref_token":reffTok,
                                                                                            "username":usname }}).then(resp=>resp).catch(err=>err);

        props.onHide();
  }

  const handleInput = (e) =>
  {
      if(e.target.name==='phone')
      {
        setPhoneNumber(e.target.value);
      }
      else
      {
        setUserName(e.target.value);
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
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitForm}>
              <div class="form-group p-2">
                <label for="exampleInputEmail1">Enter Mobile Number</label>
                <input type="text" class="form-control" id="phone" value={phoneNumber} name="phone" onChange={handleInput} placeholder="Enter Phone No. "/>
              </div>
              <div class="form-group p-2">
                <label for="exampleInputPassword1">Enter Name</label>
                <input type="text" class="form-control" id="username" value={userName} name="username" onChange={handleInput} placeholder="Enter Customer Name"/>
              </div>
              <div className="pt-3 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary">Add User</button>
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const AllUsers = ()=>
{
    const [addUser, setAddUser] = useState(false);

    const handleFilter = () =>
    {


    }
    console.log("I am in AllUser");
    return(<>
        <div className="admin-user-div" style={{padding:"30px",width:"1800px"}}>
            <h1 style={{textAlign:"center",paddingBottom:"40px"}}>This is all users Page</h1>
        <div className="d-flex flex-row justify-content-between" style={{columnGap:"40px"}}>
            <button className='btn btn-primary add-user-btn' onClick={()=>setAddUser(true)} style={{marginTop:"20px",marginBottom:"20px",flex:1}}>Add new User</button>
            <input type="text" placeholder="Enter Mobile Number to Search" style={{marginTop:"20px",marginBottom:"20px",flex:5}} onChange={handleFilter}/>
        </div>
        <UserTable></UserTable>
        </div>
        <AddUser show={addUser} onHide={()=>setAddUser(false)}/>
        </>
    )
}

export default AllUsers;