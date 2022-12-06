
import { myAxios } from "./helper";

export const createPost = (postData) => {
    //   console.log(postData);
    return myAxios
      .post(
        `api/user/${postData.userId}/posts`,
        postData
      )
      .then((response) => response.data);
  };


  //loadallpost
  export const loadAllPosts = (pageNumber,pageSize) => {
    return myAxios
      .get(
        `api/pageStories?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then((response) => response.data);
  };


  //userwis post

  // export const loadPost = (postId) => {
  //   return myAxios.get("api/user/"+postId+"/posts").then((reponse) => reponse.data);
  // };

  export function loadPostUserWise(userId) {
    return myAxios.get(`api/user/${userId}/posts`).then((res) => res.data);
  }


  export const loadPost = (postId) => {
    return myAxios.get("api/posts/" + postId).then((reponse) => reponse.data);
  };


  //delete post
export function deletePostService(postId) {
  return myAxios.delete(`api/posts/${postId}`).then((res) => res.data);
}
  
//update post
export function updatePost(post, postId) {
  console.log(post);
  return myAxios.put(`api/posts/${postId}`, post).then((resp) => resp.data);
}