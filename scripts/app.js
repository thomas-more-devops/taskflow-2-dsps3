class TaskFlow {
    constructor() {
        try {
            // Load tasks and initialize task ID counter
            this.tasks = this.loadTasks();
            this.taskIdCounter = this.getNextTaskId();

            // Initialize app, bind events, and render UI
            this.initializeApp();
            this.bindEvents();
            this.renderTasks();
            this.updateStats();
        } catch (error) {
            console.error('Failed to initialize TaskFlow:', error);
            this.showNotification('Error initializing the app. Please refresh the page.', 'error');
        }
    }

    /**
     * Logs a message to indicate app is ready
     */
    initializeApp() {
        console.log('TaskFlow initialized successfully!');
        this.showWelcomeMessage();
    }

    /**
     * Displays a welcome message in console if no tasks exist
     */
    showWelcomeMessage() {
        if (this.tasks.length === 0) {
            console.log('Welcome to TaskFlow! Add your first task to get started.');
        }
    }

    /**
     * Binds UI event listeners for buttons and inputs
     */
    bindEvents() {
        try {
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskInput = document.getElementById('taskInput');

            if (!addTaskBtn || !taskInput) {
                console.warn('TaskFlow: Could not bind events. Missing DOM elements.');
                return;
            }

            addTaskBtn.addEventListener('click', () => this.addTask());
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTask();
                }
            });

            // Focus on input when page loads
            taskInput.focus();
        } catch (error) {
            console.error('Failed to bind events:', error);
            this.showNotification('Error binding UI events.', 'error');
        }
    }

    /**
     * Adds a new task to the list
     */
    addTask() {
        try {
            const taskInput = document.getElementById('taskInput');
            if (!taskInput) throw new Error('Task input element not found.');

            const taskText = taskInput.value.trim();
            if (taskText === '') {
                this.showNotification('Please enter a task description', 'warning');
                taskInput.focus();
                return;
            }

            const newTask = {
                id: this.taskIdCounter++,
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            };

            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();

            // Clear input after adding task
            taskInput.value = '';
            taskInput.focus();

            this.showNotification('Task added successfully!', 'success');
        } catch (error) {
            console.error('Failed to add task:', error);
            this.showNotification('Error adding task.', 'error');
        }
    }

    /**
     * Deletes a task by ID
     */
    deleteTask(taskId) {
        try {
            if (confirm('Are you sure you want to delete this task?')) {
                this.tasks = this.tasks.filter(task => task.id !== taskId);
                this.saveTasks();
                this.renderTasks();
                this.updateStats();
                this.showNotification('Task deleted successfully!', 'success');
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
            this.showNotification('Error deleting task.', 'error');
        }
    }

    /**
     * Toggles task completion state
     */
    toggleTask(taskId) {
        try {
            const task = this.tasks.find(task => task.id === taskId);
            if (!task) throw new Error(`Task with ID ${taskId} not found.`);

            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;

            this.saveTasks();
            this.renderTasks();
            this.updateStats();

            const message = task.completed ? 'Task completed! 🎉' : 'Task marked as pending';
            this.showNotification(message, 'success');
        } catch (error) {
            console.error('Failed to toggle task:', error);
            this.showNotification('Error updating task status.', 'error');
        }
    }

    /**
     * Edits a task's text
     */
    editTask(taskId) {
        try {
            const task = this.tasks.find(task => task.id === taskId);
            if (!task) throw new Error(`Task with ID ${taskId} not found.`);

            const newText = prompt('Edit task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                this.saveTasks();
                this.renderTasks();
                this.showNotification('Task updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Failed to edit task:', error);
            this.showNotification('Error editing task.', 'error');
        }
    }

    /**
     * Renders tasks in the UI
     */
    renderTasks() {
        try {
            const tasksList = document.getElementById('tasksList');
            const emptyState = document.getElementById('emptyState');

            if (!tasksList || !emptyState) throw new Error('Missing tasksList or emptyState element.');

            if (this.tasks.length === 0) {
                tasksList.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            tasksList.style.display = 'flex';
            emptyState.style.display = 'none';

            // Sort tasks: incomplete first, then newest first
            const sortedTasks = [...this.tasks].sort((a, b) => {
                if (a.completed !== b.completed) return a.completed - b.completed;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            tasksList.innerHTML = sortedTasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    <div class="task-content">
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                             onclick="taskFlow.toggleTask(${task.id})"></div>
                        <span class="task-text">${this.escapeHtml(task.text)}</span>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit-btn" onclick="taskFlow.editTask(${task.id})" title="Edit task">
                            ✏️
                        </button>
                        <button class="task-btn delete-btn" onclick="taskFlow.deleteTask(${task.id})" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Failed to render tasks:', error);
            this.showNotification('Error displaying tasks.', 'error');
        }
    }

    /**
     * Updates task statistics in the UI
     */
    updateStats() {
        try {
            const totalTasks = this.tasks.length;
            const completedTasks = this.tasks.filter(task => task.completed).length;
            const pendingTasks = totalTasks - completedTasks;

            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
            document.getElementById('pendingTasks').textContent = pendingTasks;

            // Update header task count
            const taskCount = document.getElementById('taskCount');
            if (taskCount) {
                taskCount.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
            }
        } catch (error) {
            console.error('Failed to update stats:', error);
        }
    }

    /**
     * Saves tasks to localStorage
     */
    saveTasks() {
        try {
            localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
            localStorage.setItem('taskflow_counter', this.taskIdCounter.toString());
        } catch (error) {
            console.error('Failed to save tasks:', error);
            this.showNotification('Failed to save tasks. Check browser storage.', 'error');
        }
    }

    /**
     * Loads tasks from localStorage
     */
    loadTasks() {
        try {
            const saved = localStorage.getItem('taskflow_tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load tasks:', error);
            return [];
        }
    }

    /**
     * Gets next task ID (persists across reloads)
     */
    getNextTaskId() {
        try {
            const saved = localStorage.getItem('taskflow_counter');
            return saved ? parseInt(saved, 10) : 1;
        } catch (error) {
            console.error('Failed to load task counter:', error);
            return 1;
        }
    }

    /**
     * Escapes HTML to prevent XSS
     */
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Shows a notification message in the UI
     */
    showNotification(message, type = 'info') {
        try {
            console.log(`[${type.toUpperCase()}] ${message}`);

            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            `;

            const colors = {
                success: '#48bb78',
                error: '#e53e3e',
                warning: '#ed8936',
                info: '#3182ce'
            };

            notification.style.background = colors[type] || colors.info;
            notification.textContent = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);

            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        } catch (error) {
            console.error('Failed to show notification:', error);
        }
    }

    /**
     * Exports all tasks as a downloadable JSON file
     */
    exportTasks() {
        try {
            const dataStr = JSON.stringify(this.tasks, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'taskflow_backup.json';
            link.click();

            URL.revokeObjectURL(url);
            this.showNotification('Tasks exported successfully!', 'success');
        } catch (error) {
            console.error('Failed to export tasks:', error);
            this.showNotification('Error exporting tasks.', 'error');
        }
    }

    /**
     * Clears all tasks after confirmation
     */
    clearAllTasks() {
        try {
            if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
                this.tasks = [];
                this.saveTasks();
                this.renderTasks();
                this.updateStats();
                this.showNotification('All tasks cleared!', 'success');
            }
        } catch (error) {
            console.error('Failed to clear all tasks:', error);
            this.showNotification('Error clearing tasks.', 'error');
        }
    }

    /**
     * Returns task statistics (total, completed, pending, etc.)
     */
    getTaskStats() {
        const now = new Date();
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            pending: this.tasks.filter(t => !t.completed).length,
            createdToday: this.tasks.filter(t => new Date(t.createdAt).toDateString() === now.toDateString()).length,
            completedToday: this.tasks.filter(t => t.completedAt && new Date(t.completedAt).toDateString() === now.toDateString()).length
        };
    }
}

// Initialize TaskFlow after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.taskFlow = new TaskFlow();
    } catch (error) {
        console.error('Failed to initialize TaskFlow on DOMContentLoaded:', error);
    }
});

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskFlow;
}
