import { useEffect,useState} from "react";
import axios from "axios";
import  Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import {Table,Modal,Button} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import EditForm from './EditForm'
const ProductTable = (props) =>
{



    //const [productDetail,setProductDetail]=useState({})
      const [productDetails,setProductDetails]=useState({})
      const [productId,setProductId]=useState(0)
      const [upp,setUpp] = useState(false);
    
      function EditFormShow(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditForm  setUpd={props.setUpd} hide={props.onHide} productDetail={props.productDetail} productId={props.productId}/>
            </Modal.Body>
            
          </Modal>
        );
      }


    const sep="\\";
    const navigate = useNavigate();
    const [showProductState,setShowProductState]=useState([])
    const [modalShowForm, setModalShowForm] = useState(false);


    let category = props.category;
    console.log("I am in Product Table" + category)

    useEffect(async () =>
    {    console.log("I am in Product Table" + category)
            const fetchProduct= async()=>
            {

              let usname = JSON.parse(Cookies.get('user')).data.user;
              let reffTok = JSON.parse(Cookies.get('user')).data.refToken;
              console.log("This is ref Token: "+reffTok);
                const response= await axios.get("http://localhost:4000/admin/getProducts/"+category,{"headers":
                                              {"content-type":"application/json",
                                              "ref_token":reffTok,
                                              "username":usname}}).then(response=>response).catch(err=>err);

                if(response.status===200)
                {
                  const filteredData=response.data.products
                  setShowProductState(filteredData);
                }
                else
                {
                  navigate("/unauthorised")
                }
            }
            fetchProduct();
    
    }
    ,[props.category,upp])


    const detailProduct=(id)=>{
        console.log(id)
        
        //axios.get(`http://localhost:4000/images/detailProducts/${id}`).then(response=>setProductDetail(response.data));
        // setProductDetail(response);  
        const filteredData=showProductState.filter(ele=>ele.prod_id===parseInt(id));       
        console.log(filteredData)   
        const product = {  
            product_name:filteredData[0].prod_name,
            price:filteredData[0].price,
            description:filteredData[0].description, 
        };    
        setProductDetails(product)
        setProductId(filteredData[0].prod_id)
        setModalShowForm(true)  
        
        
}

    return(
        <>
        <EditFormShow
        show={modalShowForm}
        onHide={() => setModalShowForm(false)}
        productDetail={productDetails}
        productId={productId}
        setUpd={setUpp}
    />
        <Table className='table admin-prod-table table-borderless'>
            <thead>
                <tr>                
                    <th style={{textAlign:"center"}}>Image</th>
                    <th style={{textAlign:"center"}}>Product Name</th>
                    <th style={{textAlign:"center"}}>Description</th>
                    <th style={{textAlign:"center"}}>Price</th>
                    <th colSpan={3} style={{textAlign:"center"}}>Action</th>
                    
                </tr>
            </thead>
            <tbody>
       {showProductState && showProductState.map(menu=>{
        return(
           
                <tr>
                    
                    <td><img src={sep+menu.image_path} height="90px" margin="10px" width="90px"/></td>
                    <td>{menu.prod_name}</td>
                    <td>{menu.description}</td>
                    <td>{menu.price}</td>
                    <td><button className='btn btn-primary' onClick={() =>detailProduct(menu.prod_id)}>Edit</button> </td>
                    <td><button className='btn btn-warning' >Details</button> </td>
                    <td><button className='btn btn-danger'>Delete</button> </td>

                    
                </tr>
                
           
            
            
        
        );
    })
    
}
  </tbody>
    </Table>
    </>
    )
}

export default ProductTable;