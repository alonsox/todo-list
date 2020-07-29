import $ from 'jquery';
import {createListSearchbar} from  './list-searchbar-section.js';
import {createListContainer} from  './list-container-section.js';
import {createNewListSection} from  './new-list-section.js';

const ListSidebarView = (function() {

    const searchBarSection      = createListSearchbar();
    const newListSection        = createNewListSection(); 
    const listsContainerSection = createListContainer();
    const sidebarContainer      = document.createElement('aside');

    function init() {
        $(sidebarContainer).append(searchBarSection);
        $(sidebarContainer).append(listsContainerSection);
        $(sidebarContainer).append(newListSection);
        
        $(sidebarContainer).addClass('lists-sidebar-l');
    }

    function render() {
        $('.content-l').prepend(sidebarContainer);
    }

    function selectList(listName) {
        // Select all lists
        let allLists = listsContainerSection.querySelectorAll(`.ls_tasks-list`);

        // Click on the matching list
        allLists.forEach((list) => {  
            let name = $(list).attr('data-list-name');
            if (name == listName) {
                // SIMULATE CLICK ON THE LIST
                $(list.querySelector('.ls_icon-name-container')).trigger('click');
                return;
            }
        });
    }

    init();
    return {
        render,
        selectList
    }
})();

export {ListSidebarView}