import $ from 'jquery';


function newListInfoPanel() {

    const listNameIndicator   = document.createElement('h1');
    const allTasksCounter     = document.createElement('span');
    const tasksDoneCounter    = document.createElement('span');
    const tasksPendingCounter = document.createElement('span');
    const newTaskBtn          = document.createElement('i');
    const panelContainer      = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // LIST NAME HEADER
        listNameIndicator.classList.add('mv_list-name');
        listNameIndicator.textContent = 'All';
        
        // STATS COUNTERS
        styleStatCounter(allTasksCounter, 'YY Tasks');
        styleStatCounter(tasksDoneCounter, 'YY Done');
        styleStatCounter(tasksPendingCounter, 'ZZ Pending');

        const statsContainer = document.createElement('div');
        statsContainer.appendChild(allTasksCounter);
        statsContainer.appendChild(tasksDoneCounter);
        statsContainer.appendChild(tasksPendingCounter);
        
        // INFORMATION PANEL
        const listInfoPanel = document.createElement('div');
        listInfoPanel.appendChild(listNameIndicator);
        listInfoPanel.appendChild(statsContainer)
        
        // ADD NEW TASK BUTTON
        newTaskBtn.classList.add(
            'material-icons',
            'icon-size-normal',
            'mv_add-task-btn'
        );
        newTaskBtn.textContent = 'add';

        // BUTTONS PANEL
        const buttonsPanel = document.createElement('div');
        buttonsPanel.appendChild(newTaskBtn);

        // THE WHOLE ELEMENT CONTAINER
        panelContainer.classList.add('mv_list-info-l');
        panelContainer.appendChild(listInfoPanel);
        panelContainer.appendChild(buttonsPanel);        
    }

    function styleStatCounter(counter, text) {
        counter.classList.add('mv_list-stat');
        counter.textContent = text;
    }

    function initEvents() {

    }

    init();
    return panelContainer;
}

export {newListInfoPanel}