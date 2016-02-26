/**
 * @fileoverview Implementation of requestAnimationFrame pollyfill.
 *                
 * @author Rodrigo Carvalho
 */

(function () {

    if (!window.requestAnimationFrame) {
        var lastTime = 0;
        var proprietaryRAF;
        var proprietaryRAFs = ['msRequestAnimationFrame', 'mozRequestAnimationFrame',
            'webkitRequestAnimationFrame', 'oRequestAnimationFrame'];

        for (var pRAF in proprietaryRAFs) {
            if (window[pRAF]) {
                proprietaryRAF = pRAF;
                break;
            }
        }

        if (proprietaryRAF) {
            window.requestAnimationFrame = window[proprietaryRAF];
            window.cancelAnimationFrame = window[proprietaryRAF.replace('Request', 'Cancel')] ||
                    window[proprietaryRAF.replace('Request', 'RequestCancel')];
        } else {

            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));

                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);

                lastTime = currTime + timeToCall;
                return id;
            };

            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }

    }

}());

