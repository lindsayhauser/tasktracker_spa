import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './user_list';
import Header from './header';

export default function root_init(node) {
  // let tasks = window.tasks;
  // let users = window.users;

  ReactDOM.render(<Root />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      session: null,
    };
    this.fetch_users();
    this.fetch_tasks();
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    });
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        console.log(resp)
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} />
          <Route path="/" exact={true} render={() =>
            <Home />
          } />
          <Route path="/tasks" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/user" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}



function Home(_props) {
  return <div className="row my-2">
    <div className="col-9">
      <h1>Welcome to TaskTracker</h1>
    </div>
    <div className="col-2">
      <p><Link to={"/register"}>Register</Link></p>
    </div>
  </div>
}

function TaskList(props) {
  // console.log("++++++++++++++++++++++++++++=")
  // console.log(props.tasks)
  let rows = _.map(props.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return <div className="row">
    <div className="col-12">
      <br></br>
      List of Tasks:
        <table className="table table-striped">
        <thead>
          <tr>
            <th hidden={true}>ID</th>
            <th>Title</th>
            <th>User Assigned</th>
            <th>Description</th>
            <th>Time Hours</th>
            <th>Time Minutes</th>
            <th>Completed?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function Task(props) {
  let { task } = props;

  return <tr>
    <td hidden={true}>{task.id}</td>
    <td>{task.title}</td>
    <td>{task.user_assigned}</td>
    <td>{task.desc}</td>
    <td>{task.time_hours}</td>
    <td>{task.time_minutes}</td>
    <td>{task.completed ? "yes" : "no"}</td>
    <td><button onClick={() => {alert(task.id)}}>Delete</button></td>
    <td><button onClick={() => {alert(task.id)}}>Edit</button></td>
  </tr>;
}



