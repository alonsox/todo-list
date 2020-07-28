import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import { newPopupMessage } from '../core/popup';

function newEditableNumber(spanClass) {
    const popup      = newPopupMessage();
    const textSpan   = document.createElement('span');
    const container  = document.createElement('span');

    let lastValue    = '';
    let validationFn = null;
    
    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TEXT
        $(textSpan).addClass(spanClass);

        // ASSEMBLE EVERYTHING
        $(container).addClass('inline-popup');
        $(container).append(popup.DomElement);
        $(container).append(textSpan);
    }

    function initEvents() {
        $(textSpan).on('click', () => {
            textSpan.contentEditable = true;
        });

        $(textSpan).on('keypress', (e) => {
            // Send changes on enter and also don't allow enter (line braks )
            if (e.which >= 48 && e.which <= 57) {
                return e.which;
            } else if (e.which === 13) {
                e.preventDefault();
                $(textSpan).trigger('focusout');
            } else {
                e.preventDefault();
            }
        });
    }

    function disableInput() {
        textSpan.contentEditable = false;
    }

    function onFocusOut(callback) {
        $(textSpan).on('focusout', () => {
            callback();
        });
    }

    function appendInto(element) {
        $(element).append(container);
    }

    function showPopup(msg, timeout=3000) {
        popup.show(msg, timeout);
    }

    function isValidText() {
        if (validationFn == null) {
            return true;
        } else {
            return validationFn($(textSpan).text());
        }
    }

    function isActive() {
        return document.activeElement == textSpan;
    }

    function setText(text) {    
        $(textSpan).text(text); 
    }

    function getText() {
        return $(textSpan).text();
    }

    function getLastValue() {
        return lastValue;
    }

    function updateLastValue() {
        lastValue = $(textSpan).text();
    }

    /**
     * Sets the function to validate for the text of the element. This function 
     * must accept a single parameter, which will be the element's text, and 
     * must return TRUE if the text is valid; otherwise it should return FALSE.
     * 
     * 
     * @param {function} callback The function to check if the text of the 
     * element is correct or not.
     */
    function setValidationFunction(callback) {
        validationFn = callback;
    }

    init();
    return {    
        appendInto,
        showPopup,
        setText,
        getText,
        getLastValue,
        updateLastValue,
        setValidationFunction,
        isActive,
        isValidText,
        onFocusOut,
        disableInput
    };
}

const DateInput = (function() {

    // const yearText  = document.createElement('span');
    const yearText  = newEditableNumber('ev_date-year');
    const monthText = document.createElement('span');
    const dayText   = document.createElement('span');
    const taskDateContainer = document.createElement('div');

    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // ICON
        const taskDateIcon = document.createElement('i');
        $(taskDateIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskDateIcon).text('event_note');

        // YEAR ELEMENT
        // $(yearText).addClass('ev_date-year');
        yearText.setValidationFunction(validateYear);
        // 
        $(monthText).addClass('ev_date-month');
        $(dayText).addClass('ev_date-day');

        const auxContainer = document.createElement('div');
        yearText.appendInto(auxContainer);
        $(auxContainer).append(newDashSpan());
        $(auxContainer).append(monthText);
        $(auxContainer).append(newDashSpan());
        $(auxContainer).append(dayText);

        // ASSEMBLE EVERYTHING
        $(taskDateContainer).addClass('ev_task-date');
        $(taskDateContainer).append(taskDateIcon);
        $(taskDateContainer).append(auxContainer);
    }

    function newDashSpan() {
        let span = document.createElement('span');
        $(span).text(' - ');
        return span;
    }
    
    function initEvents() {
        
        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;
            displayCurrentDate();
        });

        PubSub.subscribe('TASK_EDITED', (data) => {
            if (data.taskInfo.id == currentTaskInfo.id) {
                currentListName = data.listName;
                currentTaskInfo = data.taskInfo;
                displayCurrentDate();
            }
        });

        yearText.onFocusOut(() => {
            if (yearText.isValidText()) {
                yearText.disableInput();
                sendTaskInfo();
            } else {
                yearText.showPopup('Please enter a valid year', 2500);
                if (!yearText.isActive()) {
                    yearText.setText(yearText.getLastValue());
                }
            }
        });

        // TODO: add a task not edited
    }

    function sendTaskInfo() {
        // PREPARE INFO TO SEND
        let infoToSend = Object.assign({}, currentTaskInfo);
        infoToSend.dueDate = getDate();
        delete infoToSend.id;

        PubSub.publish('TASK_BEING_EDITED', {
            listName: currentListName,
            taskId: currentTaskInfo.id,
            newTaskInfo: infoToSend
        });
    }

    function getDate() {
        let year  = yearText.getText();
        let month = $(monthText).text();
        let day   = $(dayText).text();
        return `${year}-${month}-${day}`;
    }

    function displayCurrentDate() {
        let dateParts = currentTaskInfo.dueDate.split('-');

        // $(yearText).text(dateParts[0]);
        yearText.setText(dateParts[0]);
        yearText.updateLastValue();

        $(monthText).text(dateParts[1]);
        $(dayText).text(dateParts[2]);
    }

    function validateYear(text) {
        text = text.trim();
        if (text == '') {
            return false;
        } else {
            return true;
        }
    }   

    init();
    return taskDateContainer;
})();

export {DateInput}