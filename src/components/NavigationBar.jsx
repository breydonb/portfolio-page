import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav,  NavDropdown } from 'react-bootstrap';
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import './css/NavigationBar.css';
import { useThemeContext } from '../contexts/ThemeContext.tsx';

function NavigationBar() {

    const { user, logout } = UserAuth();
    const [error, setError] = useState('')
    const[title, setTitle] = useState('');
    const navigate = useNavigate();
    const { setTheme } = useThemeContext();

    useEffect(()=>{
        try{
            if(user){
                const title = `Welcome, ${user.displayName}`
                setTitle(title)
            }
        }
        catch(e){
            console.error(e.message)
        }
        
    },[user])

    const handleLogout = async (e) =>{
        try{
            await logout()
            navigate('/')
        }catch(e){
            setError(e.message)
            console.log(error)
        }
        
    }

    const ThemeSwitch = () =>{
        function handleChange(e){
            const { checked } = e.target;
            setTheme(checked);
        }

        return(
            <nav>
                <Navbar.Text>
                    <label className='switch'>
                        <input type='checkbox' onChange={e => handleChange(e)}/>
                        <span className='slider round'></span>
                    </label>
                </Navbar.Text>
            </nav>
        )
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg">
            <Container>
            <Navbar.Brand>Breydon Brennan</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/projects">
                        <Nav.Link>Projects</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blogs">
                        <Nav.Link>Blog Posts</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                {user ?
                    <NavDropdown className="fade-in-title" menuVariant='dark' title={title}>
                        <NavDropdown.Item>
                            <LinkContainer to="/account">
                                <Nav.Link black>Account Settings</Nav.Link>
                            </LinkContainer>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown.Item>
                    </NavDropdown>
                     
                : 
                    <>
                        <LinkContainer to="/signup">
                                <Nav.Link>{user ? '' : "Sign Up"}</Nav.Link>
                        </LinkContainer><LinkContainer to="/login">
                            <Nav.Link>{user ? '' : "Log In"}</Nav.Link>
                        </LinkContainer>
                    </>
                }
                <ThemeSwitch />
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

 

export default NavigationBar