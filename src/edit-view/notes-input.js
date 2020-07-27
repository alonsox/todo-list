import $ from 'jquery';
import { PubSub } from '../core/pubsub';

const NotesInput = (function() {

    const taskNotes = document.createElement('textarea');

    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TASK NOTES
        $(taskNotes).addClass('ev_task-notes');
        $(taskNotes).attr('placeholder', 'Add a note...');
    }
    
    function initEvents() {
        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;
            
            // LOAD NOTES
            $(taskNotes).val(currentTaskInfo.notes);
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            if (data.taskInfo.id == currentTaskInfo.id) {
                currentListName = data.listName;
                currentTaskInfo = data.taskInfo;
                $(taskNotes).val(currentTaskInfo.notes);
            }
        });
        
        $(taskNotes).on('input', () => {
            // PREPARE INFO TO EDIT
            let infoToSend   = Object.assign({}, currentTaskInfo);
            infoToSend.notes = $(taskNotes).val();
            delete infoToSend.id;

            PubSub.publish('TASK_BEING_EDITED', {
                listName: currentListName,
                taskId: currentTaskInfo.id,
                newTaskInfo: infoToSend
            });
        });
    }

    init();
    return taskNotes;
})();

export {NotesInput}