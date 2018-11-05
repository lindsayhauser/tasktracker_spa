import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
  let tasks = window.tasks;
  console.log(tasks)
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
  }

  render() {
    return <div>
              <p>testing this out</p>  
              <TaskList tasks={this.state.tasks} />
          </div>
    }
  }

function TaskList(props) {
  console.log(props.tasks)
    let rows = _.map(props.tasks, (tt) => <Task key={tt.id} title={tt.title} />);
    return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>title</th>
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
    console.log(props)
    let {task} = props;
    return <tr>
      <td>{task.title}</td>
    </tr>;
  }
