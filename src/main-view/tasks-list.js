import {newTask} from './task';
import {PubSub} from '../core/pubsub';


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
            tasksContainer.appendChild(newTask(listName, task));
        });

        container.appendChild(listNameIndicator);
        container.appendChild(tasksContainer);
    }

    function initEvents() {

        PubSub.subscribe('LIST_SELECTED_SUCCESS', (data) => {
            if (data.listName == listName) {
                console.log(`Showing list ${listName}`);
            } else{
                console.log(`Hiding list ${listName}`);
            }
        });

        PubSub.subscribe('TASK_CREATED', (data) => {

            if (data.listName == listName) {
                console.log(`creating task in ${listName}`);
            }
            // TODO: add tasks info in the datas
        });

        PubSub.subscribe('TASK_DELETED', (data) => {

            if (data.listName == listName) {
                console.log(`deleting task in ${listName}`);
            }
        });
    }

    init();
    return container;
}

export {newTaskList}

