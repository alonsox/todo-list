import $ from 'jquery';
import {PubSub} from '../core/pubsub';

function createNewListSection() {
    
    // UI ELEMENTS
    const popupText  = document.createElement('span');
    const inputText  = document.createElement('input');
    const addListBtn = document.createElement('i');
    const container  = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
        // POPUP TEXT
        popupText.classList.add('inline-popup-text');
        popupText.textContent = 'Some text...';

        // INPUT FOR THE NEW LIST'S NAME
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('placeholder', "New list's name");
        inputText.classList.add('ls_new-list-searchbar');

        // BUTTON FOR ADDING THE NEW LIST
        addListBtn.classList.add(
            'material-icons',
            'icon-size-normal',
            'ls_add-list-btn'
        );
        addListBtn.textContent = 'add';

        // THE SECTION CONTAINER
        container.classList.add('ls_new-list-info', 'inline-popup');
        container.appendChild(popupText);
        container.appendChild(inputText);
        container.appendChild(addListBtn);
    }

    function initEvents() {
        $(addListBtn).on('click', notifyListCreation);

        $(inputText).on('keypress', (e) => {
            if (e.which == 13) {
                notifyListCreation();
            }
        });

        PubSub.subscribe('LIST_CREATED', (data) => {
            clearInputText();
            showPopup(`"${data.listName}" added`, 3000);
        });

        PubSub.subscribe('LIST_NOT_CREATED', (data) => {
            showPopup(`${data.errorMsg}`);
        });
    }

    function notifyListCreation() {
        PubSub.publish('LIST_BEING_CREATED', {
            listName: getListName()
        });
    }

    function showPopup(msg, timeout=-1) {
        hidePopup();
        popupText.textContent = msg;
        popupText.classList.add('inline-popup-show');

        if (timeout > 0) {
            setTimeout(hidePopup, timeout);
        }
    }

    function hidePopup() {
        popupText.classList.remove('inline-popup-show');
    }

    function getListName() {
        return inputText.value.trim();
    }

    function clearInputText() {
        inputText.value = '';
    }

    // RETURN THE CONTAINER
    init();
    return container;
}

export {createNewListSection}