import $ from 'jquery';

function newPopupMessage() {

    const popupText = document.createElement('span');

    
    function init() {
        createUI();
        initEvents();
    }
    
    function createUI() {
        $(popupText).addClass('inline-popup-text');
        $(popupText).text('Text');
    }

    function initEvents() {
        $(popupText).on('click', hide);
    }

    function show(text, timeout) {
        hide();
        $(popupText).text(text);
        $(popupText).addClass('inline-popup-show');

        if (timeout > 0) {
            setTimeout(hide, timeout);
        }
    }

    function hide () {
        $(popupText).removeClass('inline-popup-show');
    }

    init();
    return {
        show,
        hide,
        get DomElement() { return popupText }
    }
}


export {newPopupMessage}