import React from 'react';
import { Github, Linkedin, StackOverflow } from 'react-bootstrap-icons';

function Footer(){
    return(
        <div className='p-3'>
            <div className='d-flex justify-content-center '>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a href='https://www.github.com/breydonb/breydonb' className='nav-link' rel="noreferrer" target='_blank'>
                            <Github />
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href='https://www.linkedin.com/in/breydon-brennan-833598185/' className='nav-link' rel="noreferrer" target='_blank'>
                            <Linkedin />
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href='https://stackoverflow.com/users/17776768/breydonb' className='nav-link' rel="noreferrer" target='_blank'>
                            <StackOverflow/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;