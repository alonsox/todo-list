import $ from 'jquery';
import format from 'date-fns/format';
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
        panelContainer.classList.add('mv_list-info-panel-l');
        panelContainer.appendChild(listInfoPanel);
        panelContainer.appendChild(buttonsPanel);        
    }

    function initEvents() {

        $(newTaskBtn).on('click', () => {
            let listName = getListName();
            if (listName.toLowerCase() == 'all') {
                alert('You need to select a list different from "All"');
                return;
            }
            
            PubSub.publish('TASK_BEING_CREATED', {
                listName,
                taskInfo: {
                    done: false,
                    subject: 'New task',
                    notes: '',
                    dueDate: format(Date.now(), 'yyyy-MM-dd'),
                    priority: 'low'
                }
            });
        });

        PubSub.subscribe('LIST_SELECTED', (data) => {
            listNameIndicator.textContent = data.listName;
        });
    }

    function getListName() {
        return listNameIndicator.textContent.trim();
    }

    init();
    return panelContainer;
})();

export {ListInfoPanel}