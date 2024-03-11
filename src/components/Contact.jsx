import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Contact() {
    
    return (
        <Container>
            <div className='d-flex flex-column p-4'>
                <h2>Contact Me</h2>
                <p>Below includes the information needed to contact me along with my resume.</p>
            </div>
            <div className='d-flex justify-content-around'>
                <p>Email:</p>
                <p>spyvsspy1113@gmail.com</p>
            </div>
            <Container>
                <Row>
                    <Col>
                        <iframe src='https://drive.google.com/file/d/1u7LRNwOGIrAmvaPx4maS4mhn01xhaFE0/preview' width="100%" height="1000em"/>
                    </Col>

                </Row>
            </Container>
        </Container>
    )
}

export default Contact
