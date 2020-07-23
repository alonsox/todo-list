import $ from 'jquery';
import {TaskManagerController} from './tasks-manager/task-manager-controller.js';

$(document).ready(() => {
    TaskManagerController.init();
});