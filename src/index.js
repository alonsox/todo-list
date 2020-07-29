import $ from 'jquery';
import {TaskManagerController} from './tasks-manager/task-manager-controller.js';
import {ListSidebarView} from './lists-sidebar-view/lists-sidebar-view.js'
import { MainView } from './main-view/main-view.js';
import { EditView } from './edit-view/edit-view.js';

$(document).ready(() => {
    EditView.render();
    MainView.render();
    ListSidebarView.render();
    TaskManagerController.init();

    // Select all list
    ListSidebarView.selectList('All');
});