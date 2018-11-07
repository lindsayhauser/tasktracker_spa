import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import UserList from './user_list';
import Header from './header';
import TaskList from './task_list'
import Home from './home_nav'
import Register from './register_user'

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
      currTask: null
    };
    this.fetch_users();
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
        let state1 = _.assign({}, this.state, { tasks: resp.data, currTask: null });
        this.setState(state1);
      }
    });
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ email, password }),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  endSession() {
    let state1 = _.assign({}, this.state, { session: null });
    this.setState(state1);
  }

  create_user(email, password) {
    let text = JSON.stringify({
      user: {
        email: email,
        password: password
      }
    });

    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        this.create_session(email, password)
      }
    });
  }

  saveTask(id) {
    let title = $('#titleBox').val()
    let user = $('#userBox').val()
    let description = $('#descBoc').val()
    let hours = $('#hoursBox').val()
    let min = $('#minutesBox').val()
    let compl = "false"
    if ($('#completedBox').is(":checked")) { compl = "true" }

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
        this.fetch_tasks();
      }
    });
  }

  newTask() {
    let title = $('#titleBox').val()
    let user = $('#userBox').val()
    let description = $('#descBoc').val()
    let hours = $('#hoursBox').val()
    let min = $('#minutesBox').val()
    let compl = "false"
    if ($('#completedBox').is(":checked")) { compl = "true" }

    let text = JSON.stringify({
      task: {
        title: title,
        user_id: user,
        desc: description,
        time_hours: hours,
        time_minutes: min,
        completed: compl
      }
    });

    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        this.fetch_tasks();
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
        success: () => {
          this.fetch_tasks();
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
            <Home root={this} />
          } />
          <Route path="/tasks" exact={true} render={() =>
            <TaskList root={this} tasks={this.state.tasks} />
          } />
          <Route path="/user" exact={true} render={() =>
            <UserList root={this} users={this.state.users} />
          } />
          <Route path="/edittask" exact={true} render={() =>
            <EditTask root={this} task={this.state.currTask} />
          } />
          <Route path="/newtask" exact={true} render={() =>
            <NewTask root={this} />
          } />
          <Route path="/register" exact={true} render={() =>
            <Register root={this} />
          } />
        </div>
      </Router>
    </div>;
  }
}

function EditTask(props) {
  let { root, task } = props;

  if (task) {
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
              <td><input id="minutesBox" step="15" type="number" defaultValue={task.data.time_minutes} /></td>
              <td><input id="completedBox" type="checkbox" defaultChecked={task.data.completed} /></td>
            </tr>
          </tbody>
        </table>
        <div><Link to={"/tasks"} className="btn btn-primary"
          onClick={() => { root.saveTask(task.data.id) }}>Save</Link></div>
      </div>
    </div>;
  }
  else {
    <Redirect to={"/edittask"} />
    return <div>
    </div>;
  }
}

function NewTask(props) {
  let { root } = props;

  return <div className="row">
    <div className="col-12">
      <br></br>
      <h2>Create New Task:</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title (Required)</th>
            <th>User Assigned</th>
            <th>Description</th>
            <th>Time Hours</th>
            <th>Time Minutes</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input id="titleBox" /></td>
            <td><select id="userBox"  >
              {root.state.users.map(uu =>
                <option key={uu.id} value={uu.id}>{uu.email}</option>
              )};</select>
            </td>
            <td><input id="descBoc" /></td>
            <td><input id="hoursBox" /></td>
            <td><input id="minutesBox" step="15" type="number" /></td>
            <td><input id="completedBox" type="checkbox" defaultChecked={false} /></td>
          </tr>
        </tbody>
      </table>
      <div><Link to={"/tasks"} className="btn btn-primary"
          onClick={() => { root.newTask() }}>Create Task</Link></div>
    </div>
  </div>;
}





