import './css/LandingPage.css'
// import 'bootstrap/dist/css/bootstrap.css';
import Typewriter from 'typewriter-effect';
import { Row, Container, Col, Image } from 'react-bootstrap';
import styled, { keyframes } from "styled-components";
import { bounce, fadeIn, rotateOut} from "react-animations";


import Projects from './projects/Projects';
import Skills from './skills/skills';

import { useThemeContext } from '../contexts/ThemeContext.tsx';
import { Vector3 } from 'three';
import { useState } from 'react';

// <div className='spacer layer-wave'></div>
const Bounce = styled.div`animation: 2s ${keyframes `${bounce}`} `;
const FadeIn = styled.div`animation: 2s ${keyframes `${fadeIn}`}`
const LeftFadeIn = styled.div`animation: 2s ${keyframes `${fadeIn}`}`

function LandingPage(){
    
    return(
        <>
            <Container className="d-flex justify-content-center p-4">
                <Row className="p-3">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <Bounce>
                            <h2>Hello, my name is </h2>
                        </Bounce>
                        <FadeIn>
                            <h1 id="h-100">Breydon Brennan</h1>
                        </FadeIn>

                        <div className='d-flex flex-columns'>
                            <h2>I am</h2>
                            <h2>
                                <Typewriter
                                    options={{
                                        strings: ["a student", "a Network Engineer","a Full-Stack Web Developer"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h2>
                        </div>

                        <p>
                            I am a current junior attending Eastern Illinois University, majoring in Computer Information Technology and minoring in Computer Science. I enjoy working on many programming projects, leading to the reason why I made this page. All my projects showcased on this page were exhilarating, challenging, and overall helpful to my learning experience. I have put in a great amount of time and love into these projects, so feel free to scroll down and check them out!
                        </p>
                    </Col>
                    <Col sm={0} md={6} lg={6} xl={6}>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <LeftFadeIn>
                                <Image
                                    src="img/homepage-people.png"
                                    id='homepage-icon'
                                />
                            </LeftFadeIn>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Projects />
            <Skills />
        </>
    )
}

export default function LandingPageImproved (){
    const { theme, UIErrorEvent } = useThemeContext();
    return(
        <div className = "canvas-container" id = { theme ? 'dark' : 'light' }>
            {/* <Container className='outer'>
                <Container className='d-flex justify-content-around p-4'>
                    <img src='img/chat-bubble-top-left.svg' className='left-chat-bubble'/>
                    <img src='img/chat-bubble-top-left.svg' className='left-chat-bubble'/>
                </Container>
                <img src='img/diverse_people_boy_glasses_skin3.svg' id='profile'/>
            </Container> */}
            <LandingPageCanvas /> 
        </div>
    )
}



const LandingPageCanvas = () => {
    const { BoxGeometry, RenderCanvas, RenderScene } = useThemeContext();
    
    return(
        <RenderCanvas 
            fov = '100'
            position = { new Vector3(-5, 0, -5) }
        >
            <BoxGeometry color = {'#157ACF'} scale = {new Vector3(2, 1.5, 2)}/>
        </RenderCanvas>
        )
        
        
}