import  React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FirestoreQueryContext } from '../../contexts/FirestoreContext';
import { StorageQueryContext } from '../../contexts/StorageContext';


import 'bootstrap/dist/css/bootstrap.css';

import '../../App.css';


function Blog(){
    const { getDocuments, data} = FirestoreQueryContext();
    const { getImages, urlRef } = StorageQueryContext();
    const [isRendering, setRendering] = useState(true)
    const [url, setUrl] = useState([])

    useEffect(() =>{
        try{
            getDocuments("blogs")
            console.log(data)
            if(data.length > 1) {
                getImages()
                console.error(urlRef.current)
                if(urlRef.current.length > 0){
                    setRendering(false)
                }

            }
            
        }
        catch(e){
            console.log(e.message)
        }
    }, [urlRef])

    return(
        <>
            { isRendering ? <BlogLoading /> : <BlogGraphic FirestoreData={data} References={urlRef}/> }
        </>
    )
}

const BlogLoading = () => {
    return(
        <p>Loading</p>
    )
}

const BlogGraphic = ({FirestoreData, References}) => {
    return(
        <Container className='p-3'>
            <Row>
                {FirestoreData.map((blog, index)=>{
                    return(
                        <Col md={4} key={blog.id} className="p-3">
                            <Card>
                                <Card.Img src={References.current[index]}/>
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Text>{blog.desc}</Card.Text>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

function BlogStillDeveloped(){

    return(
        <Container className='p-2'>
            <Row>
                <Col>
                    <p>We're still working on this page</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Blog