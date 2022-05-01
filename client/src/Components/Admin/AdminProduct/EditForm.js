
//import { useDispatch } from "react-redux";
//import {setProducts} from '../actions/actionProduct'
import {Row,Col,Container,Stack,Form,Button} from 'react-bootstrap'
//const logo = require('C:\\Users\\91943\\Desktop\\reactjs\\NewCoffeeHouse\\server\\images\\image_1645609528236.png')
import React , {useEffect,useState} from 'react'
import axios from  'axios'
import Cookies from 'js-cookie'; 
//import Card from './Card';
//import Button from './Button';
//import classes from './FormModal.module.css';
//import '../Dashboard/Dash.css'

import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { renderMatches } from 'react-router-dom'


const EditForm=(props)=>
{


    //const dispatch = useDispatch();
    const [inputState,setInputState]=useState({product_name:'',price:'',description:''})
    const [error,setError]=useState({})
    
    useEffect(()=>{
        if(props.productDetail!=undefined){
            console.log(props.productDetail)
            setInputState(props.productDetail);         
        }
        },[])

    //const [Error,SetError]=useState([{product_name:'',price:'',description:'',category:''}])

    const validator=(e)=>{
        const name= e.target.id       
        const value=e.target.value
        if(value!=null){
            if(value.trim()==="")
                {
                    setError( prevValues=>({...prevValues,[name]:`${name} is Required!!`}))   
                } 
            else{
                    setError( prevValues=>({...prevValues,[name]:''})) 
                }
        }
    }
    const handlechange=(e)=>{
        
        const name= e.target.id       
        const value=e.target.value
        setTimeout(() => {
            setInputState(values=>({...values,[name]:value}))  
            console.log(inputState)
            validator(e)

        }, 100);

    }
    

    
    const clearProduct=(e)=>{
        const name= e.target.id
         Array.from(e.target).forEach((e) => (e.value = ""));
         setInputState({})
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let usname = JSON.parse(Cookies.get('user')).data.user;
        let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
        
        var id=props.productId
        //console.log(Array.from(inputState).forEach((input) => (input)))
        if((inputState.product_name.trim()==="")||(inputState.price==0)/*||(inputState.description.trim()=="")*/){
            window.alert("please submit all fields!")
        }else{
        
                console.log(inputState)
                await axios.put(`/admin/update/${id}`, {prod:inputState}, {headers: 
                                                                { "Content-Type": "application/json",
                                                                    "ref_token":reffTok,
                                                                    "username":usname }})
                                                                    .then(response=>console.log(response.data)).catch(err=>{console.log(err)})
                //dispatch(setProducts(inputState))
                props.setUpd(true);
                clearProduct(e)
                props.setUpd(false);
                props.hide()

        }  
    }
    
    return(//console.log(inputState),
        
  <div /*style={{margin:250,marginBottom:100}}*/>
   
   <Container className='container form_col'>
     <Row className='row_design'>                   
         <Col className='column_box'>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control style={{border:error["product_name"]?'2px solid red':null}} id="product_name" value={inputState.product_name} onChange={handlechange} type="text" placeholder="Enter email" />
                    {error["product_name"]?<div style={{color:'red'}}>{error["product_name"]}</div>:null}
                </Form.Group>

                <Form.Group className="mb-3 inputStyle" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control style={{border:error["price"]?'2px solid red':null}} id="price" value={inputState.price}  onChange={handlechange} type="number" placeholder="Price" />
                   {error["price"]?<div style={{color:'red'}}>{error["price"]}</div>:null}
                </Form.Group>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{border:error["description"]?'2px solid red':null}} id="description" value={inputState.description} onChange={handlechange} type="text" placeholder="Description" />
                    {error["description"]?<div style={{color:'red'}}>{error["description"]}</div>:null}
                </Form.Group>               
                
                <Button variant="primary" className='inputStyle' type="submit">
                    Submit
                </Button>
            </Form>
            
          </Col>
        </Row>
      </Container>
    </div>
    )

}
export default EditForm;