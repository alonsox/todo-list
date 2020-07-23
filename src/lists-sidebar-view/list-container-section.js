import $ from 'jquery';
import {newList} from './list-entry.js'


function createListContainer() {

    const listsContainer = document.createElement('section');

    function init() {
        createUI();
    }

    function createUI() {
        // LISTS CONTAINER
        listsContainer.classList.add('ls_lists-container');
        listsContainer.appendChild(newList('All', true));
        listsContainer.appendChild(newList('My list'));
    }

    init();
    return listsContainer;
}

export {createListContainer}