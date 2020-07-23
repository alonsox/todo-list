import $ from 'jquery';
import {ListInfoPanel} from './list-info-panel';
import {TasksListsContainer} from './task-lists-container';

const MainView = (function() {

    const mainContainer  = document.createElement('main');

    function init() {
        mainContainer.appendChild(ListInfoPanel);
        mainContainer.appendChild(TasksListsContainer);
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