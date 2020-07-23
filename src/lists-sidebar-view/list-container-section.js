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
            const aux = listsContainer.querySelector(`[data-list-name="${data.listName}"]`);
            listsContainer.removeChild(aux);
        });

        PubSub.subscribe('LIST_NOT_DELETED', (data) => {
            alert(`List could not be deleted. Error: ${data.errorMsg}`);
        });

        PubSub.subscribe('LIST_BEING_SEARCHED', (data) => {
            
            /* Select all lists */
            let toHide = listsContainer.querySelectorAll(`[data-list-name]`);

            /* Show only the lists that have 'data.text' in its name */
            toHide.forEach((list) => {  
                let listName = list.getAttribute('data-list-name');
                if (listName.toLowerCase() == 'all') {
                    // DO NOTHING
                } else if (listName.includes(data.text)) {
                    list.classList.remove('is-hidden');
                } else {
                    list.classList.add('is-hidden');
                }
            })
        });
    }

    init();
    return listsContainer;
}

export {createListContainer}