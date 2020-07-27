import $ from 'jquery';


const TaskInfoContainer = (function() {

    const currentTask  = null;
    const theContainer = document.createElement('div');

    function init() {
        createUI();
        initEvents()
    }

    function createUI() {

        // TASK TITLE
        const taskTitleIcon = document.createElement('i');
        $(taskTitleIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskTitleIcon).text('title');

        const taskTitleText = document.createElement('span');
        $(taskTitleText).addClass('ev_editable-text');
        $(taskTitleText).text('Task Title');

        const taskTitleContainer = document.createElement('div');
        $(taskTitleContainer).addClass('ev_task-title');
        $(taskTitleContainer).append(taskTitleIcon)
        $(taskTitleContainer).append(taskTitleText);


        // TASK LIST
        const taskListIcon = document.createElement('i');
        $(taskListIcon).addClass(
            'material-icons icon-size-big ev_task-data-icon'
        );
        $(taskListIcon).text('menu');

        const taskListText = document.createElement('span');
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
        const radioButtonsContainer  = document.createElement('div');
        $(radioButtonsContainer).addClass('ev_priority-container');
        $(radioButtonsContainer).append(createRadioButton('Low'));
        $(radioButtonsContainer).append(createRadioButton('Medium'));
        $(radioButtonsContainer).append(createRadioButton('High'));

        const taskPriorityContainer = document.createElement('div');
        $(taskPriorityContainer).addClass('ev_task-priority');
        $(taskPriorityContainer).append(priorityTitle);
        $(taskPriorityContainer).append(radioButtonsContainer);

        // TASK NOTES
        const taskNotes = document.createElement('textarea');
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

        const deleteBtn = document.createElement('button');
        $(deleteBtn).addClass('ev_delete-task-btn');
        $(deleteBtn).append(deleBtnIcon);
        $(deleteBtn).append(deleteBtnText);

        // ASSEMBLE EVERYTHING
        $(theContainer).addClass('ev_task-info-container-l');
        $(theContainer).append(taskTitleContainer);
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

    }


    // RETURN THE ELEMENT
    init();
    return theContainer;
})();


export {TaskInfoContainer}