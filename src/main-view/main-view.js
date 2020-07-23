import $ from 'jquery';
import {newListInfoPanel} from './list-info-panel';


function newTask() {

    function init() {

    }

    function createUI() {
        
    }

    function initEvents() {

    }

}

function newTasksContainer() {

    const tasksContainer = document.createElement('div');


    function init() {

    }

    function createUI() {

        tasksContainer.classList.add('mv_tasks-container');
    }

    function initEvents() {

    }


    init();
    return tasksContainer;
}




const MainView = (function() {

    const listInfoPanel  = newListInfoPanel();
    const tasksContainer = newTasksContainer();
    const mainContainer  = document.createElement('main');

    function init() {
        mainContainer.appendChild(listInfoPanel);
        mainContainer.appendChild(tasksContainer);
        mainContainer.classList.add('main-view-l');
    }

    function render() {
        $('.content-l').prepend(mainContainer);
    }

    init();
    return {
        render
    }
})();

export {MainView}