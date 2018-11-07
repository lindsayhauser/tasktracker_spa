import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import api from './api';
import { connect } from 'react-redux';


function EditTask(props) {

    let { currTask, users } = props;
    if (currTask) {
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
                            <td><input id="titleBox" defaultValue={currTask.title} /></td>
                            <td><select id="userBox" defaultValue={currTask.user_assigned} >
                                {users.map(uu =>
                                    <option key={uu.id} value={uu.id}>{uu.email}</option>
                                )};</select>
                            </td>
                            <td><input id="descBoc" defaultValue={currTask.desc} /></td>
                            <td><input id="hoursBox" defaultValue={currTask.time_hours} /></td>
                            <td><input id="minutesBox" step="15" type="number" defaultValue={currTask.time_minutes} /></td>
                            <td><input id="completedBox" type="checkbox" defaultChecked={currTask.completed} /></td>
                        </tr>
                    </tbody>
                </table>
                <div><Link to={"/tasks"} className="btn btn-primary"
                    onClick={() => { api.saveTask(currTask.id) }}>Save</Link></div>
            </div>
        </div>;
    }
    else {
        <Redirect to={"/edittask"} />
        return <div>
        </div>;
    }
}

export default connect((state) => { return { currTask: state.currTask, session: state.session, users: state.users }; })(EditTask);