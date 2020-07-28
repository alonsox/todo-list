import $ from 'jquery';
import { PubSub } from '../core/pubsub';
import {SubjectInput} from './subject-input';
import {ListInput} from './list-input';
import {DateInput} from './date-input';
import {PriorityInput} from './priority-input';
import {NotesInput} from './notes-input';
import {DeleteTaskBtn} from './delete-task-btn';

const TaskInfoContainer = (function() {
    // UI ELEMENTS
    const theContainer = document.createElement('div');
    
    function init() {
        createUI();
    }

    function createUI() {
        // ASSEMBLE EVERYTHING
        $(theContainer).addClass('ev_task-info-container-l');
        $(theContainer).append(SubjectInput);
        $(theContainer).append(ListInput);
        $(theContainer).append(DateInput);
        $(theContainer).append(PriorityInput);
        $(theContainer).append(NotesInput);
        $(theContainer).append(DeleteTaskBtn);
    }

    // RETURN THE ELEMENT
    init();
    return theContainer;
})();


export {TaskInfoContainer}