import $ from 'jquery';
import {PubSub} from '../core/pubsub';

const ListInfoPanel = (function() {

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

        $(newTaskBtn).on('click', () => {
            console.log('creating new task...');
        });

        PubSub.subscribe('LIST_SELECTED_SUCCESS', (data) => {
            console.log('LIP: processing list info');
            // Count all tasks and check how many are done and undone
        });


    }

    init();
    return panelContainer;
})();

export {ListInfoPanel}