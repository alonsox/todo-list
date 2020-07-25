import $ from 'jquery';
import {PubSub} from '../core/pubsub';

function newTask(listName, taskInfo) {

    const taskSubject       = document.createElement('h3');
    const taskDueDate       = document.createElement('p');
    const taskInfoContainer = document.createElement('div');
    const checkBoxIcon      = document.createElement('i');
    const deleteTaskBtn     = document.createElement('i');
    const taskEntry         = document.createElement('div');
    const priorityIndicator = document.createElement('div');
    const taskContainer     = document.createElement('div');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TASK INFO
        taskSubject.classList.add('mv_task-name');
        taskSubject.textContent = taskInfo.subject;

        taskDueDate.classList.add('mv_task-due-date');
        taskDueDate.textContent = `Due date: ${taskInfo.dueDate}`;

        taskInfoContainer.classList.add('mv_task-info');
        taskInfoContainer.appendChild(taskSubject);
        taskInfoContainer.appendChild(taskDueDate);

        // TASK DONE/UNDONE CHECKBOX
        checkBoxIcon.classList.add('material-icons', 'mv_task-check');
        changeDoneness(taskInfo.done);

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('mv_checkbox-wrapper');
        checkboxWrapper.appendChild(checkBoxIcon);
        
        // TASK INFO + CHECKBOX
        const checkboxInfoWrapper = document.createElement('div');
        checkboxInfoWrapper.classList.add('mv_checkbox-taskinfo-wraper');
        checkboxInfoWrapper.appendChild(checkboxWrapper);
        checkboxInfoWrapper.appendChild(taskInfoContainer);
        
        // (TASK INFO + CHECKBOX) + DELTE BUTTON
        deleteTaskBtn.classList.add('material-icons', 'mv_delete-task-icon');
        deleteTaskBtn.textContent = 'delete';

        taskEntry.classList.add('mv_task_entry');
        taskEntry.appendChild(checkboxInfoWrapper);
        taskEntry.appendChild(deleteTaskBtn);

        // PRIORITY INDICATOR
        priorityIndicator.classList.add('mv_priority-indicator');
        changePriorityIndicator(taskInfo.priority);

        // INSERT INTO CONTAINER
        taskContainer.classList.add('mv_task-wrapper');
        changeDoneness(taskInfo.done);
        taskContainer.setAttribute('data-task-id', `${taskInfo.id}`);
        taskContainer.appendChild(priorityIndicator);
        taskContainer.appendChild(taskEntry);
    }

    function changePriorityIndicator(priority) {
        // TODO: use regex tom remove indicators
        priorityIndicator.classList.remove('mv_priority-high');
        priorityIndicator.classList.remove('mv_priority-medium');
        priorityIndicator.classList.remove('mv_priority-low');

        switch (priority) {
            case 'high':
                priorityIndicator.classList.add('mv_priority-high');
                break;
            case 'medium':
                priorityIndicator.classList.add('mv_priority-medium');
                break;
            case 'low': 
                priorityIndicator.classList.add('mv_priority-low');
                break;
       }
    }

    function initEvents() {

        $(deleteTaskBtn).on('click', () => {
            PubSub.publish('TASK_BEING_DELETED', {
                listName,
                taskId: taskInfo.id
            });
        });

        $(checkBoxIcon).on('click', () => {
            // PREPARE INFO TO SEND
            let newTaskInfo = Object.assign({}, taskInfo);
            newTaskInfo.done = !newTaskInfo.done;  // Toogle done/undone
            delete newTaskInfo.id;  // New info must go without id

            PubSub.publish('TASK_BEING_EDITED', {
                listName,
                taskId: taskInfo.id,
                newTaskInfo
            });
        });
        
        $(taskInfoContainer).on('click', () => {
            PubSub.publish('TASK_SELECTED', {
                listName,
                taskId: taskInfo.id
            });
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            if (data.taskInfo.id == taskInfo.id) {
                taskInfo = data.taskInfo;
                changeDoneness(taskInfo.done);
                changePriorityIndicator(taskInfo.priority);
                taskSubject.textContent = taskInfo.subject;
                taskDueDate.textContent = taskInfo.dueDate;
            }
        });

        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            if (data.taskInfo.id == taskInfo.id) {
                $(taskEntry).addClass('mv_task_entry-active');
            } else {
                $(taskEntry).removeClass('mv_task_entry-active');
            }
        });
    }

    function changeDoneness(done) {

        if (done) {
            $(taskContainer).addClass('mv_task-wrapper-done');
            checkBoxIcon.textContent = 'check_box';
        } else {
            $(taskContainer).removeClass('mv_task-wrapper-done');
            checkBoxIcon.textContent = 'check_box_outline_blank';
        }
    }


    // RETURN ELEMENT
    init();
    return taskContainer;
}

export {newTask}
