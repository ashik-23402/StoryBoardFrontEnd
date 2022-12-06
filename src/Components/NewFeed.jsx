import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { deletePostService, loadAllPosts } from '../Services/Post-Service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'


const NewFeed=()=> {



    const [postContent, setPostContent] = useState({
        contents: [],
        totalpages: '',
        totalElements: '',
        pageSize: '',
        islastpage: false,
        pageNumber: ''

    })



    useEffect(()=>{
        changePage(0)
    },[])


    const changePage = (pageNumber=0,pageSize=5)=>{

        if (pageNumber > postContent.pageNumber && postContent.islastpage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return
        }


        loadAllPosts(pageNumber,pageSize).then((data)=>{
           
            setPostContent(data)
            window.scroll(0,0)
            
        }).catch((error)=>{
            console.log(error)
            toast.error("error to load story")
        })
    }

    


    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.storyId).then(res => {
            console.log(res)
            toast.success("post is deleled..")

            let newPostContents = postContent.contents.filter(p => p.storyId != post.storyId)
            setPostContent({ ...postContent, contents: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }



    console.log(postContent);




  return (


    <div className="container-fluid">
    <Row>
        <Col md={
            {
                size: 10,
                offset:1

            }
        }>

            {/* <h1>Blogs Count  ( {postContent?.totalElements} )</h1> */}
            {/* <InfiniteScroll
                dataLength={postContent.content.length}
                next={changePageInfinite}
                hasMore={!postContent.lastPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {
                    postContent.content.map((post, index) => (
                        <Post deletePost={deletePost} post={post} key={index} />
                    ))
                }

            </InfiniteScroll> */}
            {/* <Container className='mt-3'>
                <Pagination size='lg'>
                    <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber == 0}>
                        <PaginationLink previous>
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                    {
                        [...Array(postContent.totalPages)].map((item, index) => (
                            <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                <PaginationLink>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                        <PaginationLink next>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Container> */}

            {
                postContent.contents && postContent.contents.map((upost)=>{
                    return(
                        <Post deletePost={deletePost} post={upost} key={upost.storyId}/>
                    )
                })
            }


            <Container className='mt-3'>
            <Pagination size='lg'>
                <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                    <PaginationLink previous>
                            prev
                    </PaginationLink>
                </PaginationItem>

               {
                [...Array(postContent.totalpages)].map((item,index)=>(
                    <PaginationItem onClick={()=>changePage(index)} active={index == postContent.pageNumber} key={index}>
                        <PaginationLink>
                            {index+1}
                        </PaginationLink>
                    </PaginationItem>
                ))
               }

                <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.islastpage}>
                    <PaginationLink next>
                            next
                    </PaginationLink>
                </PaginationItem>
            </Pagination>

            </Container>


          

           


        </Col>
    </Row>
</div>






    
  )
}

export default NewFeed