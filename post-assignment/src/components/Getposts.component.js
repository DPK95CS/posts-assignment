import React, { Component } from "react";
import DataService from "../services/post.service";

export default class Posts extends Component 
{
  constructor(props) {
    super(props);

    this.getpostdata = this.getpostdata.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.changeBody = this.changeBody.bind(this);

    this.state = {
      posts: [],
      posts_data : [],
      body : "",
    };
}

  componentDidMount() {
        console.log(this.props.match.params.id);
        this.getpostdata(this.props.match.params.id);
      }

      getpostdata(id) {
        DataService.get_post_details(id)
          .then(response => {
            this.setState({
              posts: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      onChangeBody(e) {
        const body = e.target.value;
        console.log(body)
        this.setState({
          body: body
        });

      }

      changeBody(body,id)
      {
          console.log(id)
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                body: body,
                id :id,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },  
          })
            .then((response) => response.json())
            .then((json) => console.log(json))
      }

  
  render() {
    const {posts,body} = this.state;
    return (
        <div>
        <h1>{posts.title}</h1>  
        <h2>{posts.body}</h2>
    <div>
    <input
              type="text"
              className="form-control"
              placeholder="Enter body"
              value={body}
              onChange={this.onChangeBody}
            />
        <button onClick={() => this.changeBody(body,posts.id)}>UPDATE BODY </button>
        </div>
        </div>
    );
}
}
