/**
 * @fileoverview Representation of one circle and possibility to draw it.
 *                
 * @author Rodrigo Carvalho
 */

var Circle = (function () {
    "use strict";

    var PI2 = Math.PI * 2;

    function Circle(point, radius, color, canvasContext) {
        this.point = point;
        this.radius = radius;
        this.color = color;
        this.canvasContext = canvasContext;
    }

    var proto = Circle.prototype;

    proto.draw = function () {
        var self = this;
        var ctx = self.canvasContext;
        var p = self.getPoint();

        ctx.save();
        // set global composite
        ctx.globalCompositeOperation = "copy";
        // draw circle
        ctx.beginPath();
        ctx.arc(p.getX(), p.getY(), self.radius, 0, PI2, true);
        ctx.fillStyle = self.color;
        ctx.fill();
        ctx.restore();
    };

    proto.moveTo = function (point) {
        this.setPoint(point);
        this.draw();
    };

    proto.getCanvasContext = function () {
        return this.canvasContext;
    };

    proto.getColor = function () {
        return this.color;
    };

    proto.getRadius = function () {
        return this.radius;
    };

    proto.getPoint = function () {
        return this.point;
    };

    proto.setPoint = function (point) {
        this.point = point;
    };

    proto.setColor = function (color) {
        this.radius = color;
    };

    proto.setCanvasContext = function (canvasContext) {
        this.canvasContext = canvasContext;
    };

    return Circle;

}());

