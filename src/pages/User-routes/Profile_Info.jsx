import React from 'react'
import { useContext } from 'react'
import Base from '../../Components/Base'
import userContext from '../../Context/userContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../../Services/User-service'
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap'
import ViewUserProfile from '../../Components/ViewUserProfile'



const Profile_Info=() =>{

  const object = useContext(userContext)

  const [user, setUser] = useState(null)
  const [updateFlag, setUpdateFlag] = useState(false)
  const { userId } = useParams()


  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data })
    })
  }, [])


  const toggleUpdateFlag = (value) => {
    setUpdateFlag(value)
  }

  //show update profile
  const showUpdateProfile = () => {
    toggleUpdateFlag(true)
  }

  //show view profile
  const viewUpdateProflie = () => {
    toggleUpdateFlag(false)
  }

  
  /*  view user profile */
  const userView = () => {
    return (

      <ViewUserProfile updateProfileClick={showUpdateProfile} user={user} />

    )
  }

  const viewUserProfile = () => {
    return (

      <div>
        {user ? userView() : 'Loading user Data...'}
      </div>

    )
  }




    //upate profile
    const updateUserProfile = () => {
      return (
        <div>
          <Card className='mt-2 border-0 rounded-0 shadow-sm'>
            <CardBody>
              <h3 className='text-uppercase'>user Information</h3>
  
              <Container className='text-center'>
                <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={user.image ? user.image : 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top'} alt="user profile picture" className='img-fluid  rounded-circle' />
              </Container>
              <Table responsive striped hover bordered={true} className='text-center mt-5'>
                <tbody>
                  <tr>
                    <td >
                      User Id
                    </td>
                    <td>
                      {user.id}
                    </td>
                  </tr>
                  <tr>
                    <td >
                      First Name
                    </td>
                    <td>
                      <Input type='text' value={user.firstname} />
                    </td>
                  </tr>
                  <tr>
                    <td >
                      Last Name
                    </td>
                    <td>
                      <Input type='text' value={user.lastname} />
                    </td>
                  </tr>
                  <tr>
                    <td >
                      USER EMAIL
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>
                 

                </tbody>
              </Table>
  
  
  
            </CardBody>
            <CardFooter className='text-center'>
              <Button color='success'>Update Profile</Button>
            </CardFooter>
          </Card>
        </div>
      )
    }
  
    //END update profile
  







  return (

    <Base>
    <Row>
      <Col md={{ size: 6, offset: 3 }}>

        <Container>
          {updateFlag ? updateUserProfile() : viewUserProfile()}
        </Container>
      </Col>
    </Row>
  </Base>
  )
}

export default Profile_Info