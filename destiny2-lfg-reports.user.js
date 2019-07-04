// ==UserScript==
// @name         Destiny 2 LFG Reports
// @namespace    http://bungie.net/
// @version      1.0.0
// @description  Appends a raid report link and pvp info link to public fireteams on the Destiny LFG app.
// @author       Joseph R. Quinn <quinn.josephr@protonmail.com>
// @copyright    2019 Joseph R. Quinn
// @license      ISC; https://github.com/quinnjr/destiny2-lfg-reports/blob/master/LICENSE
// @homepageURL  https://github.com/quinnjr/destiny2-lfg-reports
// @supportURL   https://github.com/quinnjr/destiny2-lfg-reports/issues
// @match        https://www.bungie.net/*/ClanV2/PublicFireteam?groupId=*&fireteamId=*
// @grant        none
// @updateURL    https://openuserjs.org/meta/illuser/Destiny_2_LFG_Reports.meta.js
// @noframes
// ==/UserScript==
// ==OpenUserJS==
// @author illuser
// ==/OpenUserJS==
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n="https://raid.report/";var o=document.getElementsByClassName("platform")[0],a=document.getElementsByClassName("users-fireteam")[0];new MutationObserver(function(e,t){e.forEach(function(e){e.addedNodes.forEach(function(e){var t=e,r=t.closest("a.display-name"),a=document.createElement("a");a.setAttribute("href",function(e,t){var r;switch(t.getAttribute("data-platform")){case"Blizzard":r="pc";break;case"Playstation4":r="ps";break;case"XboxOne":r="xb";break;default:return console.error("Invalid platform"),""}var o="pc"!==r?e.innerText:e.closest("li.user-fireteam").getAttribute("data-membershipid");return encodeURI(n.concat(r,"/",o))}(r,o)),a.setAttribute("style","color: #FFF;"),a.setAttribute("target","_blank"),a.innerHTML="&nbsp;&nbsp;Raid Report",t.insertAdjacentElement("afterend",a)})})}).observe(a,{attributes:!1,childList:!0,subtree:!1})}]);