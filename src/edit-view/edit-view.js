import $ from 'jquery';
import {PubSub} from '../core/pubsub';
import {TaskInfoContainer} from './task-info-container';

const EditView = (function() {

    const sectionHeader     = document.createElement('h2');
    const editViewMsg       = document.createElement('h3');
    const editViewContainer = document.createElement('aside');

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
        hideEditViewMessage();
        // hideTaskInfo();
    }

    function initEvents() {

        PubSub.subscribe('TASK_SELECTED_SUCCESS', () => {
            // showTaskInfo();
            // hideEditViewMessage();
        });

    }

    /// HIDE THE MESSAGE ON TASK SELECTED SUCCESS
    function hideEditViewMessage() {
        $(editViewMsg).addClass('is-hidden');
    }


    function showEditViewMessage() {
        $(editViewMsg).removeClass('is-hidden');
    }

    function hideTaskInfo() {
        $(TaskInfoContainer).addClass('is-hidden');
    }

    function showTaskInfo() {
        $(TaskInfoContainer).removeClass('is-hidden');
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