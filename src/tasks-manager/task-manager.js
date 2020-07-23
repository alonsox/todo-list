import {newTask} from './task.js';
import {PubSub} from '../core/pubsub.js';

const TaskManager = (function() {
    
    let taskLists = {};

    function createList(listName) {
        if (doesListExists(listName)){
            PubSub.publish('LIST_NOT_CREATED', {
                errorMsg: `List "${listName}" already exists`
            });
        } else {
            taskLists[listName] = [];
            saveList(listName);
            PubSub.publish('LIST_CREATED', {listName});
        } 
    }

    function deleteList(listName) {
        
        if (doesListExists(listName)) {
            localStorage.removeItem(listName);
            delete taskLists[listName];
            PubSub.publish('LIST_DELETED', {listName});
        } else {
            PubSub.publish('LIST_NOT_DELETED', {
                errorMsg: `List "${listName}" does not exists`
            })
        }
    }   

    /**
     * Creates a new task in a specific task list. If the list does not exist 
     * it is created.
     * 
     * @param {string} listName The name of the list.
     * @param {object} taskInfo The info the task.
     */
    function createTask(listName, taskInfo) {
        
        if ( !doesListExists(listName) ) {
            createList(listName);
        }

        let task = newTask(taskInfo);
        taskLists[listName].push();

        // SAVE CHANGES
        saveList(listName);

        // NOTIFY CHANGES
        PubSub.publish('TASK_CREATED', {
            listName, 
            taskInfo, 
            taskId: task.getId()
        });
    }

    function deleteTask(listName, taskId) {
        
        // FIND TASK
        const taskPosition = findTaskIndexById(listName, taskId);
        
        // DELETE TASK
        if (taskPosition < 0) {
            return;
        } else {
            taskLists[listName].splice(taskPosition, 1);
        }

        // SAVE CHANGES
        saveList(listName);

        // NOTIFY CHANGES
        PubSub.publish('TASK_DELETED', {listName, taskId});
    }

    function updateTask(listName, taskId, newTaskInfo) {

        // FIND TASK
        const taskPosition = findTaskIndexById(listName, taskId);

        // UPDATE TASK
        if (taskPosition < 0) {
            return;
        } else {
            taskLists[listName][taskPosition].update(newTaskInfo);
        }

        // SAVE CHANGES
        saveList(listName);

        // NOTIFY CHANGES
        PubSub.publish('TASK_EDITED', {listName, taskId, taskInfo});
    }

    function findTaskIndexById(listName, taskId) {
        // VERIFY LIST
        if ( !doesListExists(listName) ) {
            return -1;
        }

        // FIND TASK
       return taskLists[listName].findIndex((task) => {
            return task.getId() == taskId;
        });
    }

    function doesListExists(listName) {
        return (listName in taskLists);   
    }

    function saveList(listName) {

        let tasksInfo = taskLists[listName].map((task) => task.getTaskInfo());
        localStorage.setItem(listName, JSON.stringify(tasksInfo));
    }

    function load() {
        let listNames = []
        for (let i = 0; i < localStorage.length; i++) {
            let listName = localStorage.key(i);
            let tasksInfo = JSON.parse(localStorage.getItem(listName));
            taskLists[listName] = tasksInfo.map((task) => newTask(task));

            listNames.push(listName);
        }

        PubSub.publish('LISTS_LOADED', {listNames});
    }

    // TODO: for testing purpouses. Delete later
    function log() {
        for (listName in taskLists) {
            console.log(`List name: ${listName}`);
            taskLists[listName].forEach(task => {
                console.log(task.getTaskInfo());
            });
        }
    }

    return {
        // log, // TODO: for testing purpouses. Delete later
        createList,
        deleteList,
        createTask,
        updateTask,
        deleteTask,
        load
    }
})();


export {TaskManager}