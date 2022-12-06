import React from 'react'
import AddPost from '../../Components/AddPost'
import Base from '../../Components/Base'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentUserDetail } from '../../Auth/indix'
import { deletePostService, loadPostUserWise } from '../../Services/Post-Service'
import Post from '../../Components/Post'
import { Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'

const Userdashboard=()=> {


  const [user, setUser] = useState({})

  const [posts, setPosts] = useState([])



  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail())

    loadPostData()
    
    

  }, [])


  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id).then(data => {
      console.log(data)
      setPosts(data)
    })
      .catch(error => {
        console.log(error)
        toast.error("error in loading user posts")
      })
  }

  


    //function to delete post

    function deletePost(post) {
      //going to delete post
      console.log(post)
  
      deletePostService(post.storyId).then(res => {
        console.log(res)
        toast.success("post is deleled..")
        let newPosts = posts.filter(p => p.storyId != post.storyId)
        setPosts(newPosts)
  
      })
        .catch(error => {
          console.log(error)
          // toast.error("error in deleting post")
        })
    }











  return (
    <Base>


      <AddPost/>

      <div className="container-fluid">

      <Row>

         <Col md={
            {
                size: 10,
                offset:1

            }
        }
         >

      {/* <h1 className='my-3'>Posts count :{posts.totalElements}</h1> */}

      {
        posts.contents && posts.contents.map((upost)=>{
          return(
            <Post post={upost} key={upost.storyId} deletePost={deletePost}/>
          )
        })
      }


        </Col>

      </Row>

      </div>
  

      
    </Base>
  )
}

export default Userdashboard