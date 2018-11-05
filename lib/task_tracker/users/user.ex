defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :admin, :boolean, default: false, null: false
    field :email, :string, null: false
    field :password_hash, :string, null: false

    has_many :task, TaskTracker.Tasks.Task # A user has many tasks assigned to them

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :admin])
    |> validate_required([:email, :password_hash, :admin])
  end
end
