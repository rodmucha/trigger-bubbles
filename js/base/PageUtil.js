/**
 * @fileoverview Provides methods to get information about the page
 *                
 * @author Rodrigo Carvalho
 */

var PageUtil = {};

PageUtil = (function () {
    "use strict";

    PageUtil.getLeftPosition = function () {
        var leftPos = (typeof window.screenLeft === "number") ? window.screenLeft : window.screenX;
        return leftPos;
    };

    PageUtil.getTopPosition = function () {
        var topPos = (typeof window.screenTop === "number") ? window.screenTop : window.screenY;
        return topPos;
    };

    PageUtil.getWidth = function () {
        var pageWidth = (window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth);
        return pageWidth;
    };

    PageUtil.getHeight = function () {
        var pageHeight = (window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight);
        return pageHeight;
    };

    return PageUtil;

}());


