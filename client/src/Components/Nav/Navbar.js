import {Navbar,Container,Nav,Modal,Button} from 'react-bootstrap';
import { FcHome,FcAbout,FcTodoList } from "react-icons/fc";
import { GoSignIn} from "react-icons/go";
import { GiCoffeeMug} from "react-icons/gi";
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';

import CartOverlay from '../Cart/CartOverlay';
import {useState,useEffect} from 'react';

import { CartFill } from 'react-bootstrap-icons';
import {GiTable} from 'react-icons/gi'
import {useSelector,useDispatch} from "react-redux";

import "./nav.css";

const  ShowTable = (props) => {
    
    const [vacant,setVacant] = useState({})

        useEffect(async()=>{

            const response = await axios.get("/product/tables",{"headers":{"content-type":"application/json"}}).then(resp=>resp).catch(err=>err);
            
            if(response.status==200)
            {
                setVacant({...response.data.data})
            }
        },[])
        



    return (




      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Tables 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Table Vacancy</h4>
        <div className="d-flex flex-column" style={{rowGap:"20px",padding:"100px"}}>
            <div className="d-flex flex-row justify-content-between">
            <button type="button" class="btn btn-danger" style={{height:"60px",width:"300px"}}>Table for One</button> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.one}</button> 
            </div>
            <div className="d-flex flex-row justify-content-between">
            <button type="button" class="btn btn-danger" style={{height:"60px",width:"300px"}}>Table for Two</button> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.two}</button> 
            </div>
            <div className="d-flex flex-row justify-content-between">
            <button type="button" class="btn btn-danger" style={{height:"60px",width:"300px"}}>Table for Four</button> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.four}</button> 
            </div>
            <div className="d-flex flex-row justify-content-between">
            <button type="button" class="btn btn-danger" style={{height:"60px",width:"300px"}}>Table for Six</button> <button type="button" class="btn btn-warning" style={{height:"60px",width:"100px",fontWeight:'bold'}}>{vacant.six}</button> 
            </div>

        </div>
          
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }






const NavBar =() =>
{
    const cart = useSelector((state)=>state.manageCart);
    const [show,setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () => setShow(true);
    const [showCart,setShowCart] = useState(false);
    const [userName,setUserName] = useState("");
    const [userRole,setUserRole] = useState("");
    const [tableShow, setTableShow] = useState(false);

    useEffect(()=>
    {

        if(Cookies.get('user')!==undefined)
        {
            let user = JSON.parse(Cookies.get('user'));

    
        if(user!==undefined)
        {
            if(user.data.role=='Admin')
            {
                setShowCart(true);
                setUserName("Admin");
                setUserRole("Admin");
            }

            if(user.data.role==='User')
            {
                setShowCart(false);
                setUserName(user.data.user);
                setUserRole("User");
            }
        }
        }
        
    },[]);
   
    

    return(
        <>
            <Navbar  className="mainNav" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand className="d-flex nav-brand" href="#home"><GiCoffeeMug className="navIcons"/>Coffee House</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto nav-main-con">
                            <Link to="/" className="d-flex" ><FcHome className="navIcons"/>Home</Link>
                            <Link to="/about" className="d-flex" ><FcAbout className="navIcons"/>About</Link>
                            <Link to="/loader" className="d-flex" ><FcTodoList className="navIcons"/>Menu</Link>
                        </Nav>
                        <Nav className="ml-auto nav-main-con">
                            {userRole=='Admin'?<Nav.Link className="d-flex" href="/admin"><GoSignIn className="navIcons"/>{userName}</Nav.Link>
                                              :userRole=='User'?<Nav.Link className="d-flex" href="/user"><GoSignIn className="navIcons"/>Hi, {userName}</Nav.Link>
                                              :<Nav.Link className="d-flex" href="/login"><GoSignIn className="navIcons"/>Log In</Nav.Link>}
                            {showCart && <Nav.Link href="#" className="icon-button" onClick={setShow}>
                                     <CartFill/>
                                    <span className="badge badge-danger">{cart.length}</span>Cart
                            </Nav.Link>}
                            <Nav.Link href="#" onClick={()=>setTableShow(true)} className="icon-button">
                                     <GiTable/>Show Tables
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <CartOverlay show={show} handleClose={handleClose}/>
                <ShowTable show={tableShow} onHide={()=>setTableShow(false)}/>
            </Navbar>
</>
    )
}

export default NavBar