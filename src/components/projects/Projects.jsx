import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import React from 'react';

import Data from '../data/Project.json';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PlaceholderImage from "../assets/ph.svg";

// function Projects(){
//     return(
//         <>
//         <div className="album bg-dark">
//         <div className='spacer layer-wave d-block'></div>
//         <div className='spacer layer-peak d-block'></div>
//         <h1 className='text-light text-center position-relative'>My Favorite Projects</h1>
//         <br />
//         <div className='container'>
//             <div className='row'>
//                 {Data.map(project =>{
//                     return(
//                         <div className='col-md-4'>
//                             <div className='card mb-4 box shadow'>
//                                 <img className='card-img-top' src={project.img} alt={project.alt} />
//                                 <div className='card-body'>
//                                     <h5 class="card-title">{project.title}</h5>
//                                     <p className='card-text'>{project.desc}</p>
//                                     <a href={project.link} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">See the Source Code!</a>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//         </div>
//         </>
//     )
// }

const Projects = () =>{
    return(
        <div className="bg-dark">
            <div className='spacer layer-wave d-block'></div>
            <div className='spacer layer-peak d-block'></div> 
            <Container className='p-0'>
                <Row className='p-0 gy-5'>
                {Data.map(project =>{
                    return(
                        <Col className='p-3' sm={4} md={6} lg={6} key={project.title}>
                            <Container className='card'>
                                <Row className='p-2 rounded'>
                                    <img src={PlaceholderImage} />
                                </Row>
                                <Row className='p-3 w-100'>
                                    <Col xs={10} sm={8} md={10} lg={10} xl={11} className="p-0">
                                        <h3 className='mb-0'>{project.title}</h3>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2} xl={1} className="position-relative p-0 d-flex justify-content-center">
                                        <img className="position-absolute" src={project.img1} width={"25px"} height={"100%"} id="first-svg" alt="logo one"/>
                                        <img className="position-absolute" src={project.img2} width={"25px"} height={"100%"} id="second-svg" alt="logo two"/>
                                        <img className="position-absolute" src={project.img1} width={"25px"} height={"100%"} id="third-svg" alt="logo three"/>
                                    </Col>
                                    <p className='p-0'>{project.desc}</p>
                                    <Button>Check this Project Out!</Button>
                                </Row>
                            </Container>
                            
                        </Col>
                    )
                })}
                </Row>
            </Container>
        </div>
    )
}

export default Projects