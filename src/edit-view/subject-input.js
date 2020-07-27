import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import { newPopupMessage } from '../core/popup';

const SubjectInput = (function() {

    const popup              = newPopupMessage();
    const taskSubjectText    = document.createElement('span');
    const taskSubjectContainer = document.createElement('div');

    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // ICON
        const taskSubjectIcon = document.createElement('i');
        $(taskSubjectIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskSubjectIcon).text('title');

        // TEXT
        $(taskSubjectText).addClass('ev_editable-text');
        $(taskSubjectText).text('Task Title');

        // ASSEMBLE EVERYTHING
        $(taskSubjectContainer).addClass('ev_task-title inline-popup');
        $(taskSubjectContainer).append(popup.DomElement);
        $(taskSubjectContainer).append(taskSubjectIcon);
        $(taskSubjectContainer).append(taskSubjectText);
    }

    function initEvents() {

        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            // UPDATE TASK INFO
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;
            
            // LOAD TASK INFO
            $(taskSubjectText).text(currentTaskInfo.subject);
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            if (    data.listName == currentListName 
                &&  data.taskInfo.id == currentTaskInfo.id) {

                currentTaskInfo = data.taskInfo;
                $(taskSubjectText).text(currentTaskInfo.subject);
            }
        });

        // TODO: Add a task not edited eventualy

        $(taskSubjectText).on('click', () => {
            taskSubjectText.contentEditable = true;
        });

        $(taskSubjectText).on('focusout', () => {
            // CHECK INPUT BEFORE EDITING
            let subject = $(taskSubjectText).text().trim();
            if (subject == '') {
                popup.show('The subject cannot be empty', 2500);
                if (document.activeElement != taskSubjectText) {
                    $(taskSubjectText).text(currentTaskInfo.subject);
                }
                return;
            }

            // ALL OK
            popup.hide();
            taskSubjectText.contentEditable = false;

            // PREPARE INFO TO EDIT
            let infoToSend = Object.assign({}, currentTaskInfo);
            infoToSend.subject = subject;
            
            // console.log(infoToSend);
            
            PubSub.publish('TASK_BEING_EDITED', {
                listName: currentListName,
                taskId: infoToSend.id,
                newTaskInfo: infoToSend
            });
        });

        $(taskSubjectText).on('keypress', (e) => {
            // Send changes on enter and also don't allow enter (line braks )
            if (e.which === 13) {
                e.preventDefault();
                $(taskSubjectText).trigger('focusout');
            }
        });
    }

    init();
    return taskSubjectContainer;
})();


export {SubjectInput}