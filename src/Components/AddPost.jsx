import { useState } from "react"
import { useEffect } from "react"
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap"
import JoditEditor from "jodit-react"
import { useRef } from "react"
import { toast } from "react-toastify"
import { createPost as doCreatePost} from "../Services/Post-Service"
import { getCurrentUserDetail } from "../Auth/indix"


const AddPost = () => {

    const editor = useRef(null)
     const [content,setContent] =useState('')
     const [user, setUser] = useState(undefined)
   
    

    const [post, setPost] = useState({
        storyTitle: '',
        content: '',
       
    })


    
    useEffect(
        () => {

            setUser(getCurrentUserDetail())
           
        },
        []
    )

    


    // const config={
    //     placeholder:"Start typing...",

    // }

   
    

    //field changed function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanaged = (data) => {

        setPost({ ...post, 'content': data })


    }


    //create post function
    const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        if (post.storyTitle.trim() === '') {
            toast.error("post  title is required !!")
            return;
        }

        if (post.content.trim() === '') {
            toast.error("post content is required !!")
            return
        }

       


        //submit the form one server
        post['userId'] = user.id
        doCreatePost(post).then(data => {

            
           console.log(data);

            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                storyTitle: '',
                content: '',
              
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event
   


    return (
        <div className="wrapper">
            <Card className="shadow-sm  border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What going in your mind ?</h3>
                    <h3>Write Your Story Here</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="storytitle" >Post title</Label>
                            <Input
                                type="text"
                                id="storyTitle"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="storyTitle"
                                onChange={fieldChanged}
                                value={post.storyTitle}
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

                                onChange={(newContent) => contentFieldChanaged(newContent)}
                                
                            />
                        </div>

                        {/* file field  */}

                        



                        

                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="success">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>


                    </Form>


                </CardBody>

            </Card>




        </div>
    )
}

export default AddPost