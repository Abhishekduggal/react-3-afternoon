import React, { Component } from "react";
import axios from "axios";
import Post from "./Post/Post";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(res => {
      //console.log(res);
      this.setState({ posts: res.data });
    });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(results => {
        console.log(results);
        this.setState({ posts: results.data });
      });
    //console.log(this.state.post);
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    //console.log('Its working')
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    //const { posts } = this.state;
    //console.log(posts);
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {this.state.posts.map(post => {
            //console.log(post)
            return (
              <Post
                key={post.id}
                text={post.text}
                date={post.date}
                updatePostFn={this.updatePost}
                id={post.id}
                deletePostFn={this.deletePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
