import $ from 'jquery';
import { PubSub } from '../core/pubsub';

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
        iconNameContainer.classList.add('ls_icon-name-container');
        iconNameContainer.appendChild(listIcon);
        iconNameContainer.appendChild(listNameText);

        // LIST CONTAINER
        container.classList.add('ls_tasks-list');
        container.setAttribute('data-list-name', listName);
        container.appendChild(iconNameContainer);

        // DELETE ICON 
        if (!isAllList) {
            deleteIcon.classList.add(
                'material-icons',
                'icon-size-small',
                'ls_delete-list-btn',
                'is-hidden'
            );
            deleteIcon.textContent = 'clear';
            container.appendChild(deleteIcon);
        }
    }

    function initEvents() {
        /* Note: Since in the all lists List the delete button is not being 
         * rendered, the actions affecting the delete button don't give errors
         * because the delete button is never null and since it is never shown
         * then nothing happens.
         */

         $(deleteIcon).on('click', () => {
            PubSub.publish('LIST_BEING_DELETED', {
                listName: listNameText.textContent.trim()
            });
        });

        $(iconNameContainer).on('click', () => {
            // TODO: PUBLISH LIST_SELECT
        });

        $(container).on({
            mouseover: showDeleteIcon,

            mouseout: hideDeleteIcon, 
        });
    }

    function showDeleteIcon() {
        deleteIcon.classList.remove('is-hidden');
    }

    function hideDeleteIcon() {
        deleteIcon.classList.add('is-hidden');
    }

    // RETURN THE LIST
    init();
    return container;
}

export {newList}