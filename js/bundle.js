/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a new task.\n * \n * The taskInfo object must have the following properties:\n * // TODO: update the description\n *  + subject\n *  + priority\n *  + dueDate\n *  + notes\n * \n * @param {object} taskInfo The info of the task.\n */\nfunction newTask(taskInfo) {\n\n    if ( !('_idCounter' in newTask) ) {\n        newTask._idCounter = 1;\n    }\n\n    let _id;\n    let taskData = {};\n\n    function init(info) {\n        _id = getNextId();\n        update(info);\n    }\n\n    function getNextId() {\n        return newTask._idCounter++;\n    }\n\n    function getId() {\n        return _id;\n    }\n\n    // TODO: RENAME TO getInfo\n    function getTaskInfo() {\n        return taskData;\n    }\n\n    function update(info) {\n        taskData.subject  = info.subject;\n        taskData.priority = info.priority;\n        taskData.dueDate  = info.dueDate;\n        taskData.notes    = info.notes;\n    }\n\n    init(taskInfo);\n    return {\n        getId,\n        getTaskInfo,\n        update\n    }\n}\n\n\n\nconst TaskManager = (function() {\n    \n    let lists = {};\n\n    function createList(listName) {\n        if ( !doesListExists(listName) ) {\n            lists[listName] = [];\n        }\n    }\n\n    function deleteList(listName) {\n        \n        if (doesListExists(listName)) {\n            delete lists[listName];\n        }\n    }   \n\n    /**\n     * Creates a new task in a specific task list. If the list does not exist \n     * it is created.\n     * \n     * @param {string} listName The name of the list.\n     * @param {object} taskInfo The info the task.\n     */\n    function createTask(listName, taskInfo) {\n        \n        if ( !doesListExists(listName) ) {\n            createList(listName);\n        }\n\n        lists[listName].push(newTask(taskInfo));\n    }\n\n    function deleteTask(listName, taskId) {\n        \n        // VERIFY LIST\n        if ( !doesListExists(listName) ) {\n            return;\n        }\n\n        // FIND TASK\n        const taskPosition = lists[listName].findIndex((task) => {\n            return task.getId() == taskId;\n        });\n\n        // DELETE TASK\n        if (taskPosition < 0) {\n            return;\n        } else {\n            lists[listName].splice(taskPosition, 1);\n        }\n    }\n\n    function updateTask(listName, taskId, newTaskInfo) {\n        // TODO: update this code in delete and update task\n        // VERIFY LIST\n        if ( !doesListExists(listName) ) {\n            return null;\n        }\n\n        // FIND TASK\n        const taskPosition = lists[listName].findIndex((task) => {\n            return task.getId() == taskId;\n        });\n\n        // UPDATE TASK\n        if (taskPosition < 0) {\n            return;\n        } else {\n            lists[listName][taskPosition].update(newTaskInfo);\n        }\n    }\n\n    function doesListExists(listName) {\n        return (listName in lists);   \n    }\n\n    function save() {\n        \n    }\n\n    function load() {\n        \n    }\n\n    return {\n        createList,\n        deleteList,\n        createTask,\n        updateTask,\n        deleteTask,\n        save,\n        load,\n        // TODO: for testing purpouses. Delete later\n        log: function() {\n            for (listName in lists) {\n                console.log(`List name: ${listName}`);\n                lists[listName].forEach(task => {\n                    console.log(task.getTaskInfo());\n                });\n            }\n        }\n    }\n})();\n\n// TODO: test more thouroughly\n\n\nconsole.log('CREATE LIST');\nTaskManager.createList('list');\nTaskManager.createList('list2');\nTaskManager.createList('list 3');\nTaskManager.createList('list 34');\nTaskManager.log();\n\nconsole.log('DELETE LIST');\nTaskManager.deleteList('list2');\nTaskManager.deleteList('list 3');\nTaskManager.deleteList('list 34');\nTaskManager.log();\n\nconsole.log('CREATE TASK');\nTaskManager.createTask('list', {\n    subject: 'Task in \"list\"',\n    dueDate: '2020/02/20',\n    priority: 'high',\n    notes: 'no notes'\n});\n\nTaskManager.createTask('Shores', {\n    subject: 'Task in no registered list',\n    dueDate: '2020/02/20',\n    priority: 'low',\n    notes: 'Clean kitchen and stuff'\n});\nTaskManager.log();\n\nconsole.log('UPDATE TASK');\nTaskManager.updateTask('list', 1, {\n    subject: 'Does nothing',\n    dueDate: '2020/02/20',\n    priority: 'medium',\n    notes: 'stuff'\n});\nTaskManager.log();\n\n\nconsole.log('DELETE TASK');\nTaskManager.deleteTask('Shores', 2);\nTaskManager.log();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });