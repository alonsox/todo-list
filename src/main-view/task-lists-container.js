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

        PubSub.subscribe('LISTS_LOADED', (data) => {
            // TODO: add tasks info in the datas
            console.log('loading lists in TLC');
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            let newList = newTaskList(data.listName, []);
            newList.classList.add('is-hidden');
            tasksContainer.appendChild(newList);
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            console.log('Deleting list in TLC');
        });
    }

    init();
    return tasksContainer;
})();

export {TasksListsContainer}