import $ from 'jquery';

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
        addListBtn.addEventListener('click', () => {

            
        });
    }

    function showMessage(msg) {

    }

    function getListName() {
        return inputText.value;
    }

    function clearInputText() {
        inputText.value = '';
    }

    // RETURN THE CONTAINER
    init();
    return container;
}

export {createNewListSection}