// Task jsx
import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


export default function TaskList(props) {
    let { root } = props;
    if (root.state.session) {
      let rows = _.map(props.tasks, (tt) => <Task key={tt.id} task={tt} root={root} />);
      return <div className="row">
        <div className="col-12">
          <br></br>
          <h2>List of Tasks:</h2>
          <div><Link to={"/newtask"} className="btn btn-primary">Create New Task</Link></div>
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
    } else {
      return <div><h3>You Must Login To See Tasks!</h3></div>
    }
  }
  
  function Task(props) {
    let { task, root } = props;
    return <tr>
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
  