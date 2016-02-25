

var Point = (function () {
    "use strict";

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    var proto = Point.prototype;

    proto.getX = function () {
        return this.x;
    };

    proto.getY = function () {
        return this.y;
    };

    proto.setX = function (x) {
        this.x = x;
    };

    proto.setY = function (y) {
        this.y = y;
    };
    
    return Point;

}());

