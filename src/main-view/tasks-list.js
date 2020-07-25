import $ from 'jquery';
import {newTask} from './task';
import {PubSub} from '../core/pubsub';


function newTaskList(listName, tasksList) {
    
    const listNameIndicator = document.createElement('div');
    const tasksContainer    = document.createElement('div');
    const container         = document.createElement('div');


    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        listNameIndicator.classList.add('mv_list-title');
        listNameIndicator.textContent = listName;

        tasksList.forEach((task) => {
            tasksContainer.appendChild(newTask(listName, task));
        });

        container.appendChild(listNameIndicator);
        container.appendChild(tasksContainer);
    }

    function initEvents() {

        PubSub.subscribe('LIST_SELECTED', (data) => {

            if (data.listName.toLowerCase() == 'all') {
                showName();
                showList();
            } else if (data.listName == listName) {
                hideName();
                showList();
            } else{
                hideName();
                hideList();
            }
        });

        PubSub.subscribe('TASK_CREATED', (data) => {

            if (data.listName == listName) {
                console.log(`creating task in ${listName}`);
            }
            // TODO: add tasks info in the datas
        });

        PubSub.subscribe('TASK_DELETED', (data) => {

            if (data.listName == listName) {

            }
        });
    }

    function showName() {
        $(listNameIndicator).removeClass('is-hidden');
    }

    function hideName() {
        $(listNameIndicator).addClass('is-hidden');
    }

    function showList() {
        $(tasksContainer).removeClass('is-hidden');
    }

    function hideList() {
        $(tasksContainer).addClass('is-hidden');
    }

    init();
    return container;
}

export {newTaskList}

