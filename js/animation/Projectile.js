/**
 * @fileoverview Representation of one projectile and possibility to draw it.
 *                
 * @author Rodrigo Carvalho
 */

var Projectile = (function () {
    "use strict";

    var GRAVITY = 9.8;
    var HALF_OF_GRAVITY = 4.9;
    var HALF_OF_PI = (Math.PI / 2);

    function Projectile(parentContainer, bounceFactor, velocity, angle, point, radius, color, withTrail, lineWidth) {
        var pcanvas, child;
        var childNodes = parentContainer.childNodes;
        var len = childNodes.length;
        var mWidth = Number.parseInt(parentContainer.style.width);
        var mHeight = Number.parseInt(parentContainer.style.height);

        for (var i = 0; i < len; i++) {
            child = childNodes[i];

            if (child.getAttribute('class') === 'empty') {
                child.setAttribute('class', '');
                pcanvas = child;
                break;
            }
        }

        if (!pcanvas) {
            pcanvas = document.createElement('canvas');
            pcanvas.setAttribute('id', childNodes.length);
            pcanvas.setAttribute('width', mWidth);
            pcanvas.setAttribute('height', mHeight);
            pcanvas.style.position = 'absolute';
            pcanvas.style['background-color'] = 'transparent';
            parentContainer.appendChild(pcanvas);
        }

        this.bounceFactor = bounceFactor;
        this.maxWindowWidth = mWidth;
        this.maxWindowHeight = mHeight;
        this.initialX = point.getX();
        this.initialY = point.getY();
        this.angle = angle;
        this.velocityX = Physics.velocityX(velocity, angle);
        this.velocityY = Physics.velocityY(velocity, angle);
        this.durationTime = Physics.durationTime(velocity, angle);
        this.canvas = pcanvas;
        this.context = pcanvas.getContext('2d');
        this.circle = new Circle(point, radius, color, this.context);

        if (withTrail) {
            this.trail = new Line(new Point(point.getX(), point.getY()),
                    new Point(point.getX(), point.getY()), color, lineWidth, this.context);
        } else {
            this.trail = null;
        }

        this.starting = true;
        this.initialTime = (new Date()).getTime();
    }

    var proto = Projectile.prototype;

    proto.draw = function () {
        var self = this;
        var circle = this.circle;

        // draw circle
        circle.draw();

        if (this.durationTime < 0.1) {
            return;
        }

        var currentTime = (new Date()).getTime();
        var circleRadius = circle.getRadius();
        var oldPoint = circle.getPoint();
        var oldX = oldPoint.getX();
        var oldY = oldPoint.getY();
        var elapsedTime = (currentTime - self.initialTime) * 0.001;


        // Motion calculus
        var newX = self.initialX + (self.velocityX * elapsedTime);
        var newY = self.initialY + (self.velocityY * elapsedTime) +
                HALF_OF_GRAVITY * Math.pow(elapsedTime, 2);

        // update circle
        oldPoint.setX(newX);
        oldPoint.setY(newY);

        //Todo
        if (self.trail) {
            var npoint = self.trail.removePoint();
            npoint.setX(newX);
            npoint.setY(newY);

            if (newX > (self.initialX + circleRadius)) {
                self.trail.lineTo(npoint);
            } else {
                self.trail.addPoint(npoint);
            }
        }

        if (this.isAtGround() && (elapsedTime > 0.001)) {
            var bounceFactor = this.getBounceFactor();
            var velocityX = this.getVelocityX() * bounceFactor;
            var velocityY = (this.getVelocityY() + GRAVITY * elapsedTime) * bounceFactor;

            if (Math.abs(this.angle) !== HALF_OF_PI) {
                velocityY = -velocityY;
            }

            this.setVelocityX(velocityX);
            this.setVelocityY(velocityY);
            this.setInitialX(circle.getPoint().getX());
            this.setInitialY((this.maxWindowHeight - circleRadius));
            this.setDurationTime(Physics.durationTimeVy(velocityY));
            this.restartTime();
        }
    };

    proto.update = function () {
        var self = this;
        var circle = this.circle;

        var currentTime = (new Date()).getTime();
        var oldPoint = circle.getPoint();
        var elapsedTime = (currentTime - self.initialTime) / 1000;


        // Motion calculus
        var newX = self.initialX + (self.velocityX * elapsedTime);
        var newY = self.initialY + (self.velocityY * elapsedTime) + HALF_OF_GRAVITY * Math.pow(elapsedTime, 2);

        // update circle
        oldPoint.setX(newX);
        oldPoint.setY(newY);
    };

    proto.erase = function () {
        this.context.clearRect(0, 0, this.maxWindowWidth, this.maxWindowHeight);
    };

    proto.isVisible = function () {
        var actualPoint = this.circle.getPoint();
        var actualX = actualPoint.getX();
        var radius = this.circle.getRadius();
        return ((actualX + radius) > 0 && (actualX - radius) < this.maxWindowWidth);
    };

    proto.isAtGround = function () {
        var actualY = this.circle.getPoint().getY();
        var radius = this.circle.getRadius();
        return (actualY + radius >= this.maxWindowHeight);
    };

    proto.getCanvas = function () {
        return this.canvas;
    };

    proto.getInitialX = function () {
        return this.initialX;
    };

    proto.getInitialY = function () {
        return this.initialY;
    };

    proto.setInitialX = function (iniX) {
        this.initialX = iniX;
    };

    proto.setInitialY = function (iniY) {
        this.initialY = iniY;
    };

    proto.getId = function () {
        return this.canvas.id;
    };

    proto.getVelocityX = function () {
        return this.velocityX;
    };

    proto.getVelocityY = function () {
        return this.velocityY;
    };

    proto.setVelocityX = function (velX) {
        this.velocityX = velX;
    };

    proto.setVelocityY = function (velY) {
        this.velocityY = velY;
    };

    proto.setDurationTime = function (durationT) {
        this.durationTime = durationT;
    };

    proto.getDurationTime = function () {
        return this.durationTime;
    };

    proto.getAngle = function () {
        return this.angle;
    };

    proto.setAngle = function (angle) {
        this.angle = angle;
    };

    proto.getCircle = function () {
        return this.circle;
    };

    proto.getBounceFactor = function () {
        return this.bounceFactor;
    };

    proto.hasTrail = function () {
        return (this.trail !== null);
    };

    proto.getTrail = function () {
        return this.trail;
    };

    proto.restartTime = function () {
        this.initialTime = (new Date()).getTime();
    };

    return Projectile;

}());

