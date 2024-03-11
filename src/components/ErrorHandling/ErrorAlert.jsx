import React from 'react'
import { Alert } from 'react-bootstrap'

function ErrorAlert(props){
  return (
    <Alert variant='warning' dismissible>
        <Alert.Heading>Uh oh! We encountered an error </Alert.Heading>
        <p>Error: {props.errorMessage}</p>
    </Alert>
  )
}

export default ErrorAlert