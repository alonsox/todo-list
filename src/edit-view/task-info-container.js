import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import {SubjectInput} from './subject-input';
import {PriorityInput} from './priority-input';
import {NotesInput} from './notes-input';
import {DeleteTaskBtn} from './delete-task-btn';

const TaskInfoContainer = (function() {
    // UI ELEMENTS
    const taskListText      = document.createElement('span');
    const theContainer      = document.createElement('div');
    
    // ADDITIONAL ELEMENTS
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents()
    }

    function createUI() {
        // TASK LIST
        const taskListIcon = document.createElement('i');
        $(taskListIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskListIcon).text('menu');

        $(taskListText).addClass('ev_editable-text');
        $(taskListText).text('All');
        
        const taskListContainer = document.createElement('div');
        $(taskListContainer).addClass('ev_task-list');
        $(taskListContainer).append(taskListIcon);
        $(taskListContainer).append(taskListText);


        // TASK DATE
        const taskDateIcon = document.createElement('i');
        $(taskDateIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskDateIcon).text('event_note');

        const taskDateText = document.createElement('span');
        $(taskDateText).addClass('ev_editable-text');
        $(taskDateText).text('2020/98/34');

        const taskDateContainer = document.createElement('div');
        $(taskDateContainer).addClass('ev_task-date');
        $(taskDateContainer).append(taskDateIcon);
        $(taskDateContainer).append(taskDateText);

        // ASSEMBLE EVERYTHING
        $(theContainer).addClass('ev_task-info-container-l');
        $(theContainer).append(SubjectInput);
        $(theContainer).append(taskListContainer);
        $(theContainer).append(taskDateContainer);
        $(theContainer).append(PriorityInput);
        $(theContainer).append(NotesInput);
        $(theContainer).append(DeleteTaskBtn);
    }

    function initEvents() {

        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            // LOAD TASK INFO
            // $(taskTitleText).text(currentTaskInfo.subject);
        });

        PubSub.subscribe('LISTS_LOADED', (data) => {
            // Fill the lists in the lists' autocomplete
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            // UPdate the lists autocomplete
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            // UPdate the lists autocomplete
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            // Update the lists autocomplete


            // // UPDATE SELECTED BUTTON
            // if (selectedRadioButton != null){
            //     // TODO: remove the checking with the if
            //     $(selectedRadioButton).text('radio_button_unchecked');
            // }
            // $(radioBtn).text('radio_button_checked');
            // selectedRadioButton = radioBtn;
        });

        PubSub.subscribe('TASK_NOT_EDITED', (data) => {
            // UPdate the lists autocomplete
        });
        

        // PubSub.publish('TASK_BEING_EDITED', {});
        // PubSub.publish('TASK_BEING_DELETED', {});

        // EVENTS
        // taskNotes
    }

    // RETURN THE ELEMENT
    init();
    return theContainer;
})();


export {TaskInfoContainer}