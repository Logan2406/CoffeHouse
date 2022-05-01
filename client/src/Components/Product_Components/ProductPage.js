import "./product.css";
import {Container,Carousel} from "react-bootstrap";
import { motion } from 'framer-motion';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { useNavigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Product from './Product';


const ProductPage = (props) =>
{
    let sep="\\";
    let {menu}=useParams(); 
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [catOption,setOption] = useState("");
    const navigate = useNavigate()
    const [changeCat,setChangeCat] = useState(false);

    const [search,setSearch] = useState("");

    const [minVal,setMinVal] = useState();
    const [maxVal,setMaxVal] = useState();

    const [minSearch,setMinSearch] = useState();
    const [maxSearch,setMaxSearch] = useState();

    const [type,setType] = useState("");
  

    const getData = async() =>
    {       
            
            await axios.get("/product/"+menu).then(resp=>{setProducts(resp.data)}).catch(err=>{console.log(err)});
            await axios.get("/product/categories").then(resp=>{setCategories(resp.data)}).catch(err=>console.log(err));
            
            setMinVal(products[0].price);
            setMaxVal(products[0].price);
            let minn = products[0].price;
            let maxx = products[0].price

            for(let i=0;i<products.length;i++)
            {
                if(minn>products[i].price)
                {
                    minn=products[i].price;
                }

                if(maxx<products[i].price)
                {
                    maxx=products[i].price;
                }
            }

            setMinVal(minn);
            setMaxVal(maxx);
            setMinSearch(minn);
            setMaxSearch(maxx);

            switch(menu)
            {
                case "biryani" :setOption("Biryani"); break;
                case "icecream" :setOption("IceCream");break;
                case "rolls" :setOption("Rolls");break;
                case "fries" :setOption("Fries");break;
                case "drinks" :setOption("Drinks");break;
                case "pizza" :setOption("Pizzaa");break;
                case "coffee" :setOption("Coffee");break;
                case "tea" :setOption("Tea");break;
                default :setOption("");break;
            }
            setChangeCat(false);
    
            
    }

    const minMaxHandler =(e) =>
    {
        if(e.target.name==='min-val')
        {
            setMinSearch(e.target.value);
        }
        else
        {
            setMaxSearch(e.target.value);
        }
    }

    useEffect(()=>{
    
        getData();
    },[changeCat]);

    const searchHandler =(e) =>
    {
        setSearch(e.target.value);
    }

    const typeHandler = (e)=>
    {
        if(e.target.value==="Veg")
        {
            setType("Veg");
        }
        else if(e.target.value==='Non Veg')
        {
            setType("NonVeg")
        }
        else{
            setType("")
        }
    }


    function changeCategory(e)
    {
        setChangeCat(false);
        switch (e.target.value)
        {
            case 'Biryani' : navigate("/products/biryani"); break;
            case 'IceCream' : navigate("/products/icecream");break;
            case 'Rolls' : navigate("/products/rolls");break;
            case 'Fries' : navigate("/products/fries");break;
            case 'Drinks' : navigate("/products/drinks");break;
            case 'Pizzaa' : navigate("/products/pizza");break;
            case 'Coffee' : navigate("/products/coffee");break;
            case 'Tea' : navigate("/products/tea");break;
            default: navigate("/products/b");break;

        }
        setChangeCat(true);
    }
    
    return(
        <div style={{minWidth:"100vw",minHeight:"100vh",margin:0,padding:0}}>
                <Carousel style={{maxWidth:"100%"}}>
                            <Carousel.Item interval={1000}>
                                <img
                                className="d-block w-100 corImg"
                                src={sep+"banners"+sep+"biryani-banner.jpg"}
                
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 corImg"
                                src={sep+"banners"+sep+"pizza-banner.jpg"}
                            
                                alt="Second slide"
                                />

                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                               className="d-block w-100 corImg"
                               src={sep+"banners"+sep+"coffee-banner.jpg"}
                    
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                    </Carousel>
                    
                    <div fluid className="d-flex categoryRow flex-row justify-content-around" style={{maxWidth:"100%",columnGap:"30px",padding:"60px",flexWrap:"wrap"}}>
                        <div className="d-flex flex-column align-items-center select-div">
                            <h4>Select Category</h4>
                                <select className="form-select" onChange={changeCategory}>
                                        {categories.map((ele)=>{
                                            return(
                                                <option selected={catOption==ele.cat_name} value={ele.cat_name}>{ele.cat_name}</option>
                                            )
                                        })}

                                </select>
                        </div>
                       
                    <div className="input-div d-flex flex-column">
                        <h4>Search......</h4>
                        <input onChange={searchHandler} value={search} type="text" placeholder="Enter to search the food Item"/>
                    </div>
                    <div className="d-flex flex-column section-div">
                         <h4> Select Your Preference</h4>
                            <select onChange={typeHandler} className="form-select">
                                    <option>-----Select your Option------</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non Veg">Non Veg</option>
                            </select>
                    </div>

                   

                    <div className="price-div d-flex flex-row flex-wrap" style={{columnGap:"20px"}}>
                        <div>   
                                <h4>Min : {minVal}</h4>
                                <input name='min-val' onChange={minMaxHandler} type="text" placeholder={minSearch} style={{fontSize:"28px",padding:"6px",border:"3px solid red"}}/>
                       </div>
                       <div>
                                <h4>Max : {maxVal}</h4>
                                <input  name='max-val' onChange={minMaxHandler} type="text" placeholder={maxSearch} style={{fontSize:"28px",padding:"6px",border:"3px solid red"}}/>
                       </div>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap" style={{margin:0,rowGap:"20px",padding:"50px",columnGap:"20px",boxSizing:"border-box",maxWidth:"100%"}}>
                        { 
                           products.filter(ele=>{if(type){return ele.type==type}else{return ele}}).filter(ele=>ele.prod_name.includes(search)).filter((ele=>ele.price<=maxSearch&&ele.price>=minSearch)).map(ele=>{return(<Product id={ele.prod_id} cat={menu} des={ele.description} catId ={ele.cat_id} price={ele.price} img={ele.image_path} type={ele.type} val={ele.prod_name}/>)})
                        }   

                    </div>


        </div>
    )
}

export default ProductPage;
