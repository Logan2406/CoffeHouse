import React , {useEffect,useState} from 'react'
import axios from  'axios' 
import {Modal,Button} from 'react-bootstrap'
import './ProductList.css'
import './adprod.css'
import ProductForm from './ProductForm'
import {useNavigate} from 'react-router-dom';

import ProductTable from './ProductTable'
import { ColumnsGap } from 'react-bootstrap-icons'



 
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Add New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm categories={props.categories} hide={props.onHide} />
        </Modal.Body>
        
      </Modal>
    );
  }
  
  




const AllProducts = () =>
{
  const navigate = useNavigate();
  const [curVal,setCurVal] = useState("Biryani");  
 
    
      const [categories,setCategories] =useState([]);

    useEffect(()=>
    {
            
            const getCategories = async() =>
            {
              await axios.get("/product/categories").then(resp=>{setCategories(resp.data)}).catch(err=>console.log(err));
            }

         getCategories(); 
    
    },[])

    const handleCategory = (e) =>
    {
    
          const new_cat = e.target.value;
          console.log(new_cat);
          setCurVal(new_cat);

          switch(new_cat)
          {
            case 'Biryani' : setCurVal("biryani");break;
            case 'IceCream' : setCurVal("icecream");break;
            case 'Rolls' : setCurVal("rolls");break;
            case 'Fries' : setCurVal("fries");break;
            case 'Drinks' : setCurVal("drinks");break;
            case 'Pizzaa' : setCurVal("pizza");break;
            case 'Coffee' : setCurVal("coffee");break;
            case 'Tea' : setCurVal("tea");break;
            case 'all' :setCurVal("all");break;
            default: navigate("/products/b");break;
          }
    }

    const [modalShow, setModalShow] = useState(false);
    

    console.log("I am in AllPRoducts");
    return(
      <div className="admin-prod-div" style={{padding:"30px",width:"1800px"}}>
            <h1 style={{textAlign:"center",paddingBottom:"40px"}}>This is All Products Page</h1>
            <div>
            <div className="d-flex flex-row" style={{columnGap:"40px"}}>
            <h4>Select Category :</h4>
              <select className="form-control mr-sm-2" name="category_id" id="category_id" onChange={handleCategory} style={{flex:2}}>
                          
                          {categories.map((ele)=>{
                                return(
                                    <option value={ele.cat_name}>{ele.cat_name}</option>
                                )
                            })}
              </select>
    
              <Button variant="primary" onClick={() => setModalShow(true)} style={{flex:1}}>
                  Add New Product
              </Button>

              </div>

              <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  categories ={categories}
                  
              />
            <div className='table_list'>

                {curVal && <ProductTable category={curVal}/>}
            </div>
        </div>
      </div>
    )
}

export default AllProducts;