import $ from 'jquery';
import {TaskManagerController} from './tasks-manager/task-manager-controller.js';
import {ListSidebarView} from './lists-sidebar-view/lists-sidebar-view.js'

$(document).ready(() => {
    ListSidebarView.render();
    TaskManagerController.init();
});