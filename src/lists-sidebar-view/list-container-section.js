import $ from 'jquery';
import {newList} from './list-entry';
import {PubSub} from '../core/pubsub';


function createListContainer() {

    const listsContainer = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // LISTS CONTAINER
        listsContainer.classList.add('ls_lists-container');
        listsContainer.appendChild(newList('All', true));
    }

    function initEvents() {
        PubSub.subscribe('LIST_CREATED', (data) => {
            listsContainer.appendChild(newList(data.listName));
        });

        PubSub.subscribe('LISTS_LOADED', (data) => {
            data.listNames.forEach(name => {
                listsContainer.appendChild(newList(name));
            });
        });

        PubSub.subscribe('LIST_DELETED', (data) => {
            // TODO: IMPLEMENT
        });

        PubSub.subscribe('LIST_NOT_DELETED', (data) => {
            // TODO: IMPLEMENT
        });
    }

    init();
    return listsContainer;
}

export {createListContainer}