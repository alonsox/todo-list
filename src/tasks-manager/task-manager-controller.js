import {TaskManager} from './task-manager.js';
import {PubSub} from '../core/pubsub.js';

/**
 * An object that handles the task manager with the corresponding events. It 
 * has a single method called 'init' that subscribes the controller to the 
 * corresponding events.
 */
const TaskManagerController = (function() {

    function init() {

        PubSub.subscribe('LIST_BEING_CREATED', (data) => {
            TaskManager.createList(data.listName);
        });

        PubSub.subscribe('LIST_BEING_DELETED', (data) => {
            TaskManager.deleteList(data.listName);
        });

        PubSub.subscribe('TASK_BEING_CREATED', (data) => {
            TaskManager.createTask(data.listName, data.taskInfo);
        });

        PubSub.subscribe('TASK_BEING_DELETED', (data) => {
            TaskManager.deleteTask(data.listName, data.taskId);
        });

        PubSub.subscribe('TASK_BEING_EDITED', (data) => {
            TaskManager.updateTask(data.listName, data.taskId, data.taskInfo);
        });
    }

    return {
        init
    }
})();

export {TaskManagerController}