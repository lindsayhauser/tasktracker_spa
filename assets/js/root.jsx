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

  deleteTask(id) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      alert(id);
    }
  }

  edittask(id) {
    alert(id);
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
            <TaskList root={this} tasks={this.state.tasks} />
          } />
          <Route path="/user" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
          <Route path="/edittask" exact={true} render={() =>
            <UserList root={this} users={this.state.users} />
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
  let { root } = props;
  let rows = _.map(props.tasks, (tt) => <Task key={tt.id} task={tt} root={root} />);
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
  let { task, root } = props;
  return <tr>
    <td hidden={true}>{task.id}</td>
    <td>{task.title}</td>
    <td>{task.user_assigned}</td>
    <td>{task.desc}</td>
    <td>{task.time_hours}</td>
    <td>{task.time_minutes}</td>
    <td>{task.completed ? "yes" : "no"}</td>
    <td><Link to={"/tasks"} onClick={() => { root.deleteTask(task.id) }}>Delete</Link></td>
    <td><Link to={"/register"}>Edit</Link></td>
  </tr>;
}




