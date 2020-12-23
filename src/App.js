/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Axios from "./Axios";

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: null,
      shouldUpdate: false
    }

    this.sendData = this.sendData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate) {
      for (var i = 1; i < 3; i++) this.getData();
      console.log("updated!");
      this.setState({shouldUpdate: false});
    }
  }

  getData() {
    const s = [];
    Axios.get("/test-blog-post.json")
        .then(res => {
            for (let e in res.data) {
                s.push({
                    ...res.data[e],
                    eachId: e
                });
            }
        }).then(() => {
            this.setState({data: s});
        })
        .catch(err => {
            alert(err);
        }); 
  }

  sendData(blogIndex) {
    const blogs = this.state.data;
    const cur = blogs.find(e => {
      return e.eachId === blogIndex;
    });

    Axios.post("/final-posts.json", cur)
    .then(res => console.log("Successfully Sent!"))
    .catch(err => alert(err));

    Axios.delete("/test-blog-post/" + blogIndex + ".json");

    this.setState({shouldUpdate: true});

  }

  deleteData(blogIndex) {
    Axios.delete("/test-blog-post/" + blogIndex + ".json");
    this.setState({shouldUpdate: true});
  }

  render() {
    const blogs = this.state.data;
    let mapped;
    if (blogs !== null) {
      mapped = blogs.map((e, i) => {
        return (
          <div className = "posts" key = {e.eachId}>
            <div className = "num">
              {i + 1}
            </div>
            <p>{e.eachId}</p>
            <h1>{e.title}</h1>
            <h4>{e.author}</h4>
            <h6>{e.date}</h6>
            <img src = {e.image} alt = {e.title + "img"} />
            <p>{e.content}</p>
            <div className = "buttons">
              <a className="send" onClick = {() => this.sendData(e.eachId)}>✓</a>
              <a className="sendno" onClick = {() => this.deleteData(e.eachId)}>✕</a>
            </div>
          </div>
        );
      });
    }
    
    return(
      <div>
        <div className = "title">
          <h1>Let's verify some posts!</h1>
        </div>
        {mapped}
      </div>
    );
  }
}

export default App;
