import $ from 'jquery';
import {PubSub} from '../core/pubsub';
import {TaskInfoContainer} from './task-info-container';

const EditView = (function() {

    const sectionHeader     = document.createElement('h2');
    const editViewMsg       = document.createElement('h3');
    const editViewContainer = document.createElement('aside');

    let activeTaskList;
    let activeTaskInfo;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        $(sectionHeader).addClass('ev_edit-title');
        $(sectionHeader).text('Edit Task');
        
        $(editViewMsg).addClass('ev_no-task-active-msg');
        $(editViewMsg).text('No task selected');

        editViewContainer.classList.add('edit-l');
        $(editViewContainer).append(sectionHeader);
        $(editViewContainer).append(editViewMsg);
        $(editViewContainer).append(TaskInfoContainer);

        // SHOW MESSAGE
        // showEditViewMessage();
        hideEditViewMessage();
        hideTaskInfo();
    }

    function initEvents() {

        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            activeTaskList = data.listName;
            activeTaskInfo = data.taskInfo;

            showTaskInfo();
            hideEditViewMessage();
        });

        PubSub.subscribe('TASK_SELECTED_FAILED', (data) => {
            // Show the no task selected message
        });
        
        PubSub.subscribe('TASK_DELETED', (data) => {
            if (!activeTaskInfo) {
                return;
            }

            if (data.taskId == activeTaskInfo.id ) {
                showEditViewMessage();
                hideTaskInfo();
            }
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            if (!activeTaskList) {
                return;
            }

            if (data.listName == activeTaskList ) {
                showEditViewMessage();
                hideTaskInfo();
            }
        });

    }

    /// HIDE THE MESSAGE ON TASK SELECTED SUCCESS
    function hideEditViewMessage() {
        // $(editViewMsg).addClass('is-hidden');
        $(editViewMsg).hide();
    }

    function showEditViewMessage() {
        $(editViewMsg).show();
    }

    function hideTaskInfo() {
        $(TaskInfoContainer).hide();
    }

    function showTaskInfo() {
        $(TaskInfoContainer).show();
    }

    function render() {
        $('.content-l').prepend(editViewContainer);
    }

    init();
    return {
        render
    }
})();


export {EditView}