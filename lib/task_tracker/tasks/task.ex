defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :title, :string, null: false
    field :desc, :string
    field :time_hours, :integer
    field :time_mimutes, :integer
    field :completed, :boolean, default: false, null: false

    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title])
    |> validate_required([:title])
  end
end
