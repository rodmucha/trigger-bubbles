
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
        var pageWidth = window.innerWidth;

        if (typeof pageWidth !== "number") {
            if (document.compatMode === "CSS1Compat") {
                pageWidth = document.documentElement.clientWidth;
            } else {
                pageWidth = document.body.clientWidth;
            }
        }

        return pageWidth;
    };

    PageUtil.getHeight = function () {
        var pageHeight = window.innerHeight;

        if (typeof pageHeight !== "number") {
            if (document.compatMode === "CSS1Compat") {
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageHeight = document.body.clientHeight;
            }
        }

        return pageHeight;
    };

    return PageUtil;

}());


