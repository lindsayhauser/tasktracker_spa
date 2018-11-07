# TaskTracker

## Design choices:

Example Users in App: http://tasks3.lindsayhauser.com/
  * `alice@example.com` with password `pass1`

UI Design:

Registering Users / Login:
  * When registering a user, you need to input an email and a password
  * Emails are unique - this means you cannot have two users with the same email. If you attempt to do this, the second person who attemps to register with the same email will be prohibited from doing so.
  * When a user has not logged in yet, they are unable to see tasks or users. However, they can log in given the login bar at the top of the page, or they can register on the home page. Once the user has logged in, the registration link disapears and a logout button appears.

Creating Tasks:
  * When creating a new tasks, you can enter the title, description, select a user (from a dropdown) and enter the time hours and minutes spent of the task and then mark the task as completed.
  * When choosing which user to assign the task to, you can only select the users in the dropdown. The users in the dropdown contain all users who have been registered on the site. This means that you cannot assign a task to a user who isn't registered.
  * Any user can assign any other user (including themselves) a task since this version of task tracker does not contain managers.

Showing Users
  * When clicking "Users" tab, a list of users are shown.
  * This list shows whether or not users are admins.

Tasks:
  * Clicking the "Tasks" field shows a list of all the tasks.
  * There is a `Create New Task` that allows you to create a new task, and `Edit` and `Delete` buttons that allow you to configure tasks.
  * Any user can create new tasks and edit and delete existing tasks.

Database:

User
  * A User still has an email, a password hash, an admin flag, and then a password tries and passwords last try field.
  * Emails are unique identifiers and you cannot register two users with the same email - email is a unique key.

Tasks
  * The Tasks table has  a title, description, time_hours and time_minutes that a user spent working on the task, and a completed field.
  * Since users work on tasks, every task is associated with a user through a user_id foreign key.
  * You cannot have a task without a user - when a task is being created, it must be assigned to a user. The user assigned to the task can be changed.
  * The title field is required since you cannot have a task without a title.
  * The title field must be filled out since you cannot have a task without a title.




#
