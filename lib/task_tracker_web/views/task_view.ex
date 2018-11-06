defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      desc: task.desc,
      time_hours: task.time_hours,
      time_minutes: task.time_minutes,
      completed: task.completed,
      user_assigned: task.user.email
    }
  end
end
