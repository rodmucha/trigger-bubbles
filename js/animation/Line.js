

var Line = (function () {
    "use strict";

    function Line(point1, point2, color, lineWidth, canvasContext) {
        this.points = [];
        this.color = color;
        this.canvasContext = canvasContext;
        this.lineWidth = lineWidth || 2;
        this.addPoint(point1);
        this.addPoint(point2);
    }

    var proto = Line.prototype;

    proto.getPoints = function () {
        // returns an array with all points.
        return this.points;
    };

    proto.addPoint = function (point) {
        // adds point to the line.
        this.points.push(point);
    };
    
    proto.addPoint = function (point) {
        // adds point to the line.
        this.points.push(point);
    };


    proto.removePoint = function () {
        // If has more than 1 point, removes one point and returns it.
        var lpoints = this.points;
        return ((lpoints.length > 1) ? lpoints.shift() : new Point(0, 0));
    };

    proto.getLineWidth = function(){
        return this.lineWidth;
    };

    proto.getCanvasContext = function () {
        return this.canvasContext;
    };

    proto.setCanvasContext = function (canvasContext) {
        this.canvasContext = canvasContext;
    };

    proto.getColor = function () {
        return this.color;
    };

    proto.setColor = function (color) {
        this.radius = color;
    };

    proto.draw = function () {
        var self = this;
        var ctx = self.canvasContext;
        var lpoints = self.points;
        var len = lpoints.length;
        var point1 = lpoints[len - 2];
        var point2 = lpoints[len - 1];

        ctx.save();
        // set global composite
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.moveTo(point1.getX(), point1.getY());
        ctx.lineTo(point2.getX(), point2.getY());
        ctx.fillStyle = self.color;
        ctx.lineWidth = self.lineWidth;
        ctx.stroke();
        ctx.restore();
    };
    
    proto.lineTo = function(point){
        this.addPoint(point);
        this.draw();
    };

    return Line;

}());


