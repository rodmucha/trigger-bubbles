
var Projectile = (function () {
    "use strict";

    var HALF_GRAVITY = 4.9;

    function Projectile(parentContainer, bounceFactor, velocity, angle, point, radius, color, withTrail, lineWidth) {
        var pcanvas, child;
        var childNodes = parentContainer.childNodes;
        var len = childNodes.length;
        var mWidth = Number.parseInt(parentContainer.style.width);
        var mHeight = Number.parseInt(parentContainer.style.height);

        for (var i = 0; i < len; i++) {
            child = childNodes[i];

            if (child.hasOwnProperty('class') && child['class'] === 'empty') {
                pcanvas = child;
            }
        }

        if (!pcanvas) {
            pcanvas = document.createElement('canvas');
            pcanvas.setAttribute('id', childNodes.length);
            pcanvas.setAttribute('width', mWidth);
            pcanvas.setAttribute('height', mHeight);
            parentContainer.appendChild(pcanvas);
        }

        this.bounceFactor = bounceFactor;
        this.maxWindowWidth = mWidth;
        this.maxWindowHeight = mHeight;
        this.initialX = point.getX();
        this.initialY = point.getY();
        this.velocityX = Physics.velocityX(velocity, angle);
        this.velocityY = Physics.velocityY(velocity, angle);
        this.maxHeight = Physics.maxHeight(point, velocity, angle);
        this.canvas = pcanvas;
        this.context = pcanvas.getContext('2d');
        this.circle = new Circle(point, radius, color, this.context);

        if (withTrail) {
            this.trail = new Line(point, point, color, lineWidth, this.context);
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


        var currentTime = (new Date()).getTime();
        var circleRadius = circle.getRadius();
        var oldPoint = circle.getPoint();
        var oldX = oldPoint.getX();
        var oldY = oldPoint.getY();
        var elapsedTime = (currentTime - self.initialTime) / 1000;


        // Motion calculus
        var newX = self.initialX + (self.velocityX * elapsedTime);
        var newY = self.initialY + (self.velocityY * elapsedTime) + HALF_GRAVITY * Math.pow(elapsedTime, 2);

        // update circle
        oldPoint.setX(newX);
        oldPoint.setY(newY);

        if (self.trail) {
            var npoint = self.trail.removePoint();
            npoint.setX(oldX);
            npoint.setY(oldY);

            if (oldX > (self.initialX + circleRadius)) {
                self.trail.lineTo(npoint);
            } else {
                self.trail.addPoint(npoint);
            }
        }

        if (this.isAtGround()) {
            var bounceFactor = this.getBounceFactor();
            var velocityY = this.getVelocityY() * bounceFactor;

//            if (Math.max(velocityY, 0) === velocityY) {
                this.setVelocityX(this.getVelocityX() * bounceFactor);
                this.setVelocityY(velocityY);
                this.setInitialX(circle.getPoint().getX());
                this.setInitialY(circle.getPoint().getY());
                this.restart();
//            }
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
        var newY = self.initialY + (self.velocityY * elapsedTime) + HALF_GRAVITY * Math.pow(elapsedTime, 2);

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

    proto.restart = function () {
        this.initialTime = (new Date()).getTime();
    };

    return Projectile;

}());

