import $ from 'jquery';
import { PubSub } from '../core/pubsub';

function createListSearchbar() {
    
    const searchbar = document.createElement('input');
    const searchbarContainer = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // THE SEARCHBAR
        searchbar.classList.add('ls_list-searchbar');
        searchbar.setAttribute('type', 'text');
        searchbar.setAttribute('placeholder', 'Search list');

        // THE CONTAINER
        searchbarContainer.classList.add('ls_list-searchbar-wrapper');
        searchbarContainer.appendChild(searchbar);
    }

    function initEvents() {
        $(searchbar).on('input', () => {
            PubSub.publish('LIST_BEING_SEARCHED', {
                text: getSearchBarContent()
            });
        });
    }

    function getSearchBarContent() {
        return searchbar.value.trim();
    }

    // RETURN THE SECTION
    init();
    return searchbarContainer;
}

export {createListSearchbar}