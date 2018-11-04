use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :task_tracker, TaskTrackerWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :task_tracker, TaskTracker.Repo,
  username: "postgres",
  password: "postgres",
  database: "task_tracker_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
