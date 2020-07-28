import $ from 'jquery';
import { PubSub } from '../core/pubsub';

const DeleteTaskBtn = (function() {

    const deleteBtn = document.createElement('button');

    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TASK DELETE BUTTON
        const deleBtnIcon = document.createElement('i');
        $(deleBtnIcon).addClass(
            'material-icons icon-size-big ev_delete-task-icon'
        );
        $(deleBtnIcon).text('delete');

        const deleteBtnText = document.createElement('label');
        $(deleteBtnText).text('Delete task');

        $(deleteBtn).addClass('ev_delete-task-btn');
        $(deleteBtn).append(deleBtnIcon);
        $(deleteBtn).append(deleteBtnText);
    }
    
    function initEvents() {
        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;
        });

        $(deleteBtn).on('click', () => {
            if (currentTaskInfo != null && currentListName != null) {
                PubSub.publish('TASK_BEING_DELETED', {
                    listName: currentListName,
                    taskId: currentTaskInfo.id
                })
            }
        });
    }

    init();
    return deleteBtn;
})();

export {DeleteTaskBtn}