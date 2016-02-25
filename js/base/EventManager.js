
var EventManager = {};

EventManager = (function () {
    "use strict";

    EventManager.addHandler = function (element, type, handler) {

        if (element.addEventListener) {
            // Modern Browsers
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // IE 8
            element.attachEvent("on" + type, handler);
        } else {
            // Old Browsers
            element["on" + type] = handler;
        }
    };

    EventManager.removeHandler = function (element, type, handler) {

        if (element.removeEventListener) {
            // Modern Browsers
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            // IE 8
            element.detachEvent("on" + type, handler);
        } else {
            // Old Browsers
            element["on" + type] = null;
        }
    };

    EventManager.preventDefault = function (event) {

        if (event.preventDefault) {
            event.preventDefault();
        } else {
            // IE <= 8
            event.returnValue = false;
        }
    };

    EventManager.stopPropagation = function (event) {

        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            // IE <= 8
            event.cancelBubble = true;
        }
    };

    EventManager.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    EventManager.getEvent = function (event) {
        return event ? event : window.event;
    };
    
    EventManager.getCharCode = function(event){
        if (typeof event.charCode === "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    EventManager.createMouseEvent = function (type, canBubble, cancelable, view,
            detail, screenX, screenY, clientX, clientY,
            ctrlKey, altKey, shiftKey, metaKey,
            button, relatedTarget) {

        var event;

        if (window.dispatchEvent) {
            //create event object
            event = document.createEvent("MouseEvents");

            //initialize the event object
            event.initMouseEvent(type, canBubble, cancelable, view,
                    detail, screenX, screenY, clientX, clientY,
                    ctrlKey, altKey, shiftKey, metaKey,
                    button, relatedTarget);
        } else {
            // IE

            //create event object
            event = document.createEventObject();

            //initialize the event object
            event.type = type;
            event.canBubble = canBubble;
            event.cancelable = cancelable;
            event.view = view;
            event.detail = detail;
            event.screenX = screenX;
            event.screenY = screenY;
            event.clientX = clientX;
            event.clientY = clientY;
            event.ctrlKey = ctrlKey;
            event.altKey = altKey;
            event.shiftKey = shiftKey;
            event.metaKey = metaKey;
            event.button = button;
            event.relatedTarget = relatedTarget;
        }

        return event;
    };

    EventManager.dispatchEvent = function (element, event) {
        if (window.dispatchEvent) {
            element.dispatchEvent(event);
        } else {
            // IE

            var eventName = "on";
            eventName += event.type;
            element.fireEvent(eventName, event);
        }
    };
    
    return EventManager;

}());




