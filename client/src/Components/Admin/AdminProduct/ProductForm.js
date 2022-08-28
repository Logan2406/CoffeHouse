import {Row,Col,Container,Form,Button} from 'react-bootstrap'
//const logo = require('C:\\Users\\91943\\Desktop\\reactjs\\NewCoffeeHouse\\server\\images\\image_1645609528236.png')
import React , {useEffect,useState} from 'react'
import axios from  'axios' 

import Cookies from "js-cookie";



const ProductForm=(props)=>
{
    //const dispatch = useDispatch();
    const [inputState,setInputState]=useState({product_name:'',price:'',description:'',category_id:'Biryani'})
    const [showProductState,setShowProductState]=useState([])
    const [error,setError]=useState({})
    const [file, setFile] = useState("");

    let usname = JSON.parse(Cookies.get('user')).data.user;
    let reffTok = JSON.parse(Cookies.get('user')).data.refToken;

    useEffect(()=>{
        /*if(props.productDetail!={}){
            setInputState((preValues) => [
                ...preValues,
                {
                product_name:props.productDetail.prod_name,
                price:props.productDetail.price,
                description:props.productDetail.description,
                category_id:props.productDetail.description

                }
            ]);
           
          
        }*/
        },[])

    //const [Error,SetError]=useState([{product_name:'',price:'',description:'',category:''}])

    const validator=(e)=>{
        const name= e.target.id       
        const value=e.target.value
        if(value.trim()==="")
            {
                setError( prevValues=>({...prevValues,name:`${name} is Required!!`}))   
            } 
            else{
                setError( prevValues=>({...prevValues,name:''})) 
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
    

    // Handles file upload event and updates state
    function handleUpload(event) {
      setFile(event.target.files[0]);
    }
    //const isError =  === ''
    const clearProduct=(e)=>{
        const name= e.target.id
         Array.from(e.target).forEach((e) => (e.value = ""));
         //Array.from(inputState).forEach((input) => setInputState(input,values=>({...values,input:""})));
         setInputState({})
    }

    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //console.log(Array.from(inputState).forEach((input) => (input)))
        if((inputState.product_name.trim()=="")||(inputState.price.trim()==0)||(inputState.description.trim()=="")||(inputState.category_id.trim()=="default_option")){
            window.alert("please submit all fields!")
        }else{
        
                console.log(inputState)
                var formdata = new FormData(); 
                formdata.append('image',file);
                console.log("This is the file" +file.size);
                //var objArr = [];
                
                //objArr.push(inputState);
                //console.log(objArr)
                //JSON obj
                formdata.append('objArr',JSON.stringify(inputState))


                //formdata.append('price',inputState.price);
                console.log("This is Object Data "+formdata.get('objArr'))
                console.log("This is form Data :"+formdata)

                await axios.post("http://localhost:4000/admin/addproduct",formdata, {headers:
                                                                    {"Content-Type":"multipart/form-data",
                                                                    "ref_token":reffTok,
                                                                    "username":usname}} ).then(response=>console.log(response.data))
                                                                    .catch(err=>{console.log(err)})
                //dispatch(setProducts(inputState))
                clearProduct(e)
                props.hide()

        }  
    }
    return(console.log(error),
   
   <Container className='container-fluid form_col'>
     <Row className='row_design'>                   
         <Col className='column_box'>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control style={{border:error["product_name"]?'2px solid red':null}} id="product_name"  onChange={handlechange} type="text" placeholder="Enter email" />
                    {error["product_name"]?<div style={{color:'red'}}>{error["product_name"]}</div>:null}
                </Form.Group>

                <Form.Group className="mb-3 inputStyle" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control style={{border:error["price"]?'2px solid red':null}} id="price"  onChange={handlechange} type="number" placeholder="Price" />
                   {error["price"]?<div style={{color:'red'}}>{error["price"]}</div>:null}
                </Form.Group>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{border:error["description"]?'2px solid red':null}} id="description"  onChange={handlechange} type="text" placeholder="Description" />
                    {error["description"]?<div style={{color:'red'}}>{error["description"]}</div>:null}
                </Form.Group>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Category</Form.Label>
                    <Form.Select id="category_id" style={{border:error["category_id"]?'2px solid red':null}} onChange={handlechange} >
                    {props.categories.map((ele)=>{
                                return(
                                    <option value={ele.cat_name}>{ele.cat_name}</option>
                                )
                            })}
                    </Form.Select>
                    {error["category_id"]?<div style={{color:'red'}}>{error["category_id"]}</div>:null}
                </Form.Group>
                <Form.Group className="mb-3 inputStyle">
                    <Form.Label>Image Upload</Form.Label>
                    <Form.Control id="image" onChange={handleUpload} type="file"  />
                    <p>Filename: {file.name}</p>
                        <p>File type: {file.type}</p>
                        <p>File size: {file.size} bytes</p>
                        {file && <ImageThumb image={file} />}
                </Form.Group>
                

                
                <Button variant="primary" className='inputStyle' type="submit">
                    Submit
                </Button>
            </Form>
            
          </Col>
        </Row>
      </Container>
    )

}
const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} width="100px" height="100px"/>;
  };
export default ProductForm;