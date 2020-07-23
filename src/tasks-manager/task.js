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


export {newTask}