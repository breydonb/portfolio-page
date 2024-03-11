import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/';
import '../../App.css';

import Data from '../data/Skills.json';
import { Col, Container, Row } from 'react-bootstrap';

const skills = () => {
    return (
        <div className='wave-spacer stacked-waves'>
            <div className='d-flex justify-content-center align-items-center'>
                <h2 className='p-4 text-white border-dark'>My Skills</h2>
            </div>
            <Container>
                <Row xs={2} sm={4}>
                {Data.map(skills =>{
                    return(
                        <Col className='d-flex flex-column justify-content-center align-items-center p-2' xs={6} sm={3} >
                            <Row>
                                <Col key={skills.alt}>
                                    <img src={skills.img} alt={skills.alt} width= "100px" height="100px" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className='text-white text-center p-2'>{skills.title}</p>
                                </Col>
                            </Row>
                        </Col>
                    )
                })}
                </Row>
            </Container>
        </div>
    )
}

export default skills
