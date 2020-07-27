import $ from 'jquery';
import { PubSub } from '../core/pubsub';

const PriorityInput = (function() {

    const radioBtnContainer = document.createElement('div');
    const taskPriorityContainer = document.createElement('div');

    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // ICON
        const priorityTitleIcon = document.createElement('i');
        $(priorityTitleIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(priorityTitleIcon).text('info_outline');

        // PRIORITY TEXT
        const priorityTitleText = document.createElement('span');
        $(priorityTitleText).addClass('ev_text-info');
        $(priorityTitleText).text('Priority');

        // PRIORITY ICON-TEXT CONTAINER
        const priorityTitleContainer = document.createElement('div');
        $(priorityTitleContainer).addClass('ev_priority-title');
        $(priorityTitleContainer).append(priorityTitleIcon);
        $(priorityTitleContainer).append(priorityTitleText);

        // RADIO BUTTONS
        $(radioBtnContainer).addClass('ev_priority-container');
        $(radioBtnContainer).append(createRadioButton('Low'));
        $(radioBtnContainer).append(createRadioButton('Medium'));
        $(radioBtnContainer).append(createRadioButton('High'));

        // ASSEMBLE EVERYTHING
        $(taskPriorityContainer).addClass('ev_task-priority');
        $(taskPriorityContainer).append(priorityTitleContainer);
        $(taskPriorityContainer).append(radioBtnContainer);
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
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;
            
            // LOAD TASK INFO
            selectButton(currentTaskInfo.priority);
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            if (data.taskInfo.id == currentTaskInfo.id) {
                currentListName = data.listName;
                currentTaskInfo = data.taskInfo;
                selectButton(currentTaskInfo.priority);
            }
        });

        // TODO: add task not edited

        // EVENTS
        getButtons().forEach((button) => {
            $(button).on('click', (e) => {
                let radioBtn = e.target;

                // PREPARE INFO TO EDIT
                let infoToSend      = Object.assign({}, currentTaskInfo);
                infoToSend.priority = getButtonText(radioBtn).toLowerCase();
                delete infoToSend.id;

                PubSub.publish('TASK_BEING_EDITED', {
                    listName: currentListName,
                    taskId: currentTaskInfo.id,
                    newTaskInfo: infoToSend
                });
            });
        });
    }
    /**
     * Converts the priority text to lower case.
     * 
     * @param {string} priority The priority
     */
    function correctPriorityText(priority) {
        return priority.trim().toLowerCase();
    }

    function getButtonText(button) {

        if (button == null) {
            return '';
        } else {
            return correctPriorityText(
                button
                .parentNode
                .querySelector('label')
                .textContent
            );
        }
    }

    function getButtons() {
        return radioBtnContainer.querySelectorAll('i.ev_priority-radio-btn');
    }

    function selectButton(priority) {

        priority = correctPriorityText(priority);

        getButtons().forEach((button) => {
            if (getButtonText(button) == priority) {
                $(button).text('radio_button_checked');
            } else {
                $(button).text('radio_button_unchecked');

            }
        });
    }


    init();
    return taskPriorityContainer;
})();

export {PriorityInput}