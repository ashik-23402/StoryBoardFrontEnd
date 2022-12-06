import React from 'react'
import { Container } from 'reactstrap'
import Base from '../Components/Base'
import NewFeed from '../Components/NewFeed'


const Home=()=> {
  return (
    <Base>

   

    <Container className='mt-3'>

        <NewFeed/>

    </Container>

    </Base>
  )
}

export default Home