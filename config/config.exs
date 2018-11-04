# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :task_tracker,
  ecto_repos: [TaskTracker.Repo]

# Configures the endpoint
config :task_tracker, TaskTrackerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SLpsw14QUd67slZIjnHZG9jMzektoNg7TbegSd8opOjMKBhNxUaAcfOAG1Fmv3aB",
  render_errors: [view: TaskTrackerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TaskTracker.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
