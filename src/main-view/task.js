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
        checkBoxIcon.textContent = (taskInfo.done) ? 'check_box' : 'check_box_outline_blank';

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
            console.log(`toggling doneness: S=${taskInfo.subject}, ID=${taskInfo.id}`);

            // let newInfo = Object.assign({}, taskInfo);
            // newInfo.done = !taskInfo.done;  // Toogle done/undone

            // PubSub.publish('TASK_BEING_EDITED', {
            //     listName,
            //     taskId: taskInfo.id,
            //     newInfo
            // });
        });
        
        $(taskInfoContainer).on('click', () => {
            PubSub.publish('TASK_SELECTED', {
                listName,
                taskId: taskInfo.id
            });
        });


        PubSub.subscribe('TASK_EDITED', (data) => {
            if (data.taskInfo.id == taskInfo.id) {
                console.log(`editing task: S=${taskInfo.subject}, ID=${taskInfo.id}`);
                // taskInfo = data.taskInfo;
                // changeDoneness(taskInfo.done);
                // taskSubject.textContent = taskInfo.subject;
                // taskDueDate.textContent = taskInfo.dueDate;
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
            taskContainer.classList.add('mv_task-wrapper-done');
        } else {
            taskContainer.classList.remove('mv_task-wrapper-done');
        }
    }


    // RETURN ELEMENT
    init();
    return taskContainer;
}

export {newTask}
