import http from "../http-common";

class DataService {
  get() {
    return http.get("/users");
  }

  getposts(id)
  {
      console.log(id)
      return http.get(`/posts?userId=${id}`)
  }
  gettodos(id)
  {
      console.log(id)
      return http.get(`/todos?userId=${id}`)
  }
  getcomments(id)
  {
      console.log(id)
      return http.get(`/comments?postId=${id}`)
  }

  get_post_details(id)
  {
    return http.get(`/posts/${id}`)
  }

}

export default new DataService();