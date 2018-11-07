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
import { Provider } from 'react-redux';
import api from './api';
import EditTask from './edit_task'

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    api.fetch_users();
    api.fetch_tasks();
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
            <EditTask root={this} />
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

// function EditTask(props) {
//   let { root, currTask } = props;
//   console.log("=======================")
//   console.log(props)
//   if (currTask) {
//     return <div className="row">
//       <div className="col-12">
//         <br></br>
//         <h2>Edit Task:</h2>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>User Assigned</th>
//               <th>Description</th>
//               <th>Time Hours</th>
//               <th>Time Minutes</th>
//               <th>Completed?</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td><input id="titleBox" defaultValue={task.data.title} /></td>
//               <td><select id="userBox" defaultValue={task.data.user_assigned} >
//                 {root.state.users.map(uu =>
//                   <option key={uu.id} value={uu.id}>{uu.email}</option>
//                 )};</select>
//               </td>
//               <td><input id="descBoc" defaultValue={task.data.desc} /></td>
//               <td><input id="hoursBox" defaultValue={task.data.time_hours} /></td>
//               <td><input id="minutesBox" step="15" type="number" defaultValue={task.data.time_minutes} /></td>
//               <td><input id="completedBox" type="checkbox" defaultChecked={task.data.completed} /></td>
//             </tr>
//           </tbody>
//         </table>
//         <div><Link to={"/tasks"} className="btn btn-primary"
//           onClick={() => { root.saveTask(task.data.id) }}>Save</Link></div>
//       </div>
//     </div>;
//   }
//   else {
//     <Redirect to={"/edittask"} />
//     return <div>
//     </div>;
//   }
// }

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





