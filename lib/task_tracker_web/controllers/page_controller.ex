defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    tasks = TaskTracker.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :time_hours, :time_minutes,
      :completed, :user])))
# need to add user
    users = TaskTracker.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :email])))

    render(conn, "index.html", tasks: tasks, users: users)
  end
end
