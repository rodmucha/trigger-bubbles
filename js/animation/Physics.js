
var Physics = {};

Physics = (function () {
    var gravity = 9.8;

    Physics.maxHeight = function (point, velocity, angle) {
        var yMax = point.getY() + (Math.pow(velocity * Math.sin(angle), 2)) / (gravity * 2);
        return yMax;
    };

    Physics.maxDistance = function (point, velocity, angle) {
        var xMax = point.getX() + (2 * Math.pow(velocity, 2) * Math.sin(angle) * Math.cos(angle)) / gravity;
        return xMax;
    };

    Physics.durationTime = function (velocity, angle) {
        var tMax = 2 * velocity * Math.sin(angle) / gravity;
        return tMax;
    };

    Physics.velocityX = function (velocity, angle) {
        return (velocity * Math.cos(angle));
    };

    Physics.velocityY = function (velocity, angle) {
        return (velocity * Math.sin(angle));
    };

    return Physics;

}());

