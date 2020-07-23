
const PubSub = (function() {

    let subscribers = {};

    function publish(eventName, data) {
       
        if (!(eventName in subscribers)) {
            return;
        }

        subscribers[eventName].forEach(callback => {
            callback(data);
        });
    }

    function subscribe(eventName, callback) {
        
        if (!(eventName in subscribers)) {
            subscribers[eventName] = [];
        }

        subscribers[eventName].push(callback);
    }

    return {
        subscribe,
        publish
    }
})();

export {PubSub}