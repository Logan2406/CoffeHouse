import {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Modal,Button} from 'react-bootstrap';
import './booking.css'

function BookTableUser(props) {

    const [isLoading,setIsLoading] = useState(false);
    const [tableNum, setTableNum] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const [phoneError,setPhoneError] = useState("");

    useEffect(()=>
    {
        setTableNum("");
    },[])
    

    const chekPhoneError=()=>
    {
        if(phoneNumber.length<10 || phoneNumber.length>10)
        {
            setPhoneError("Enter a 10 digit Phone Number")
        }
        else
        {
            setPhoneError("");
        }
    }

    const handleInput =(e) =>
    {
        chekPhoneError();
        setPhoneNumber(e.target.value);
       
        
    }

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
        
    async function bookTbl()
        {
            let cat = props.tableCat;
            setIsLoading(true);
            
            const response = await axios.post("http://localhost:4000/admin/getvacant",{category:cat},{headers: 
                                                                                        { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);


            if(response.status===200)
            {
                setTableNum(response.data.tabnum);
                setIsLoading(false);
            }
        }


        async function tablconfirm()
        {
            if(phoneNumber.length<10 || phoneNumber.length>10)
            {
                setPhoneError("Not a Valid Phone number");
               
            }

            else
            {

                const response = await axios.post("http://localhost:4000/admin/settable",{tableNo:tableNum,phnum:phoneNumber},{headers: 
                                                                                            { "Content-Type": "application/json",
                                                                                            "ref_token":reffTok,
                                                                                            "username":usname }}).then(resp=>resp).catch(err=>err);
            

                    if(response.status=200)
                    {
                        props.setReff(prev=>!prev);
                        props.onHide();
                    }
            }
        }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onEnter={()=>{setTableNum("");setPhoneNumber("");setPhoneError("")}}
        onExit={()=>{setTableNum("");setPhoneNumber("");setPhoneError("")}}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book A Table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex flex-column" >
            <div className='d-flex justify-content-between'>
                <h4>Number of People : {props.tableCat}</h4>
                <button className="btn btn-danger" onClick={bookTbl}>Get a Vacant Table</button>
          </div>
            {isLoading?<h1>Loading</h1>:<div className="d-flex justify-content-center align-items-center">
                    <h4>Table No:</h4>
                    <h1>{tableNum}</h1>
                   
                    </div>}
                    <div class="form-group p-2">
                        <label for="exampleInputEmail1">Enter Mobile Number</label>
                        <input type="number" maxLength={10} class="form-control" id="phone" value={phoneNumber} name="phone" onChange={handleInput} onBlur={chekPhoneError} placeholder="Enter Phone No. "/>
                        <small style={{color:"red"}}>{phoneError.length>4?phoneError:""}</small>
                    </div>
          <button className="btn btn-warning" onClick={tablconfirm}>Confirm</button>
          </div>
           
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const BookTable = () =>
{

    const [reff,setReff] = useState(false);
    const [tableModal,setTableModal] = useState(false);
    const [vacant,setVacant] = useState({})
    const [booked,setBooked] = useState({})

    const [users,setUsers] = useState([]);

    const [selectTable,setTableSelect] = useState(0);

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
    
    const removeFromTable=async(id) =>
    {   
        const response = await axios.post("http://localhost:4000/admin/revtable",{tableNo:id},{headers: 
                                                                                    { "Content-Type": "application/json",
                                                                                    "ref_token":reffTok,
                                                                                    "username":usname }}).then(resp=>resp).catch(err=>err);
        if(response.status==200)
        {
            setReff(prev=>!prev);
        }

    }

    useEffect(async()=>{


        const response = await axios.get("http://localhost:4000/admin/tablesinfo",{headers: 
                                                                { "Content-Type": "application/json",
                                                                                        "ref_token":reffTok,
                                                                                        "username":usname }}).then(resp=>resp).catch(err=>err);
        const response2 = await axios.get("http://localhost:4000/admin/tablesbooked",{headers: 
                                                                    { "Content-Type": "application/json",
                                                                                            "ref_token":reffTok,
                                                                                            "username":usname }}).then(resp=>resp).catch(err=>err);

        const response3 = await axios.get("http://localhost:4000/admin/bookedusers",{headers: 
                                                                    { "Content-Type": "application/json",
                                                                                            "ref_token":reffTok,
                                                                                            "username":usname }}).then(resp=>resp).catch(err=>err);
    
    
        
        console.log("I am in Book Table");

        console.log(response.data.data);
        
        if(response.status==200)
        {
            setVacant({...response.data.data})
        }

        if(response2.status==200)
        {
            setBooked({...response2.data.data})
        }

        if(response3.status=200)
        {
            console.log("users : "+JSON.stringify(response3.data.data));
            setUsers([...response3.data.data])

        }

    },[reff])



    

    return(
            <>
         <div className="booktable-div" style={{padding:"30px",width:"1800px"}}>
            <h1 style={{textAlign:"center",paddingBottom:"40px"}}>This is Book Table Page</h1>
            <table className="seatingTable table table-hover table-borderless" style={{border:"none",marginBottom:"80px"}}>

            <thead>
                <tr style={{textAlign:"center"}}>
                    <th >Table Category</th>
                    <th >Vacant Seats</th>
                    <th >Booked Seats</th>
                    <th >Action</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td> <button type="button" class="btn btn-primary" style={{height:"60px",width:"300px"}}>Table for One</button></td>    
                        <td> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.one}</button></td>
                        <td> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{booked.one}</button></td>
                        <td>  <button type="button" class="btn btn-danger" onClick={()=>{setTableModal(true); setTableSelect(1)}} style={{height:"60px",width:"200px",fontWeight:'bold'}}>Book Table</button></td> 
                    </tr> 

                     <tr>
                        <td>   <button type="button" class="btn btn-primary" style={{height:"60px",width:"300px"}}>Table for Two</button> </td>
                        <td>   <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.two}</button></td>
                        <td>  <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{booked.two}</button>  </td>
                        <td>  <button type="button" class="btn btn-danger" onClick={()=>{setTableModal(true); setTableSelect(2)}} style={{height:"60px",width:"200px",fontWeight:'bold'}}>Book Table</button> </td>
                    </tr>
                   
                    <tr>
                        <td>   <button type="button" class="btn btn-primary" style={{height:"60px",width:"300px"}}>Table for Three</button> </td>
                        <td>   <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.four}</button></td>
                        <td>   <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{booked.four}</button>  </td>
                        <td>   <button type="button" class="btn btn-danger" onClick={()=>{setTableModal(true); setTableSelect(4)}} style={{height:"60px",width:"200px",fontWeight:'bold'}}>Book Table</button> </td>
                    </tr>
                   <tr>
                        <td> <button type="button" class="btn btn-primary" style={{height:"60px",width:"300px"}}>Table for Four</button> </td>
                        <td> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.six}</button> </td>
                        <td> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{booked.six}</button> </td>
                        <td> <button type="button" class="btn btn-danger" onClick={()=>{setTableModal(true); setTableSelect(6)}} style={{height:"60px",width:"200px",fontWeight:'bold'}}>Book Table</button></td> 
                    </tr>
                </tbody>
            </table>

            <table class="table bookedtable table-hover table-borderless">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th >Mobile Number</th>
                    <th >Name</th>
                    <th >Table Number</th>
                    <th >Table Category</th>
                    <th >Orderd/Unordered</th>
                    <th >Remove</th>
                </tr>
            </thead>
            <tbody>
            {   users.map((ele,i)=>
                {
                 return(
                    <tr>
                        <td>{ele.u_email}</td>
                        <td>Name</td>
                        <td>{ele.tab_id}</td>
                        <td>{ele.tab_cat}</td>
                        <td>{ele.status}</td>
                        <td><button className="btn btn-danger" onClick={()=>removeFromTable(ele.tab_id)}>Remove</button></td>
                </tr>
                 )   
                })
            
                
            }
            </tbody>
        </table>
            <BookTableUser setReff={setReff} show={tableModal} tableCat={selectTable} onHide={() => setTableModal(false) }/>
        </div>
    </>);
}

export default BookTable;