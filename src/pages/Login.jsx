import React from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../Components/Base'
import {toast} from 'react-toastify';
import { loginUser } from '../Services/User-service';
import { doLogin } from '../Auth/indix';
import { useNavigate } from 'react-router-dom';
import userContext from '../Context/userContext';
import { useContext } from 'react'

const Login=()=> {

  const navigate = useNavigate();

  const userContextData = useContext(userContext)
 

  const[loginDetail,setLoginDetail]=useState({
    username:'',
    password:''


  })



  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };





  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    if(loginDetail.username.trim()==='' || loginDetail.password.trim() ===''){
      toast.error("username or password can not be empty")
      return;
    }

    //submit data to server

    loginUser(loginDetail).then((data)=>{
      console.log("user logged in");
      console.log(data);

      //save the data to local storage
      doLogin(data,()=>{
        console.log("login details saved to local storage");

        userContextData.setUser({
          data:data.user,
          login:true,

        })
        //redirect to dashboard
        // navigate("/user/dashboard")
        navigate("/")
      })




      toast.success("login success")
    }).catch((error)=>{
      console.log("error");
      if(error.response.status === 400 || error.response.status === 404){
        toast(error.response.data.message)
      }
      else{
        toast.error("something went wrong")
      }
    })
   
    }


    const handleReset = () => {
      setLoginDetail({
        username: "",
        password: "",
      });
    };










  return (
    <Base>
    
    <Container>

      <Row className='mt-4'>

          <Col sm={{size:6,offset:3}}>

              <Card color='success' outline={true}>
                  <CardHeader>
                    <h3> Login Here</h3>
                  </CardHeader>

                  <CardBody>
                    <Form onSubmit={handleFormSubmit}>

                        <FormGroup>
                          <Label for='username'>Enter Email</Label>
                          <Input type='text' placeholder='email' id='username'
                           
                           value={loginDetail.username}
                            onChange={(e) => handleChange(e, "username")}

                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for='password'>Enter Password</Label>
                          <Input type='password' placeholder='password' id='password'
                           
                           value={loginDetail.password}
                           onChange={(e) => handleChange(e, "password")}
                          />
                        </FormGroup>

                        <Container className='text-center'>
                          <Button color='success'>Login</Button>
                          <Button onClick={handleReset} color='secondary' className='ms-2'>Reset</Button>
                        </Container>

                    </Form>
                  </CardBody>
              </Card>



          </Col>


      </Row>


    </Container>

    </Base>
  )
}

export default Login