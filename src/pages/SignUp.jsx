import React from "react";
import { signUp } from "../Services/User-service";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../Components/Base";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../Context/userContext";
import { doLogin } from "../Auth/indix";

const SignUp = () => {

  const navigate = useNavigate()

  // const userContextData = useContext(userContext)



    


    const [data,setData]=useState({

      firstname:'',
      lastname:'',
      email:'',
      password:''


    })

    const [error, setError] = useState({
      errors:{},
      isError: false,
    })



//handle change 
      const handleChange=(e,fieldName)=>{
        
        setData({...data,[fieldName]:e.target.value})
      }



//reset data
      
     const resetData =()=>{
      setData({
        
      firstname:'',
      lastname:'',
      email:'',
      password:''
      })
     }



     const submitForm=(event)=>{
        event.preventDefault()

        //data validate

        // if(error.isError){
        //   toast.error("Information invalid")
        //   setError({...error,isError:false})
        //   return;
        // }


        //server call api for sending data

        signUp(data).then((resp)=>{
          console.log(resp);
          console.log("success");
      

          toast.success("Registration Successful")

            //redirect to dashboard
            navigate("/login")
         
          
          
          setData({
            firstname:'',
            lastname:'',
            email:'',
            password:''
          })
        }).
        catch((error)=>{

          console.log(error);
          console.log("error log");
          //handling error
          setError({
            errors:error,
            isError:true
          })
        })

     }






  return (
    <Base>
      <Container>

          <Row className="mt-4">

              <Col  sm={{size:6,offset:3}}>
              <Card color="success" outline={true}>
          <CardHeader>
            <h3> Fill Information To Register </h3>
          </CardHeader>

          <CardBody>
            <Form onSubmit={submitForm}>


              <FormGroup>
                <Label for="firstname">Enter First Name</Label>
                <Input type="text" placeholder="Enter here" id="firstname"
                  onChange={(e)=>handleChange(e,'firstname')}
                  value={data.firstname}
                  invalid={error.errors?.response?.data?.firstname ? true:false}
                />

                <FormFeedback>
                  {error.errors?.response?.data?.name}
                </FormFeedback>



              </FormGroup>

              <FormGroup>
                <Label for="lastname">Enter Last Name</Label>
                <Input type="text" placeholder="Enter here" id="lastname"
                onChange={(e)=>handleChange(e,'lastname')} 
                  value={data.lastname}
                  invalid={error.errors?.response?.data?.lastname ? true:false}
                />
                 <FormFeedback>
                  {error.errors?.response?.data?.name}
                </FormFeedback>

              </FormGroup>

              <FormGroup>
                <Label for="email">Enter Email</Label>
                <Input type="text" placeholder="Enter email here" id="email"
                 onChange={(e)=>handleChange(e,'email')}
                  value={data.email}
                  invalid={error.errors?.response?.data?.email ? true:false}
                 />
                  <FormFeedback>
                  {error.errors?.response?.data?.email}
                </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password">Enter Password</Label>
                <Input type="password" placeholder="Enter password here" id="password"
                onChange={(e)=>handleChange(e,'password')}
                value={data.password}
                invalid={error.errors?.response?.data?.password? true:false} />

                <FormFeedback>
                  {error.errors?.response?.data?.email}
                </FormFeedback>
                
              </FormGroup>


              <Container className="text-center">

                  <Button color="success">Register</Button>
                  <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>

              </Container>


            </Form>
          </CardBody>
        </Card>

              </Col>


          </Row>


      </Container>
    </Base>
  );
};

export default SignUp;
