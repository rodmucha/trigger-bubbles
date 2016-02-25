
var Animation = (function () {
    "use strict";

    var mthis;

    function Animation(htmlElement, uniqueName, width, height) {
        var lcontainer = document.createElement('div');
        lcontainer.setAttribute('id', uniqueName);
        lcontainer.style.width = width + 'px';
        lcontainer.style.height = height + 'px';
        htmlElement.appendChild(lcontainer);

        this.container = lcontainer;
        this.stopped = true;
        this.projectiles = {};
        mthis = this;
    }

    var proto = Animation.prototype;

    proto.add = function (projectile) {
        this.projectiles[projectile.getId()] = projectile;
    };

    proto.start = function () {
        // Update the state
        this.stopped = false;
        // Get request animation frame ID
        this.raf = window.requestAnimationFrame(this.render);
    };

    proto.stop = function () {
        if (this.raf) {
            // Cancel animation
            window.cancelAnimationFrame(this.raf);
        }

        // Update the state
        this.stopped = true;
    };

    proto.render = function () {

        if (!mthis.stopped) {
            // Draw all projectiles
            var lprojectiles = mthis.projectiles;
            var proj;

            for (var prop in lprojectiles) {
                proj = lprojectiles[prop];

                if (!proj) {
                    continue;
                } else if (!proj.isVisible()) {
                    document.getElementById(prop).setAttribute('class', 'empty');
                    lprojectiles[prop] = "";
                    proj.erase();
                    continue;
                }

                proj.draw();
            }

            mthis.raf = window.requestAnimationFrame(mthis.render);
        }
    };

    proto.isStopped = function () {
        return this.stopped;
    };

    proto.getContainer = function () {
        return this.container;
    };

    return Animation;

}());

