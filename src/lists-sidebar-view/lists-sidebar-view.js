import $ from 'jquery';

const ListSidebarView = (function() {

    let sidebarContainer = document.createElement('sidebar');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        sidebarContainer.appendChild(createListSearchbarSection());
        sidebarContainer.appendChild(createListsContainerSection());
        sidebarContainer.appendChild(createNewListSection());
    }

    function createListSearchbarSection() {
        // THE SEARCHBAR
        const listSearchbar = document.createElement('input');
        listSearchbar.setAttribute('type', 'text');
        listSearchbar.setAttribute('placeholder', 'Search list');
        listSearchbar.classList.add('ls_list-searchbar');

        // THE CONTAINER
        const listSearchbarSection = document.createElement('section');
        listSearchbarSection.classList.add('ls_list-searchbar-wrapper');
        listSearchbarSection.appendChild(listSearchbar);

        return listSearchbarSection;
    }

    function createListsContainerSection() {
       
        // LISTS CONTAINER
        const listsContainer = document.createElement('section');
        listsContainer.classList.add('ls_lists-container');
        listsContainer.appendChild(createList('All', 'all'));

        return listsContainer;
    }

    function createNewListSection() {
        // POPUP TEXT
        const popupText = document.createElement('span');
        popupText.classList.add('inline-popup-text');
        popupText.textContent = 'Some text...';

        // INPUT FOR THE NEW LIST'S NAME
        const newListInput = document.createElement('input');
        newListInput.setAttribute('type', 'text');
        newListInput.setAttribute('placeholder', "New list's name");
        newListInput.classList.add('ls_new-list-searchbar');

        // BUTTON FOR ADDING THE NEW LIST
        const newListAddBtn = document.createElement('i');
        newListAddBtn.classList.add(
            'material-icons',
            'icon-size-normal',
            'ls_add-list-btn'
        );
        newListAddBtn.textContent = 'add';

        // THE SECTION CONTAINER
        const newListInfo = document.createElement('section');
        newListInfo.classList.add('ls_new-list-info', 'inline-popup');
        newListInfo.appendChild(popupText);
        newListInfo.appendChild(newListInput);
        newListInfo.appendChild(newListAddBtn);

        return newListInfo;
    }

    function initEvents() {

    }

    function createList(listName, listType='normal') {
        // ICON
        const listIcon = document.createElement('i');
        listIcon.classList.add(
            'material-icons', 
            'icon-size-normal',
            'ls_list-icon'
        );
        
        // LIST NAME
        const listNameText = document.createElement('span');
        listNameText.textContent = listName;

        // ICON-NAME CONTAINER
        const iconNameContainer = document.createElement('div');
        iconNameContainer.classList.add('ls_list-name');
        iconNameContainer.appendChild(listIcon);
        iconNameContainer.appendChild(listNameText);

        // LIST CONTAINER
        const listContainer = document.createElement('div');
        listContainer.classList.add('ls_tasks-list');
        listContainer.appendChild(iconNameContainer);


        if (listType == 'normal') {
            // Change icon
            listIcon.textContent = 'menu';

            // Add delete button
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add(
                'material-icons',
                'icon-size-small',
                'ls_delete-list-btn'
            );
            deleteIcon.textContent = 'clear';
            listContainer.appendChild(deleteIcon);
        } else {
            // Change icon
            listIcon.textContent = 'event_note';

            // Add formating to the name
            listNameText.classList.add('ls_all-lists-text');
        }

        return listContainer;
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