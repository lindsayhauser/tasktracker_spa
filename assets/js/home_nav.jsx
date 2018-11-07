// Home jsx
import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function Home(props) {
    let { root } = props;
    if (root.state.session) {
      return <div className="row my-2">
        <div className="col-9">
          <h1>Welcome to TaskTracker</h1>
        </div>
      </div>
    } else {
      return <div className="row my-2">
      <div className="col-9">
        <h1>Welcome to TaskTracker</h1>
        <p><Link to={"/register"}>Register</Link></p>
      </div>
    </div>
    }
  }