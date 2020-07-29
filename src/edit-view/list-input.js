import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import { newPopupMessage } from '../core/popup';


function newEditableSpan(spanClass) {
    const textSpan   = document.createElement('span');

    let lastValue    = '';
    let validationFn = null;
    
    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // TEXT
        $(textSpan).addClass(spanClass);
    }

    function initEvents() {
        $(textSpan).on('click', () => {
            textSpan.contentEditable = true;
        });

        $(textSpan).on('keypress', (e) => {
            // Send changes on enter and also don't allow enter (line braks )
            if (e.which === 13) {
                e.preventDefault();
                $(textSpan).trigger('focusout');
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
        $(element).append(textSpan);
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



const ListInput = (function() {

    const popup             = newPopupMessage();
    const listNameText      = newEditableSpan('ev_editable-text');
    const taskListContainer = document.createElement('div');

    let availableLists  = [];
    let currentListName = null;
    let currentTaskInfo = null;

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // ICON
        const taskListIcon = document.createElement('i');
        $(taskListIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskListIcon).text('menu');

        // SET UP LIST NAME
        listNameText.setValidationFunction(validateList);

        // ICON-TEXT CONTAINER
        $(taskListContainer).addClass('inline-popup ev_task-list');
        $(taskListContainer).append(taskListIcon);
        $(taskListContainer).append(popup.DomElement);
        listNameText.appendInto(taskListContainer);
    }
    
    function initEvents() {
        
        PubSub.subscribe('TASK_SELECTED_SUCCESS', (data) => {
            currentListName = data.listName;
            currentTaskInfo = data.taskInfo;

            listNameText.setText(currentListName);
            listNameText.updateLastValue(currentListName);
        });

        PubSub.subscribe('LISTS_LOADED', (lists) => {
            for (let listName in lists) {
                addList(listName);
            }
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            addList(data.listName);
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
           deleteList(data.listName);
        });

        // TODO: think again this part when using a backend
        listNameText.onFocusOut(() => {
            if (listNameText.isValidText()) {
                listNameText.disableInput();

                let oldListName = currentListName;
                let oldTaskID = currentTaskInfo.id;

                // Prepare info to send
                let infoToSend = Object.assign({}, currentTaskInfo);
                delete infoToSend.id;

                // Create a new task in a new list with the same info
                PubSub.publish('TASK_BEING_CREATED', {
                    listName: listNameText.getText(),
                    taskInfo: infoToSend
                });

                // Delete the task in the old list
                PubSub.publish('TASK_BEING_DELETED', {
                    listName: oldListName,
                    taskId: oldTaskID
                });
            } else {
                popup.show('This list does not exist', 2500);
                if (!listNameText.isActive()) {
                    listNameText.setText(listNameText.getLastValue());
                }
            }
        });
    }

    function validateList(text) {
        return listExists(text);
    }

    function listExists(listName) {
        // Check if the list's name is empty
        listName = listName.trim();
        if (listName == '') {
            return false;
        }
        
        // Check if the list's name already exists
        let aux = availableLists.find((element) => element === listName);
        if ((typeof aux == 'undefined')) {
            return false; // It does not exist
        } else {
            return true;
        }
    }

    function addList(listName) {
        if (listExists(listName)) {
            return;
        } else {
            availableLists.push(listName);
        }
    }

    function deleteList(listName) {
        listName = listName.trim();

        let pos = availableLists.indexOf(listName);
        if (pos < 0) {
            return;
        } else {
            availableLists.splice(pos, 1);
        }
    }

    init();
    return taskListContainer;
})();

export {ListInput}