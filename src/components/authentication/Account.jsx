import React, { useState, useEffect } from 'react'
import { Card, Form, Row, Container, Col } from 'react-bootstrap';
import { ArrowRepeat, PencilSquare } from 'react-bootstrap-icons';
import { UserAuth } from '../../contexts/AuthContext'
import { FirestoreQueryContext } from '../../contexts/FirestoreContext' 


function Account() {
    const { user, updateUserProfile } = UserAuth();
    const { getDocument, displayName, photoURL } = FirestoreQueryContext();
    
    const[email, setEmail] = useState("")
    const[isEditingEmail, setEditEmail] = useState(false);

    const[isEditingPassword, setEditPassword] = useState(false);
    const[uid, setUserId ] = useState("");
    const[name, setName ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditEmail(!isEditingEmail)
        await updateUserProfile(displayName, photoURL)
    }

    useEffect(() =>{
        if(user && user.uid){
            setUserId(user.uid)
            setEmail(user.email);
            try{
                setName(displayName)
            } catch(e){
                console.log(e.message)
            }
        }
        
    },[user, uid, displayName])

    return (
        <Container className='p-3 gap-2'>
            <Row>
                <Col sm={6}>
                    <Card style={{width:'32rem'}} className='d-flex align-items-center justify-content-center'>
                        <Card.Title>
                            <h2>Profile</h2>
                        </Card.Title>

                    </Card> 
                </Col>
                <Col sm={6}>
                    <Card style={{width: '32rem'}} className='d-flex align-items-center justify-content-center'>
                        <Card.Title className='p-2'>
                            <h2>Account Preferences</h2>
                        </Card.Title>
                        <Container>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} className='mb-3' controlId='formEmailAddress'>
                                            <Form.Label column sm={2}>Email: </Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type='email'
                                                    placeholder={email}
                                                    value={email}
                                                    onChange={(e) => {setEmail(e.target.value)}}
                                                    disabled={!isEditingEmail}
                                                />
                                            </Col>
                                            <Col sm={2} className='d-flex justify-content-center align-items-center'>
                                                {
                                                    !isEditingEmail ? 
                                                        <PencilSquare 
                                                            onClick={(() => setEditEmail(!isEditingEmail))}
                                                            cursor={"pointer"}
                                                        /> :
                                                            <><ArrowRepeat
                                                                onClick={(() => setEditEmail(!isEditingEmail))}
                                                                cursor={"pointer"}
                                                            />
                                                        </>
                                                }
                                            </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className='mb-3' controlId='formPassword'>
                                            <Form.Label column sm={3}>Name: </Form.Label>
                                            <Col sm={7}>
                                                <Form.Control
                                                    type='text'
                                                    placeholder={name}
                                                    value={name}
                                                    onChange={(e) => {setName(e.target.value)}}
                                                    disabled={!isEditingPassword}
                                                />
                                            </Col>
                                            <Col sm={2} className='d-flex justify-content-center align-items-center'>
                                                {
                                                    !isEditingPassword ? 
                                                        <PencilSquare 
                                                            onClick={(() => setEditPassword(!isEditingPassword))}
                                                            cursor={"pointer"}
                                                        /> :
                                                        <ArrowRepeat
                                                            onClick={(() => setEditPassword(!isEditingPassword))}
                                                            cursor={"pointer"}
                                                        />
                                                }
                                            </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Container>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Account