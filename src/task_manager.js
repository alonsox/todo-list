/**
 * Creates a new task.
 * 
 * The taskInfo object must have the following properties:
 * // TODO: update the description
 *  + subject
 *  + priority
 *  + dueDate
 *  + notes
 * 
 * @param {object} taskInfo The info of the task.
 */
function newTask(taskInfo) {

    if ( !('_idCounter' in newTask) ) {
        newTask._idCounter = 1;
    }

    let _id;
    let taskData = {};

    function init(info) {
        _id = getNextId();
        update(info);
    }

    function getNextId() {
        return newTask._idCounter++;
    }

    function getId() {
        return _id;
    }

    // TODO: RENAME TO getInfo
    function getTaskInfo() {
        return taskData;
    }

    function update(info) {
        taskData.subject  = info.subject;
        taskData.priority = info.priority;
        taskData.dueDate  = info.dueDate;
        taskData.notes    = info.notes;
    }

    init(taskInfo);
    return {
        getId,
        getTaskInfo,
        update
    }
}

const TaskManager = (function() {
    
    let taskLists = {};

    function createList(listName) {
        if ( !doesListExists(listName) ) {
            taskLists[listName] = [];
        }

        // SAVE CHANGES
        saveList(listName);
    }

    function deleteList(listName) {
        
        if (doesListExists(listName)) {
            delete taskLists[listName];
        }

        // REMOVE FROM STORAGE
        localStorage.removeItem(listName);
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

        taskLists[listName].push(newTask(taskInfo));

        // SAVE CHANGES
        saveList(listName);
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
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let tasksInfo = JSON.parse(localStorage.getItem(key));
            taskLists[key] = tasksInfo.map((task) => newTask(task));
        }
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
