import {newTaskList} from './tasks-list';


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

    }

    init();
    return tasksContainer;
})();

export {TasksListsContainer}