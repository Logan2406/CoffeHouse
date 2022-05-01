import {useState} from 'react'

import { Container,Row,Col,Button,Card,} from "react-bootstrap";
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import "./maincomp.css"

const MainContent = () =>
{

    const sep="\\";
    const [menu,setMenu] = useState("biryani");
    const [show,setShow] = useState(false);
    const [path,setpath] = useState("product_images"+sep+menu+".jpg")
    const [link,setLink] = useState("/products/biryani");

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
    
    const selectButton= async(item) => {
            setMenu(item);
            console.log("item");
            switch (item)
            {
                case 'biryani' : setLink("/products/biryani"); break;
                case 'ice-cream' : setLink("/products/icecream");break;
                case 'roll' : setLink("/products/rolls");break;
                case 'fries' : setLink("/products/fries");break;
                case 'pastry' : setLink("/products/drinks");break;
                case 'pizza' : setLink("/products/pizza");break;
                case 'coffee' : setLink("/products/coffee");break;
                case 'tea' : setLink("/products/tea");break;
                default: setLink("/products/b");break;

            }
            console.log(link);
            setShow(true);
            await sleep(1000).then(data =>{console.log("hello"); setpath("product_images"+sep+item+".jpg"); setShow(false)});
            
            


    }
    const buttonVariants = {
                                maxi:{
                                    x:30,
                                    scale:1.05
                                 },
                                mini:{scale:1}
                            }

    const imageVariants ={
                            showup:{
                                rotate:-360,
                                scale:1
                            },
                            showdown:{
                                rotate:360,
                                scale:0
                            }

    }                        


    return (
        <Container 
        className="d-flex flex-column main-container" fluid>
            <Row className="mainRow">
                <Col className="d-flex flex-column side-option justify-content-around" style={{color:"white"}}>
                        <motion.Button
                                variants={buttonVariants}
                                animate={ menu=="roll"? "maxi":"mini"} 
                                whileHover={{}}
                                onClick={()=>selectButton("roll")}
                                className="btn menu-option">
                                <p>Roll</p>
                                <img variant="top" className="buttonImg" src="product_images\roll.jpg"/>
                
                        </motion.Button>
                        
                        
                        
                        <motion.Button className="btn menu-option"
                                     variants={buttonVariants}
                                    animate={ menu=="tea"? "maxi":"mini"} 
                                    whileHover={{}}
                    
                                    onClick={()=>selectButton("tea")}
                            >
                        <p>Tea</p>
                        <img variant="top" className="buttonImg" src="product_images\tea.jpg"/>
                        </motion.Button>


                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="fries"? "maxi":"mini"} 
                                whileHover={{ }}

                                onClick={()=>selectButton("fries")}
                                        >
                        <p>Fries</p>
                        <img variant="top" className="buttonImg" src="product_images\fries.jpg"/>
                        </motion.Button>
                        
                        
                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="biryani"? "maxi":"mini"} 
                                whileHover={{}}
                              
                                onClick={()=>selectButton("biryani")}
                                        >
                        <p>Biryani</p>
                        <img variant="top" className="buttonImg" src="product_images\biryani.jpg"/>
                        </motion.Button>
                </Col>




                <Col className="d-flex main-option" style={{color:"black"}}>
                    <Card style={{background:"none",border:"none"}}>    
                        <motion.img 
                                    variants={imageVariants}
                                    initial={{scale:0}}
                                    animate={show?"showdown":"showup"}
                                    transition={{ duration: 1 }}
                        variant="top" className="productImg" src={path}/>
                        <div className="imgoverlay d-flex justify-content-around align-items-center">
                            <div className="d-flex flex-row justify-content-around inoverlay">
                                    <a href={link}><Button>Go to Product Menu</Button></a>
                            </div>
                        </div>

                    </Card>
                </Col>





                <Col className="d-flex flex-column side-option justify-content-around" style={{color:"white"}}>
                        
                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="pizza"? "maxi":"mini"} 
                                whileHover={{ }}
                                
                                onClick={()=>selectButton("pizza")}
                        >
                        <img variant="top" className="buttonImg" src="product_images\pizza.jpg"/>
                        <p>Pizza</p>
                        </motion.Button>
                        
                        
                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="coffee"? "maxi":"mini"} 
                                whileHover={{}}
        
                                onClick={()=>selectButton("coffee")}
                        >
                        <img variant="top" className="buttonImg" src="product_images\coffee.jpg"/>
                        <p>Coffee</p>
                        </motion.Button>
                        
                        
                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="ice-cream"? "maxi":"mini"} 
                                whileHover={{ }}
                                onClick={()=>selectButton("ice-cream")}
                        >
                        <img variant="top" className="buttonImg" src="product_images\ice-cream.jpg"/>
                        <p>Ice Cream</p>
                        </motion.Button>
                        
                        
                        <motion.Button className="btn  menu-option"
                                         variants={buttonVariants}
                                animate={ menu=="pastry"? "maxi":"mini"} 
                                whileHover={{ }}
                                onClick={()=>selectButton("pastry")}
                            >
                        <img variant="top" className="buttonImg" src="product_images\pastry.jpg"/>
                        <p>Drinks</p>
                        </motion.Button>
               </Col>
            </Row>
        </Container>
    )
}

export default MainContent;