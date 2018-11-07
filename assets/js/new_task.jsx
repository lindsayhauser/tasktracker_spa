import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';
import { connect } from 'react-redux';

function NewTask(props) {

    let { users } = props;

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
                            {users.map(uu =>
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
                onClick={() => { api.newTask() }}>Create Task</Link></div>
        </div>
    </div>;
}

export default connect((state) => { return { users: state.users }; })(NewTask);