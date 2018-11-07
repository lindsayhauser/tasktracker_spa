import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import UserList from './user_list';
import Header from './header';


export default function root_init(node) {
  ReactDOM.render(<Root />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      session: null,
      editTask: null,
      currTask: null
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
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    });
  }

  saveTask(id) {
    alert(id)

    let title = $('#titleBox').val()
    let user = $('#userBox').val()
    let description = $('#descBoc').val()
    let hours = $('#hoursBox').val()
    let min = $('#minutesBox').val()
    let compl = $('#completedBox').val() == "on" ? "true": "false"

    let text = JSON.stringify({
      task: {
        id: id,
        title: title,
        user_id: user,
        desc: description,
        time_hours: hours,
        time_minutes: min,
        completed: compl
      }
    });

    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    });
  }

  deleteTask(id) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      $.ajax("/api/v1/tasks/" + id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: (task) => {
          let state1 = _.assign({}, this.state, { currTask: task });
          this.setState(state1);
        }
      });
    }
  }

  editTask(id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (task) => {
        let state1 = _.assign({}, this.state, { currTask: task });
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
            <TaskList root={this} tasks={this.state.tasks} />
          } />
          <Route path="/user" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
          <Route path="/edittask" exact={true} render={() =>
            <EditTask root={this} task={this.state.currTask} />
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
            <th></th>
            <th></th>
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
    <td><Link to={"/edittask"} className="btn btn-primary" onClick={() => { root.editTask(task.id) }} >Edit</Link></td>
    <td><Link to={"/tasks"} className="btn btn-secondary" onClick={() => { root.deleteTask(task.id) }}>Delete</Link></td>
  </tr>;
}

function EditTask(props) {
  let { root, task } = props;

  if (task) {
    console.log(task);
    console.log(task.data.id)
    console.log(task.data.user_assigned)
    console.log(root.state.users)
    return <div className="row">
      <div className="col-12">
        <br></br>
        <h2>Edit Task:</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>User Assigned</th>
              <th>Description</th>
              <th>Time Hours</th>
              <th>Time Minutes</th>
              <th>Completed?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input id="titleBox" defaultValue={task.data.title} /></td>
              <td><select id="userBox" defaultValue={task.data.user_assigned} >
                {root.state.users.map(uu =>
                  <option key={uu.id} value={uu.id}>{uu.email}</option>
                )};</select>
              </td>
              <td><input id="descBoc" defaultValue={task.data.desc} /></td>
              <td><input id="hoursBox" defaultValue={task.data.time_hours} /></td>
              <td><input id="minutesBox" defaultValue={task.data.time_minutes} /></td>
              <td><input id="completedBox" type="checkbox" defaultChecked={task.data.completed} /></td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => { root.saveTask(task.data.id)}}> Save </button>
      </div>
    </div>;
  }
  else {
    <Redirect to={"/edittask"} />
    return <div>
    </div>;

  }
}




