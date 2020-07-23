import $ from 'jquery';

function newList(listName, isAllList=false) {

    const listIcon          = document.createElement('i');
    const listNameText      = document.createElement('span');
    const iconNameContainer = document.createElement('div');
    const deleteIcon        = document.createElement('i');
    const container         = document.createElement('div');

    function init() {
        createUI(listName, isAllList);
        initEvents();
    }

    function createUI(listName, isAllList) {
        // ICON
        listIcon.textContent = (isAllList) ? 'event_note' : 'menu';
        listIcon.classList.add(
            'material-icons', 
            'icon-size-normal',
            'ls_list-icon'
        );
        
        // LIST NAME
        listNameText.textContent = listName;
        if (isAllList) {
            listNameText.classList.add('ls_all-lists-text');
        }

        // ICON-NAME CONTAINER
        iconNameContainer.classList.add('ls_list-name');
        iconNameContainer.appendChild(listIcon);
        iconNameContainer.appendChild(listNameText);

        // LIST CONTAINER
        container.classList.add('ls_tasks-list');
        container.appendChild(iconNameContainer);

        // DELETE ICON 
        if (!isAllList) {
            deleteIcon.classList.add(
                'material-icons',
                'icon-size-small',
                'ls_delete-list-btn'
            );
            deleteIcon.textContent = 'clear';
            container.appendChild(deleteIcon);
        }
    }

    function initEvents(isAllList) {
        // TODO: FIX THIS EVENTS AND ADD A CUSTOM EVENT SYSTEM LIKE A PUBUS
        // INITIALIZE EVENTS
        if (!isAllList) {
            deleteIcon.addEventListener('click', () => {


           });
        }

        iconNameContainer.addEventListener('click', () => {

        });
    }

    // RETURN THE LIST
    init();
    return container;
}

export {newList}