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
    
    let lists = {};

    function createList(listName) {
        if ( !doesListExists(listName) ) {
            lists[listName] = [];
        }
    }

    function deleteList(listName) {
        
        if (doesListExists(listName)) {
            delete lists[listName];
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

        lists[listName].push(newTask(taskInfo));
    }

    function deleteTask(listName, taskId) {
        
        // VERIFY LIST
        if ( !doesListExists(listName) ) {
            return;
        }

        // FIND TASK
        const taskPosition = lists[listName].findIndex((task) => {
            return task.getId() == taskId;
        });

        // DELETE TASK
        if (taskPosition < 0) {
            return;
        } else {
            lists[listName].splice(taskPosition, 1);
        }
    }

    function updateTask(listName, taskId, newTaskInfo) {
        // TODO: update this code in delete and update task
        // VERIFY LIST
        if ( !doesListExists(listName) ) {
            return null;
        }

        // FIND TASK
        const taskPosition = lists[listName].findIndex((task) => {
            return task.getId() == taskId;
        });

        // UPDATE TASK
        if (taskPosition < 0) {
            return;
        } else {
            lists[listName][taskPosition].update(newTaskInfo);
        }
    }

    function doesListExists(listName) {
        return (listName in lists);   
    }

    function save() {
        
    }

    function load() {
        
    }

    return {
        createList,
        deleteList,
        createTask,
        updateTask,
        deleteTask,
        save,
        load,
        // TODO: for testing purpouses. Delete later
        log: function() {
            for (listName in lists) {
                console.log(`List name: ${listName}`);
                lists[listName].forEach(task => {
                    console.log(task.getTaskInfo());
                });
            }
        }
    }
})();

// TODO: test more thouroughly


console.log('CREATE LIST');
TaskManager.createList('list');
TaskManager.createList('list2');
TaskManager.createList('list 3');
TaskManager.createList('list 34');
TaskManager.log();

console.log('DELETE LIST');
TaskManager.deleteList('list2');
TaskManager.deleteList('list 3');
TaskManager.deleteList('list 34');
TaskManager.log();

console.log('CREATE TASK');
TaskManager.createTask('list', {
    subject: 'Task in "list"',
    dueDate: '2020/02/20',
    priority: 'high',
    notes: 'no notes'
});

TaskManager.createTask('Shores', {
    subject: 'Task in no registered list',
    dueDate: '2020/02/20',
    priority: 'low',
    notes: 'Clean kitchen and stuff'
});
TaskManager.log();

console.log('UPDATE TASK');
TaskManager.updateTask('list', 1, {
    subject: 'Does nothing',
    dueDate: '2020/02/20',
    priority: 'medium',
    notes: 'stuff'
});
TaskManager.log();


console.log('DELETE TASK');
TaskManager.deleteTask('Shores', 2);
TaskManager.log();
