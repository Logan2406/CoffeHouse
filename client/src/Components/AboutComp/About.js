import { motion } from 'framer-motion';
import NavBar from '../Nav/Navbar';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card' 
import {Row,Col,Container,Stack} from 'react-bootstrap'
import './about.css'

const About =() =>
{
    console.log("THis is about");
    
    
    return (

            <motion.Container
                    initial={{opacity:0,scale:0}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0,scale:0}}
                    transition={{ duration: 1 }}
                    className="d-flex flex-column" fluid
                >
    
                    <Carousel>
                            <Carousel.Item interval={10000000}>
                                <img
                                className="d-block w-100 corImg"
                                src="product_images\biryani.jpg"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                               
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 corImg"
                                src="product_images\roll.jpg"
                                alt="First slide"
                                />
                            
                            <Carousel.Caption>
                             
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                               className="d-block w-100 corImg"
                                src="product_images\pizza.jpg"
                                alt="First slide"
                                />

                                <Carousel.Caption>
                        
                                </Carousel.Caption>
                            </Carousel.Item>
                    </Carousel>
                    
                    <div className="container-fluid">
                        <div className="page-margin">
                            <Row className="g-4 prodRow">        
                                <Col>
                                    <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                        <img className="prod-icon" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title style={{textAlign:"center"}}>Drinks</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    </Card>
                                </Col>    
                               
                                <Col>
                                
                                    <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                        <img className="prod-icon" variant="top" src="product_icons\icecream.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Ice-Cream</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\Ice_Cream.jpg"/>
                                    </div>
                                    </Card>
                                </Col>    
                                <Col>
                                    <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Fries</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\friesbg.jpg"/>
                                    </div>
                                    </Card>           
                                </Col>    
                                <Col>
                                    <Card className='container prod-card '>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\pizza.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Pizza</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\pizzaburger.jpg"/>
                                    </div>
                                    </Card>
                                </Col>    
                                <Col>            
                                
                                <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\coffee.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Coffee</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\coffeebg.jpg"/>
                                    </div>
                                    </Card>
                                </Col>
                                <Col>
                                <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Tea</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\coffeebg.jpg"/>
                                    </div>
                                    </Card>
                                </Col>  
                                <Col>
                                <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Biryani</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\coffeebg.jpg"/>
                                    </div>
                                    </Card>
                                </Col>                
                                <Col>
                                <Card className='container prod-card'>
                                    <div className='card-image d-flex justify-content-center'>
                                    <img className="prod-icon" variant="top" src="product_icons\drinks.jpg"/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{textAlign:"center"}}>Rolls</Card.Title>
                                        <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                    <div class="overlay">
                                        <img className="bgImage" variant="top" src="images\coffeebg.jpg"/>
                                    </div>
                                    </Card>
                                </Col>                              
                            </Row>
                        </div>
                    </div>

                    <div className='container-fluid d-flex justify-content-center about-service' style={{paddingTop:"100px",marginBottom:"100px",paddingBottom:"100px"}}>
                                <Row className="g-5 service-row">        
                                    <Col className="steps">
                                        <img className="food_steps" src="product_icons\food_order.png"/>
                                        <h6>Choose Your Favourite Food</h6>
                                    </Col>    
                                    <Col className="steps">
                                        <img className="food_steps" src="product_icons\delivery.jpg"/>
                                        <h6>Free And Fast Delivery</h6>
                                    </Col>    
                                    <Col className="steps">
                                        <img className="food_steps" src="product_icons\booktable.jpg"/>  
                                        <h6>Or Reserve a Table</h6>        
                                    </Col>   
                                    <Col className="steps">
                                        <img className="food_steps" src="product_icons\payment.jpg"/> 
                                        <h6>Easy and Secured Payment </h6>            
                                    </Col>  
                                    <Col className="steps">
                                        <img className="food_steps" src="product_icons\enjoy.jpg"/>   
                                        <h6>And Finally, Enjoy Yor Food </h6>        
                                    </Col>   
                                        
                                </Row>
                    </div>
                    <div className="d-flex add-con-div">
                       <div className=" d-flex flex-column address-div">
                            <p>120 College Street,</p>
                            <p></p>
                            <p>Kolkata - 700013</p>
                            <hr style={{width:"80%"}}></hr>
                            <h4>Closed on Tuesdays</h4>
                            <hr style={{width:"80%"}}/>
                            <h2>Timing</h2>
                            <hr style={{width:"100%"}}></hr>
                            <h4>Saturday - Sunday :</h4>
                            <p>10AM - 8PM</p>
                            <h4>Rest of the Days</h4>
                            <p>10AM - 10PM</p>
                            <hr style={{width:"100%"}}></hr>

                       </div> 
                       <div  className=" d-flex flex-column contact-div">
                            <h3 style={{textAlign:"center",fontSize:"40px"}}>Contact Us</h3>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Enter Phone</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone Number"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Your Message</label>
                                <textarea class="form-control" rows={8} id="exampleInputPassword1"/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                       </div>
                    </div>
                    </motion.Container>
    )
}

export default About;