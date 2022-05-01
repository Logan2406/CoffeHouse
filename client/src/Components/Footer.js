import { Container,Row,Col } from "react-bootstrap"
import {BsLinkedin} from "react-icons/bs"
import Cookies from "js-cookie"

const Footer =() =>
{
        return(
            <footer className="footer">
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-start">footer section 1 {Cookies.get('demo')}</Col>
                        <Col className="d-flex flex-column align-items-center justify-content-center"><div className="d-flex"><BsLinkedin/>Jyoti Pravo Pal</div>
                                                                                                      <div className="d-flex"><BsLinkedin/>Jyoti Pravo Pal</div>                                                                      
                        </Col>
                        <Col className="d-flex flex-row-reverse">
                
                             <div class="input-group-lg input-group mb-3 d-flex justify-content-between">
                                <input type="text" class="form-control m-2" placeholder="Enter your e-mail address" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <div class="input-group-append d-flex">
                                        <button class="btn btn-success m-2" type="button" id="button-addon2"> <b>Submit</b></button>
                                </div>
                            </div>
                        </Col>
                </Row>
            </Container>
            </footer>
        )
}

export default Footer