/*! conditionizr v4.5.0 | (c) 2014 @toddmotto, @markgdyr | https://github.com/conditionizr */
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t:e.conditionizr=t()}(this,function(){"use strict";function e(e,n,s){function c(n){var c,o=s?e:t+e+("style"===n?".css":".js");switch(n){case"script":c=document.createElement("script"),c.src=o;break;case"style":c=document.createElement("link"),c.href=o,c.rel="stylesheet";break;case"class":document.documentElement.className+=" "+e}!!c&&(document.head||document.getElementsByTagName("head")[0]).appendChild(c)}for(var o=n.length;o--;)c(n[o])}var t,n={};return n.config=function(s){t=s.assets||"";for(var c in s.tests)n[c]&&e(c,s.tests[c])},n.add=function(e,t){n[e]="function"==typeof t?t():t},n.on=function(e,t){(n[e]||/\!/.test(e)&&!n[e.slice(1)])&&t()},n.load=n.polyfill=function(t,s){for(var c=s.length;c--;)n[s[c]]&&e(t,[/\.js$/.test(t)?"script":"style"],!0)},n});
;
/*!
 * IE8
 * @cc_on Conditional Compilation to test the
 * JavaScript versions
 */
conditionizr.add('ie8', !!(Function('/*@cc_on return (@_jscript_version > 5.7 && !/^(9|10)/.test(@_jscript_version)); @*/')()));

;
/*!
 * IE9
 * @cc_on Conditional Compilation to test the
 * JavaScript version and MSIE 9 in the UserAgent
 */
conditionizr.add('ie9', !!(Function('/*@cc_on return (/^9/.test(@_jscript_version) && /MSIE 9\.0(?!.*IEMobile)/i.test(navigator.userAgent)); @*/')()));

;
/*!
 * IE10
 * @cc_on Conditional Compilation to test the
 * JavaScript version and MSIE 10 in the UserAgent
 */
conditionizr.add('ie10', !!(Function('/*@cc_on return (/^10/.test(@_jscript_version) && /MSIE 10\.0(?!.*IEMobile)/i.test(navigator.userAgent)); @*/')()));
