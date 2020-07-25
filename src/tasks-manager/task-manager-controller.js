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
            TaskManager.editTask(data.listName, data.taskId, data.newTaskInfo);
        });


        PubSub.subscribe('TASK_SELECTED', (data) => {
            let taskInfo = TaskManager.getTaskInfo(data.listName, data.taskId);

            if (taskInfo != null) {
                PubSub.publish('TASK_SELECTED_SUCCESS', {
                    listName: data.listName,
                    taskInfo
                });
            } else {
                PubSub.publish('TASK_SELECTED_FAILED', {
                    errorMsg: `Either the list "${data.listName}" or the 
                    task with ID=${data.taskId} does not exist`
                });
            }
        });
    }

    return {
        init
    }
})();

export {TaskManagerController}