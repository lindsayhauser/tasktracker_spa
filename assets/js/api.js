import store from './store';

// API calls
class TheServer {

    fetch_users() {
        $.ajax("/api/v1/users", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: "",
          success: (resp) => {
            store.dispatch({
                type: 'USER_LIST',
                data: resp.data
            });
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
            store.dispatch({
                type: 'TASK_LIST',
                data: resp.data,
                // currTask:   ///NOT sure how to get this one to work.
            })
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
            store.dispatch({
                type: 'NEW_SESSION',
                data: resp.data
            })
          }
        });
      }

    endSession() {
        store.dispatch({
            type: 'NEW SESSION',
            data: null
        })
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
                store.dispatch({
                    type: 'UPDATE_CURRENT_TASK',
                    data: task.data
                })
            }
        });
    }
}

export default new TheServer();