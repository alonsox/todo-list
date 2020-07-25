/**
 * Creates a new task.
 * 
 * @param {object} taskInfo The info of the task.
 */
function newTask(taskInfo) {

    let _id;
    let taskData = {};

    function init(info) {
        _id = getNextId();
        update(info);
    }

    function getNextId() {

        if ( !('_idCounter' in newTask) ) {
            newTask._idCounter = 1;
        }

        return newTask._idCounter++;
    }

    function getId() {
        return _id;
    }

    // ONLY INFO
    function getTaskInfo() {
        return taskData;
    }

    // ID + INFO
    function getFullInfo() {
        return Object.assign({}, {id: _id}, taskData);
    }

    function update(info) {
        taskData = info;
    }



    init(taskInfo);
    return {
        getId,
        getTaskInfo,
        getFullInfo,
        update
    }
}

export {newTask}