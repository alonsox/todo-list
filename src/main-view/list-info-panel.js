import $ from 'jquery';
import {PubSub} from '../core/pubsub';

const ListInfoPanel = (function() {

    const listNameIndicator = document.createElement('h1');
    const newTaskBtn        = document.createElement('i');
    const panelContainer    = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // LIST NAME HEADER
        listNameIndicator.classList.add('mv_list-name');
        listNameIndicator.textContent = 'All';
        
        // INFORMATION PANEL
        const listInfoPanel = document.createElement('div');
        listInfoPanel.appendChild(listNameIndicator);
        
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

    function initEvents() {

        $(newTaskBtn).on('click', () => {
            console.log('creating new task...');
        });

        PubSub.subscribe('LIST_SELECTED', (data) => {
            listNameIndicator.textContent = data.listName;
        });
    }

    init();
    return panelContainer;
})();

export {ListInfoPanel}