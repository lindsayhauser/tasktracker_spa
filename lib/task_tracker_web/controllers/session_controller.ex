defmodule TaskTrackerWeb.SessionController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Users.User
  alias TaskTracker.Users

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
