import $ from 'jquery';
import {createListSearchbar} from  './list-searchbar-section.js';
import {createListContainer} from  './list-container-section.js';
import {createNewListSection} from  './new-list-section.js';

const ListSidebarView = (function() {

    const searchBarSection      = createListSearchbar();
    const newListSection        = createNewListSection(); 
    const listsContainerSection = createListContainer();
    const sidebarContainer      = document.createElement('sidebar');

    function init() {
        sidebarContainer.appendChild(searchBarSection);
        sidebarContainer.appendChild(listsContainerSection);
        sidebarContainer.appendChild(newListSection);
    }

    function render() {
        $(sidebarContainer).addClass('lists-sidebar-l');
        $('.content-l').prepend(sidebarContainer);
    }

    init();
    return {
        render
    }
})();

export {ListSidebarView}