/**
 * @fileoverview Provides methods to the calculus of projectile motion.
 *                
 * @author Rodrigo Carvalho
 */

var Physics = {};

Physics = (function () {
    var GRAVITY = 9.8;

    Physics.maxHeight = function (point, velocity, angle) {
        var yMax = point.getY() + (Math.pow(velocity * Math.sin(angle), 2)) / (GRAVITY * 2);
        return yMax;
    };

    Physics.maxDistance = function (point, velocity, angle) {
        var xMax = point.getX() + (2 * Math.pow(velocity, 2) * Math.sin(angle) * Math.cos(angle)) / GRAVITY;
        return xMax;
    };

    Physics.durationTime = function (velocity, angle) {
        var tMax = (2 * velocity * Math.sin(angle)) / GRAVITY;
        return Math.abs(tMax);
    };
    
    Physics.durationTimeVy = function (velocityY) {
        var tMax = (2 * velocityY) / GRAVITY;
        return Math.abs(tMax);
    };

    Physics.velocityX = function (velocity, angle) {
        return (velocity * Math.cos(angle));
    };

    Physics.velocityY = function (velocity, angle) {
        return (velocity * Math.sin(angle));
    };

    return Physics;

}());

