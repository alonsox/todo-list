import {TaskManager} from './task-manager.js';
import {PubSub} from '../core/pubsub.js';

/**
 * An object that handles the task manager with the corresponding events. It 
 * has a single method called 'init' that subscribes the controller to the 
 * corresponding events.
 */
const TaskManagerController = (function() {

    function init() {

        TaskManager.load();

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
            TaskManager.editTask(data.listName, data.taskId, data.taskInfo);
        });

        PubSub.subscribe('LIST_SELECTED', (data) => {
            
            let tasks = TaskManager.getListTasks();

            if (tasks != null) {
                PubSub.publish('LIST_SELECTED_SUCCESS', {
                    listName: data.listName,
                    tasks,
                });
            } else {
                PubSub.publish('LIST_SELECTED_FAILED', {
                    errorMsg: `The list "${data.listName}" does not exist`
                });
            }
        });
    }

    return {
        init
    }
})();

export {TaskManagerController}