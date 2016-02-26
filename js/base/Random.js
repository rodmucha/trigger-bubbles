/**
 * @fileoverview Provides methods to get random values for various data types.
 *                
 * @author Rodrigo Carvalho
 */

var Random = {};

Random = (function () {
    "use strict";

    var PI2 = 2 * Math.PI;

    Random.getFloat = function (min, max) {
        return (Math.random() * (max - min + 1) + min);
    };

    Random.getInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    Random.getSignedInt = function () {
        this.getInt(-1000000, 1000000);
    };

    Random.getUnsignedInt = function () {
        this.getInt(0, 1000000);
    };

    Random.getAngleRadians = function () {
        var min = 0;
        var max = PI2;
        return (Math.random() * (max - min) + min);
    };

    Random.getAngleDegrees = function () {
        var min = 0;
        var max = 360;
        return (Math.random() * (max - min) + min);
    };

    Random.getColor = function () {
        var res = "#";

        // get random red, green, and blue from 0 to 255
        var randomRed = Math.floor(Math.random() * 255);
        var randomGreen = Math.floor(Math.random() * 255);
        var randomBlue = Math.floor(Math.random() * 255);

        // convert each decimal number to hexadecimal
        var red = new String(randomRed.toString(16));
        var green = new String(randomGreen.toString(16));
        var blue = new String(randomBlue.toString(16));

        res += String('00' + red).slice(-2);
        res += String('00' + green).slice(-2);
        res += String('00' + blue).slice(-2);

        return res;
    };
    
    return Random;

}());

