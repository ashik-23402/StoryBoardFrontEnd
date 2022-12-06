import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap"
import JoditEditor from "jodit-react"
import { useRef } from "react"
import userContext from '../Context/userContext'
import { loadPost, updatePost } from '../Services/Post-Service'
import Base from '../Components/Base'


function UpdateBlog() {

    


    const editor = useRef(null)

    

   

    const { blogId } = useParams()
    const object = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)


    useEffect(() => {

        
      

        // load the blog from database
        loadPost(blogId).then(data => {
            console.log(data)
            setPost({ ...data })
        })
            .catch(error => {
                console.log(error);
                toast.error("error in loading the blog")
            })
    }, [])


    useEffect(() => {
        console.log("first")
        if (post) {
            if (post.user.id != object.user.data.id) {
                toast.error("This is not your post !!")
                navigate("/")
            }

        }

    }, [post])


    const handleChange = (event, fieldName) => {

        setPost({
            ...post,
            [fieldName]: event.target.value
        })

    }


    

    const doupdatePost = (event) => {
        event.preventDefault()
        console.log(post)
        updatePost({ ...post }, post.storyId)
            .then(res => {
                console.log(res)
                toast.success("Post updated")
                navigate("/user/dashboard")
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in upading post")
            })

    }




    const updateHtml = () => {
        return (

            <div className="wrapper">

                <Card className="shadow-sm  border-0 mt-2">
                    <CardBody>

                        <h3>Update post from here !!</h3>
                        <Form onSubmit={doupdatePost} >
                            <div className="my-3">
                                <Label for="storyTitle" >Post title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter here"
                                    className="rounded-0"
                                    name="storyTitle"
                                    value={post.storyTitle}
                                    onChange={(event) => handleChange(event, 'storyTitle')}
                                />
                            </div>

                            <div className="my-3">
                                <Label for="content" >Post Content</Label>
                                {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: '300px' }}
                            /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={newContent => setPost({ ...post, content: newContent })}
                                />
                            </div>

                            {/* file field  */}

                           



                          



                            <Container className="text-center">
                                <Button type="submit" className="rounded-0" color="primary">Update  Post</Button>
                                <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                            </Container>


                        </Form>


                    </CardBody>

                </Card>




            </div>
        )
    }


  return (

    <Base>
    
    <Container>

        {post && updateHtml()}


    </Container>


  </Base>

  )
}

export default UpdateBlog