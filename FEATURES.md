TaskFlow 📝

TaskFlow is a lightweight, browser-based task management app designed for simplicity, speed, and a smooth user experience. It uses localStorage to persist tasks, supports basic CRUD operations, and includes useful utilities like task statistics and export functionality.

🚀 Features
✅ Core Functionality

Add Tasks

Quickly add tasks by clicking the Add button or pressing Enter.

Input validation ensures you can’t add empty tasks.

Edit Tasks

Inline editing via a prompt dialog allows quick updates to task descriptions.

Toggle Task Completion

Mark tasks as complete or revert them to pending state with a single click.

Automatically records the completion timestamp.

Delete Tasks

Remove tasks individually with a confirmation prompt.

Clear All Tasks

Bulk-delete all tasks with one click (includes a safety confirmation).

📊 Task Statistics

Displays:

Total Tasks

Completed Tasks

Pending Tasks

Real-time updates as tasks are added, completed, or deleted.

Includes additional stats via getTaskStats():

Tasks created today

Tasks completed today

🖥️ User Experience

Welcome Message for first-time users.

Keyboard Support (press Enter to add tasks).

Notifications with smooth animations for success, warning, and error messages.

Auto-Focus on the task input when the app loads.
