import $ from 'jquery';
import {PubSub} from '../core/pubsub';
import {newPopupMessage} from '../core/popup';

function createNewListSection() {
    
    // UI ELEMENTS
    const popup      = newPopupMessage();
    const inputText  = document.createElement('input');
    const addListBtn = document.createElement('i');
    const container  = document.createElement('section');

    function init() {
        createUI();
        initEvents();
    }

    function createUI() {
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
        container.appendChild(popup.DomElement);
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
            popup.show(`"${data.listName}" added`, 3000);
        });

        PubSub.subscribe('LIST_NOT_CREATED', (data) => {
            popup.show(`${data.errorMsg}`);
        });
    }

    function notifyListCreation() {
        PubSub.publish('LIST_BEING_CREATED', {
            listName: getListName()
        });
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