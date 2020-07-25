import $ from 'jquery';
import {newTask} from './task';
import {PubSub} from '../core/pubsub';


function newTaskList(listName, tasksList) {
    
    const listNameIndicator = document.createElement('div');
    const tasksContainer    = document.createElement('div');
    const container         = document.createElement('div');


    function init() {
        createUI();
        loadTasks();
        initEvents();
    }

    function createUI() {
        listNameIndicator.classList.add('mv_list-title');
        listNameIndicator.textContent = listName;

        container.setAttribute('data-list-name', listName);
        container.appendChild(listNameIndicator);
        container.appendChild(tasksContainer);

    }

    function loadTasks() {
        tasksList.forEach((task) => {
            tasksContainer.appendChild(newTask(listName, task));
        });
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
                tasksContainer.appendChild(newTask(listName, data.taskInfo))
            }
        });

        PubSub.subscribe('TASK_DELETED', (data) => {
            if (data.listName == listName) {
                let allTasks = tasksContainer.querySelectorAll('[data-task-id]');
                allTasks.forEach((task) => {
                    if (data.taskId == task.getAttribute('data-task-id')) {
                        tasksContainer.removeChild(task);
                    }
                });
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
        $(container).removeClass('is-hidden');
    }

    function hideList() {
        $(container).addClass('is-hidden');
    }

    init();
    return container;
}

export {newTaskList}

