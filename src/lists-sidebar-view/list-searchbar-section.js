import $ from 'jquery';

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


        });
    }

    function getSearchBarContent() {
        return searchbar.value;
    }

    // RETURN THE SECTION
    init();
    return searchbarContainer;
}

export {createListSearchbar}