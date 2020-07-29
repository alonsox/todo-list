import $ from 'jquery';
import {newTaskList} from './tasks-list';
import {PubSub} from '../core/pubsub';


const TasksListsContainer = (function() {

    const tasksContainer = document.createElement('div');


    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        tasksContainer.classList.add('mv_tasks-container');

    }

    function initEvents() {

        PubSub.subscribe('LISTS_LOADED', (lists) => {
            for (var listName in lists) {
                let taskList = newTaskList(listName, lists[listName]);
                $(taskList).addClass('is-hidden');
                tasksContainer.appendChild(taskList);
            }
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            let newList = newTaskList(data.listName, []);
            newList.classList.add('is-hidden');
            tasksContainer.appendChild(newList);
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            let allLists = tasksContainer.querySelectorAll('[data-list-name]');
            allLists.forEach((list) => {

                let listName = list.getAttribute('data-list-name');
                if (listName == data.listName) {
                    tasksContainer.removeChild(list);                    
                }
            });
        });
    }

    init();
    return tasksContainer;
})();

export {TasksListsContainer}