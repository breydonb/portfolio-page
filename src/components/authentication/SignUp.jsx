import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ErrorAlert from '../ErrorHandling/ErrorAlert';
import { FirestoreQueryContext } from '../../contexts/FirestoreContext'


function SignUp() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[fullName, setFullName] = useState('');
    const[userName, setUserName] = useState('');
    const[error, setError] = useState('');
    const[isMatch, setIsMatch] = useState(false);
    const[uid, setUserId] = useState('');

    const { createUser, user, updateUserProfile } = UserAuth();
    const { createUserInformation } = FirestoreQueryContext();
    const navigate = useNavigate()

    const handleConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            await createUser(email, password, fullName);
            navigate('/');
            
        }catch(e){
            setError(e.message);
            console.log(error);
        }
        
    }

    useEffect(() => {
        if(user){
            setUserId(user.uid)
            createUserInformation(fullName, false, "", userName, uid)
            updateUserProfile(fullName, "")
        }
    }, [user, createUserInformation, fullName, userName, uid, updateUserProfile])

    useEffect(() =>{
        if(password === confirmPassword){
            setIsMatch(true);
        }
        else{
            setIsMatch(false);
        }
    }, [password, confirmPassword])


    return (
        <div className='d-flex justify-content-center p-3'>
            <Card style={{ width: '24rem' }} className='d-flex align-items-center justify-content-center'>
                <Card.Body>
                <h2 className='text-center'>Sign Up</h2>
                <p>Already have an account? <Link to="/login" className='underline'>Login</Link> here</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formFullName'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter full name'
                            value={fullName}
                            onChange={(e) => {setFullName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formUserName'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter user name'
                            value={userName}
                            onChange={(e) => {setUserName(e.target.value)}}
                        />
                    </Form.Group>
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
                    <Form.Group className='mb-3' controlId='formConfirmPassword'>
                        <Form.Label>Confirm Your Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm your password'
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                        />
                    </Form.Group>
                    {isMatch ? '' : <div>Passwords must match</div>}
                    <Card.Text>Your information will never be sent to any third-party sites</Card.Text>
                    <Button variant='primary' type='submit' disabled={!isMatch} >Submit</Button>
                    {error ? <ErrorAlert errorMessage={error}/> : ''}
                </Form>
                </Card.Body>
            </Card>
        </div>
    
    )
}

export default SignUp;