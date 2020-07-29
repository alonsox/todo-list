import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import { newPopupMessage } from '../core/popup';

/** Numbers of days in a regular year, 
 * 
 * Regular year => February has 28 days.
 * 
 * The key of an element will be a string with the month's number with a 
 * leading 0 if the month's number is less than 10.
 */
const daysInMonth = {}
daysInMonth["01"] = 31;
daysInMonth["02"] = 28;
daysInMonth["03"] = 31;
daysInMonth["04"] = 30;
daysInMonth["05"] = 31;
daysInMonth["06"] = 30;
daysInMonth["07"] = 31;
daysInMonth["08"] = 31;
daysInMonth["09"] = 30;
daysInMonth["12"] = 31;
daysInMonth["11"] = 30;
daysInMonth["12"] = 31;

const monthNames = {}
monthNames["01"] = 'January';
monthNames["02"] = 'February';
monthNames["03"] = 'March';
monthNames["04"] = 'April';
monthNames["05"] = 'May';
monthNames["06"] = 'June';
monthNames["07"] = 'July';
monthNames["08"] = 'August';
monthNames["09"] = 'September';
monthNames["12"] = 'October';
monthNames["11"] = 'November';
monthNames["12"] = 'December';


function newEditableNumber(spanClass) {
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

const DateInput = (function() {
    const popup     = newPopupMessage();
    const yearText  = newEditableNumber('ev_date-year');
    const monthText = newEditableNumber('ev_date-month');
    const dayText   = newEditableNumber('ev_date-day');
    const taskDateContainer = document.createElement('div');

    let validationErrorMsg; // error produced when validating the date or part of it
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

        // INITIALIZE DATE ELEMENTS
        yearText.setValidationFunction(validateYear);
        monthText.setValidationFunction(validateMonth);
        dayText.setValidationFunction(validateDay);
        
        // PUT IN THE CONTAINER
        const auxContainer = document.createElement('div');
        yearText.appendInto(auxContainer);
        $(auxContainer).append(newDashSpan());
        monthText.appendInto(auxContainer)
        $(auxContainer).append(newDashSpan());
        dayText.appendInto(auxContainer);

        // ASSEMBLE EVERYTHING
        $(taskDateContainer).addClass('ev_task-date inline-popup');
        $(taskDateContainer).append(popup.DomElement);
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

        // TODO: add a task not edited?

        yearText.onFocusOut(() => {
            if (yearText.isValidText()) {
                yearText.disableInput();
                sendTaskInfo();
            } else {
                showPopup(validationErrorMsg, 2500);
                if (!yearText.isActive()) {
                    yearText.setText(yearText.getLastValue());
                }
            }
        });

        monthText.onFocusOut(() => {
            if (monthText.isValidText()) {
                monthText.disableInput();
                sendTaskInfo();
            } else {
                showPopup(validationErrorMsg, 2500);
                if (!monthText.isActive()) {
                    monthText.setText(monthText.getLastValue());
                }
            }
        });

        dayText.onFocusOut(() => {
            if (dayText.isValidText()) {
                dayText.disableInput();
                sendTaskInfo();
            } else {
                // Improve message formating
                showPopup(validationErrorMsg, 2500);
                if (!dayText.isActive()) {
                    dayText.setText(dayText.getLastValue());
                }
            }
        });
    }

    function showPopup(msg, timeout=3000) {
        popup.show(msg, timeout);
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

    function removeLeadingZeros(str) {
        let start = 0;
        while (str[start] === '0') {
            start++;
        }

        return str.slice(start);
    }

    function addLeadingZeros(str, maxLength) {
        str = removeLeadingZeros(str);
        if (str.length >= maxLength) {
            return str;
        } else {
            let zeros = '';
            for (let i = 0; i < maxLength - str.length; i++) {
                zeros = `0${zeros}`;
            }

            return `${zeros}${str}`;
        }
    }

    function getDate() {
        let year  = addLeadingZeros(yearText.getText(), 4);
        let month = addLeadingZeros(monthText.getText(), 2);
        let day   = addLeadingZeros(dayText.getText(), 2);

        return `${year}-${month}-${day}`;
    }

    function displayCurrentDate() {
        let dateParts = currentTaskInfo.dueDate.split('-');

        yearText.setText(dateParts[0]);
        yearText.updateLastValue();

        monthText.setText(dateParts[1]);
        monthText.updateLastValue();

        dayText.setText(dateParts[2]);
        dayText.updateLastValue();
    }

    function validateYear(text) {

        let year  = removeLeadingZeros(text.trim());
        let month = monthText.getText();
        let day   = removeLeadingZeros(dayText.getText());

        if (year == '') {
            validationErrorMsg = 'The year cannot be empty';
            return false;
        } else {
            if (   isLeapYear(year) 
                && month === '02' 
                && (day >= 1 && day <= (daysInMonth[month] + 1))) { // +1 for the extra day
                return true;
            } else if (day >= 1 && day <= daysInMonth[month]) {
                return true;
            } else {
                validationErrorMsg = `This year is not leap`;
                return false;
            }
        }
    }   

    function validateMonth(text) {
        let year        = removeLeadingZeros(yearText.getText());
        let month       = addLeadingZeros(text, 2);
        let day         = removeLeadingZeros(dayText.getText());
        let monthNumber = removeLeadingZeros(text.trim());

        if (monthNumber == '') {
            validationErrorMsg = 'The month cannot be empty';
            return false;
        } else if (monthNumber >= 1 && monthNumber <= 12) {
            // CHECK THE DAY
            if (   isLeapYear(year) 
                && month === '02' 
                && (day >= 1 && day <= (daysInMonth[month] + 1))) { // +1 for the extra day
                return true;
            } else if (day >= 1 && day <= daysInMonth[month]) {
                return true;
            } else {
                validationErrorMsg = `The day is not valid for ${monthNames[month]}`;
                return false;
            }
        } else {
            validationErrorMsg = 'The month must be a number between 1 and 12';
            return false;
        }
    }

    function validateDay(text) {

        let year  = removeLeadingZeros(yearText.getText());
        let month = monthText.getText();
        let day   = removeLeadingZeros(text.trim());

        if (day == '') {
            validationErrorMsg = 'The day cannot be empty';
            return false;
        } else if (day >= 1 && day <= daysInMonth[month]) {
            return true;
        } else {
            // Special consideration for February on al leap year 
            if (    isLeapYear(year) 
                &&  month === '02'
                &&  (day >= 1 && day <= (daysInMonth[month] + 1)) ) { // +1 for the extra day
                return true;
            } else {
                validationErrorMsg = `This day is not valid for ${monthNames[month]}`;
                return false;
            }
        }
    }

    function isLeapYear(year) {
        /* Leap years are years divisible by four (like 1984 and 2004). However, 
        * years divisible by 100 are not leap years (such as 1800 and 1900) unless 
        * they are divisible by 400 (like 1600 and 2000, which were in fact leap 
        * years). (Yes, it's all pretty confusing, but not as confusing as having 
        * July in the middle of the winter, which is what would eventually happen) 
        */

        if (year % 4 == 0) {
            if (year % 100 == 0) {
                return (year % 400 == 0);
            } else {
                return true;
            }  
        } else {
            return false;
        }
    } 

    init();
    return taskDateContainer;
})();

export {DateInput}