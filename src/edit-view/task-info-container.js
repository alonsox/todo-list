import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import {SubjectInput} from './subject-input';

const TaskInfoContainer = (function() {
    // UI ELEMENTS
    const taskListText      = document.createElement('span');
    const radioBtnContainer = document.createElement('div');
    const taskNotes         = document.createElement('textarea');
    const deleteBtn         = document.createElement('button');
    const theContainer      = document.createElement('div');
    
    // ADDITIONAL ELEMENTS
    let currentTaskInfo = null;
    let selectedRadioButton = null;


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


        // TASK PRIORITY
        // Title
        const priorityTitleIcon = document.createElement('i');
        $(priorityTitleIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(priorityTitleIcon).text('info_outline');

        const priorityTitleText = document.createElement('span');
        $(priorityTitleText).addClass('ev_text-info');
        $(priorityTitleText).text('Priority');

        const priorityTitle = document.createElement('div');
        $(priorityTitle).addClass('ev_priority-title');
        $(priorityTitle).append(priorityTitleIcon);
        $(priorityTitle).append(priorityTitleText);

        // Radio buttons
        $(radioBtnContainer).addClass('ev_priority-container');
        $(radioBtnContainer).append(createRadioButton('Low'));
        $(radioBtnContainer).append(createRadioButton('Medium'));
        $(radioBtnContainer).append(createRadioButton('High'));

        const taskPriorityContainer = document.createElement('div');
        $(taskPriorityContainer).addClass('ev_task-priority');
        $(taskPriorityContainer).append(priorityTitle);
        $(taskPriorityContainer).append(radioBtnContainer);

        // TASK NOTES
        $(taskNotes).addClass('ev_task-notes');
        $(taskNotes).attr('placeholder', 'Add a note...');

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

        // ASSEMBLE EVERYTHING
        $(theContainer).addClass('ev_task-info-container-l');
        $(theContainer).append(SubjectInput);
        $(theContainer).append(taskListContainer);
        $(theContainer).append(taskDateContainer);
        $(theContainer).append(taskPriorityContainer);
        $(theContainer).append(taskNotes);
        $(theContainer).append(deleteBtn);
    }

    function createRadioButton(priority) {

        const radioButtonIcon = document.createElement('i');
        $(radioButtonIcon).addClass(
            'material-icons icon-size-big ev_priority-radio-btn'
        );
        $(radioButtonIcon).text('radio_button_unchecked');

        const radioButtonText = document.createElement('label');
        $(radioButtonText).text(priority);

        const radioButtonContainer = document.createElement('div');
        $(radioButtonContainer).addClass('ev_priority-item');
        $(radioButtonContainer).append(radioButtonIcon);
        $(radioButtonContainer).append(radioButtonText);

        return radioButtonContainer;
    }

    function initEvents() {

        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            currentTaskInfo = data.taskInfo;
            
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

        // The radio buttons
        let radioButtons = radioBtnContainer.querySelectorAll('.ev_priority-radio-btn');
        radioButtons.forEach((button) => {
            $(button).on('click', (e) => {
                let radioBtn = e.target;

                // PREPARE INFO TO EDIT
                let priority   = radioBtn.parentNode.querySelector('label').textContent;
                let infoToSend = Object.assign({}, currentTaskInfo);
                infoToSend.priority = priority.toLowerCase();

                // PubSub.publish('TASK_BEING_EDITED', infoToSend);
            });
        });
        


        // radioButtonsContainer.querySelectorAll('.ev_priority-radio-btn').forEach()
        // taskNotes
        $(deleteBtn).on('click', () => {
            if (currentTaskInfo != null) {
                console.log(`Deleting task with ID=${currentTaskInfo.id}`);
            }
        });
    }


    function editPriority(e) {
    }

    function getListName() {
        return 'sd';
    }

    // RETURN THE ELEMENT
    init();
    return theContainer;
})();


export {TaskInfoContainer}