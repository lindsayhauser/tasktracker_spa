import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './user_list';
import Header from './header';
import TaskList from './task_list'
import Home from './home_nav'
import Register from './register_user'
import { Provider } from 'react-redux';
import api from './api';
import EditTask from './edit_task'
import NewTask from './new_task'

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
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
            <TaskList />
          } />
          <Route path="/user" exact={true} render={() =>
            <UserList />
          } />
          <Route path="/edittask" exact={true} render={() =>
            <EditTask />
          } />
          <Route path="/newtask" exact={true} render={() =>
            <NewTask />
          } />
          <Route path="/register" exact={true} render={() =>
            <Register />
          } />
        </div>
      </Router>
    </div>;
  }
}
