import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Spinner from 'react-bootstrap/esm/Spinner'

function LoadingPage() {
  return (
    <Container className='loading'>
    <Spinner animation="grow" />
    </Container>
  )
}

export default LoadingPage