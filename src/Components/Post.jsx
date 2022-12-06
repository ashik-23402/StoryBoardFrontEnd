import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../Auth/indix'
import userContext from '../Context/userContext';
import { useContext } from 'react'


const Post=({ post = {storyId: -1, storyTitle: "This is default post title", content: "This is default post content" },deletePost})=> {

  const userContextData = useContext(userContext)
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
}, [])


  return (
        <Card className='border-0 shadow-sm mb-3 mt-3'>
            <CardBody>
                <h1>{post.storyTitle}</h1>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,250)+"...."}}>
                
                </CardText>
                <div>
                   <Link className='btn btn-primary' to={'/post/'+post.storyId}>Read More</Link>

                      {
                        userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={(event) => deletePost(post)} color='danger' className='ms-2'>Delete</Button>:'' )
                        
                      }
                      {
                        userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.storyId}`} color='warning' className='ms-2'>Update</Button>:'' )
                        
                      }
                   
                </div>
            </CardBody>
        </Card>
  )
}

export default Post