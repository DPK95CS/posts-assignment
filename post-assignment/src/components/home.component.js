import React, { Component } from "react";
import DataService from "../services/post.service";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.get_posts_data = this.get_posts_data.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getComments = this.getComments.bind(this);

    this.state = {
      Users: [],
      currentUser: null,
      currentIndex: -1,
      todos: 0,
      posts: 0,
      comments :0,
      posts_data : [],
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    DataService.get()
      .then(response => {
        this.setState({
          Users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
getComments(data)
{
    console.log(data)
    data.map( post => (
        DataService.getcomments(post.id)
    .then(response => {
      console.log(response.data.length);
      this.setState({
          comments : response.data.length
    });
    })
    .catch(e => {
      console.log(e);
    })
    ))
    
}

  setActiveUser(User, index) {
      console.log(User.id)
      DataService.getposts(User.id)
      .then(response => {
        console.log(response.data);
        this.getComments(response.data);
        this.setState({
                posts : response.data.length,
                posts_data : response.data,
          });
      })
      .catch(e => {
        console.log(e);
      });
      DataService.gettodos(User.id)
      .then(response => {
        console.log(response.data);
        this.setState({
            todos : response.data.length
      });
      })
      .catch(e => {
        console.log(e);
      });

    this.setState({
      currentUser: User,
      currentIndex: index
    });

  }


  get_posts_data(id) {
      console.log("xdg")
      console.log(id)
    DataService.get_post_details(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onDelete(id)
  {
      console.log("del")
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      }).then(response =>
      {
          console.log(response)
      }).catch(e => {
          console.log(e);
      })
  }
  render() {
    const { Users, currentUser, currentIndex ,posts,comments,todos,posts_data} = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>User List</h4>

          <ul className="list-group">
            {Users &&
              Users.map((User, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(User, index)}
                  key={index}
                >
                  {User.name}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>COUNT</h4>
              <div>
                <label>
                  <strong>Post:</strong>
                </label>{" "}
                {posts}
                {posts_data.map((post, index) => (
                <li
                  key={index}
                >
                  {post.title}

          <Link
                to={"/get_posts/"+post.id}
                className="badge badge-warning"
              >
                GET
              </Link>
                    <button onClick={()=>this.onDelete(post.id) }> DELETE </button>
                </li>
              ))}
              </div>
              <div>
                <label>
                  <strong>Comment:</strong>
                </label>{" "}
                {comments}
              </div>
              <div>
                <label>
                  <strong>Todo:</strong>
                </label>{" "}
                {todos}
              </div>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a user...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}