import React, {useState} from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext'
import ErrorAlert from '../ErrorHandling/ErrorAlert';
import { FirestoreQueryContext } from '../../contexts/FirestoreContext'
import { useEffect } from 'react';

function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[uid, setUserId] = useState('');
    const navigate = useNavigate();

    const { signin, user, updateUserProfile } = UserAuth();
    const { getUserInformation, displayName, photoURL } = FirestoreQueryContext();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await signin(email, password)
            await updateUserProfile(displayName, photoURL)
            navigate('/')
        }
        catch(e){
            setError(e.message)
        }
    }

    useEffect(() =>{
        if(user && user.uid){
            setUserId(user.uid)
            console.log(uid)
            getUserInformation(uid);
        }
    }, [user, uid, getUserInformation])

    return (
    <div className='d-flex align-items-center justify-content-center p-3'>
        <Card style={{ width: '24rem' }} className='d-flex align-items-center justify-content-center'>
            <Card.Body>
                <Card.Title><h2>Log In</h2></Card.Title>
                <Card.Text>Don't have an account? <Link to="/signup" className='underline'>Sign Up</Link> here</Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formEmailAddress'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Button variant='primary' type='submit' disabled={!password || !email} >Submit</Button>
                </Form>
                {error ? <ErrorAlert errorMessage={error}/> : ''}
            </Card.Body>
        </Card>
    </div>
  )
}

export default Login