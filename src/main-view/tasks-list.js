import {newTask} from './task';


function newTaskList(listName, tasksList) {
    
    const listNameIndicator = document.createElement('div');
    const tasksContainer    = document.createElement('div');
    const container         = document.createElement('div');


    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        listNameIndicator.classList.add('mv_list-title');
        listNameIndicator.textContent = listName;

        tasksList.forEach((task) => {
            tasksContainer.appendChild(newTask(task));
        });

        container.appendChild(listNameIndicator);
        container.appendChild(tasksContainer);
    }

    function initEvents() {

    }

    init();
    return container;
}

export {newTaskList}

