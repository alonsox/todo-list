import $ from 'jquery';

function newTask(taskInfo) {
    const taskContainer = document.createElement('div');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TASK INFO
        const taskName = document.createElement('h3');
        taskName.classList.add('mv_task-name');
        taskName.textContent = taskInfo.subject;

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('mv_task-due-date');
        taskDueDate.textContent = `Due date: ${taskInfo.dueDate}`;

        const taskInfoContainer = document.createElement('div');
        taskInfoContainer.classList.add('mv_task-info');
        taskInfoContainer.appendChild(taskName);
        taskInfoContainer.appendChild(taskDueDate);

        // TASK DONE/UNDONE CHECKBOX
        const checkBoxIcon = document.createElement('i');
        checkBoxIcon.classList.add('material-icons', 'mv_task-check');
        checkBoxIcon.textContent = (taskInfo.taskDone) ? 'check_box' : 'check_box_outline_blank';

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('mv_checkbox-wrapper');
        checkboxWrapper.appendChild(checkBoxIcon);
        
        // TASK INFO + CHECKBOX
        const checkboxInfoWrapper = document.createElement('div');
        checkboxInfoWrapper.classList.add('mv_checkbox-taskinfo-wraper');
        checkboxInfoWrapper.appendChild(checkboxWrapper);
        checkboxInfoWrapper.appendChild(taskInfoContainer);
        
        // (TASK INFO + CHECKBOX) + DELTE BUTTON
        const deleteTaskBtn = document.createElement('i');
        deleteTaskBtn.classList.add('material-icons', 'mv_delete-task-icon');
        deleteTaskBtn.textContent = 'delete';

        const taskEntry = document.createElement('div');
        taskEntry.classList.add('mv_task_entry');
        taskEntry.appendChild(checkboxInfoWrapper);
        taskEntry.appendChild(deleteTaskBtn);

        // PRIORITY INDICATOR
        const priorityIndicator = document.createElement('div');
        priorityIndicator.classList.add(
            'mv_priority-indicator',
            `${getPriorityClass(taskInfo.priority)}`
        );

        // INSERT INTO CONTAINER
        taskContainer.classList.add('mv_task-wrapper');
        if (taskInfo.taskDone) {
            taskContainer.classList.add('mv_task-wrapper-done');
        }
        taskContainer.setAttribute('data-task-id', `${taskInfo.taskId}`);
        taskContainer.appendChild(priorityIndicator);
        taskContainer.appendChild(taskEntry);
    }

    function getPriorityClass(priority) {

        switch (priority) {
            case 'high':
               return 'mv_priority-high';
            case 'medium':
                return 'mv_priority-medium';
            case 'low': 
                return 'mv_priority-low';
            default:
                return 'mv_priority-low';
       }
    }

    function initEvents() {

    }


    // RETURN ELEMENT
    init();
    return taskContainer;
}

export {newTask}
