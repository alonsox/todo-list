/**
 * Creates a new task.
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

    function getTaskInfo() {
        return taskData;
    }

    function update(info) {
        taskData = info;
    }

    init(taskInfo);
    return {
        getId,
        getTaskInfo,
        update
    }
}

export {newTask}