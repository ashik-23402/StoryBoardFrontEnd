import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { Col, Container, Row , Card , CardBody , CardText  } from 'reactstrap'
import Base from '../Components/Base'
import { loadPost } from '../Services/Post-Service'
import { toast } from 'react-toastify'



const PostPage=()=> {

    const{postid} = useParams()

    const [post, setPost] = useState(null)



    useEffect(() => {
        // load post of postId 
        loadPost(postid).then(data => {
            console.log(data);
            setPost(data)

        }).catch(error => {
            console.log(error)
            toast.error("Error in loading post")
        })

    }, [])



    const printDate = (numbers) => {

        return new Date(numbers).toLocaleDateString()
    }




  return (
    <Base>

    <Container className="mt-4">

    <Link to="/">Home</Link> / {post && (<Link to="" >  {post.storyTitle} </Link>)}
    

        <Row>
            <Col md={
                {
                    size:12
                }
            }>

<Card className="mt-3 ps-2 border-0 shadow-sm" >


{
    (post) && (
        <CardBody>
            <CardText> Posted By <b>{post.user.firstname}</b> on <b>{printDate(post.addedDate)} </b> </CardText>

           
            <div className="divder" style={{
                width: '100%',
                height: '1px',
                background: '#e2e2e2'

            }}></div>

            <CardText className="mt-3">
               <h1>{post.storyTitle}</h1>
            </CardText>
            
            <CardText className="mt-5" dangerouslySetInnerHTML={{ __html: post.content }}>

            </CardText>

        </CardBody>
    )
}

</Card>


               

            </Col>
        </Row>
    </Container>
   

    </Base>
  )
}

export default PostPage