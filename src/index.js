import $ from 'jquery';
import {TaskManagerController} from './tasks-manager/task-manager-controller.js';
import {ListSidebarView} from './lists-sidebar-view/lists-sidebar-view.js'
import { MainView } from './main-view/main-view.js';

$(document).ready(() => {
    MainView.render();
    ListSidebarView.render();
    TaskManagerController.init();
});