import {newTaskList} from './tasks-list';
import {PubSub} from '../core/pubsub';


const TasksListsContainer = (function() {

    const tasksContainer = document.createElement('div');


    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        tasksContainer.classList.add('mv_tasks-container');

        let aux = [
            {
                id: 1,
                subject: 'Test task',
                notes: 'notes',
                dueDate: '2020/89/89',
                done: false,
                priority: 'low'
            },
            {
                id: 2,
                subject: 'Test task',
                notes: 'notes',
                dueDate: '2020/89/89',
                done: false,
                priority: 'medium'
            }
        ];
        tasksContainer.appendChild(newTaskList('Test list', aux));
    }

    function initEvents() {

        PubSub.subscribe('LISTS_LOADED', (data) => {
            // TODO: add tasks info in the datas
            console.log('loading lists in TLC');
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            // TODO: add tasks info in the data
            console.log('Creating list in TLC');
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            console.log('Deleting list in TLC');
        });
    }

    init();
    return tasksContainer;
})();

export {TasksListsContainer}