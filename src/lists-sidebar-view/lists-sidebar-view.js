import $ from 'jquery';

const ListSidebarView = (function() {

    let sidebarContainer = document.createElement('sidebar');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {

        // SIDEBAR HEADER
        const listSearchbar = document.createElement('input');
        listSearchbar.setAttribute('type', 'text');
        listSearchbar.setAttribute('placeholder', 'Search list');
        listSearchbar.classList.add('ls_list-searchbar');
        
        const listSearchbarSection = document.createElement('section');
        listSearchbarSection.classList.add('ls_list-searchbar-wrapper');
        listSearchbarSection.appendChild(listSearchbar);

        // LIST CONTAINER
        // All lists entry
        const allListsIcon = document.createElement('i');
        allListsIcon.classList.add(
            'material-icons', 
            'icon-size-normal',
            'ls_list-icon'
        );
        allListsIcon.textContent = 'event_note';
            
        const allListsName = document.createElement('span');
        allListsName.classList.add('ls_all-lists-text');
        allListsName.textContent = 'All';

        const allListsNameContainer = document.createElement('div');
        allListsNameContainer.classList.add('ls_list-name');
        allListsNameContainer.appendChild(allListsIcon);
        allListsNameContainer.appendChild(allListsName);

        const allLists = document.createElement('div');
        allLists.classList.add('ls_tasks-list');
        allLists.appendChild(allListsNameContainer);

        // The container
        const listsContainer = document.createElement('section');
        listsContainer.classList.add('ls_lists-container');
        listsContainer.appendChild(allLists);


        // NEW LIST INPUT
        const popupText = document.createElement('span');
        popupText.classList.add('inline-popup-text');
        popupText.textContent = 'Some text...';

        const newListSearchbar = document.createElement('input');
        newListSearchbar.setAttribute('type', 'text');
        newListSearchbar.setAttribute('placeholder', "New list's name");
        newListSearchbar.classList.add('ls_new-list-searchbar');

        const newListAddBtn = document.createElement('i');
        newListAddBtn.classList.add(
            'material-icons',
            'icon-size-normal',
            'ls_add-list-btn'
        );
        newListAddBtn.textContent = 'add';

        const newListInfo = document.createElement('section');
        newListInfo.classList.add('ls_new-list-info', 'inline-popup');
        newListInfo.appendChild(popupText);
        newListInfo.appendChild(newListSearchbar);
        newListInfo.appendChild(newListAddBtn);

        // APPEND THE SECTIONS
        sidebarContainer.appendChild(listSearchbarSection);
        sidebarContainer.appendChild(listsContainer);
        sidebarContainer.appendChild(newListInfo);
    }

    function initEvents() {

    }

    function render() {
        sidebarContainer.classList.add('lists-sidebar-l');
        $('.content-l').prepend(sidebarContainer);
    }

    init();
    return {
        render
    }
})();

export {ListSidebarView}