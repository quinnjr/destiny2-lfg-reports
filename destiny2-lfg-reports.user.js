// ==UserScript==
// @name         Destiny 2 LFG Reports
// @namespace    http://bungie.net/
// @version      0.0.2
// @description  Appends a raid report link and pvp info link to public fireteams on the Destiny LFG app.
// @author       Joseph R. Quinn <quinn.josephr@protonmail.com>
// @copyright    2019 Joseph R. Quinn
// @license      ISC; https://github.com/quinnjr/destiny2-lfg-reports/blob/master/LICENSE
// @homepageURL  https://github.com/quinnjr/destiny2-lfg-reports
// @supportURL   https://github.com/quinnjr/destiny2-lfg-reports/issues
// @match        https://www.bungie.net/en/ClanV2/PublicFireteam?groupId=*&fireteamId=*
// @grant        none
// @updateURL    https://openuserjs.org/meta/illuser/Destiny_2_LFG_Reports.meta.js
// @noframess
// ==/UserScript==
// ==OpenUserJS==
// @author illuser
// ==/OpenUserJS==

(function() {
  'use strict';
  
  const raid_url = 'https://raid.report/';
  const pvp_url = 'https://destinytracker.com/d2/profile/'

  function getPCId(el) {
    const pElem = el.closest('li.user-fireteam');
    return pElem.getAttribute('data-membershipid');
  }

  function getRaidPlatformLink(user, platElem) {
    let platform;

    switch (platElem.getAttribute('data-platform')) {
      case 'Blizzard':
        platform = 'pc';
        break;
      case 'Playstation4':
        platform = 'ps';
        break;
      case 'XboxOne':
        platform = 'xb';
        break;
      default:
        console.error('Invalid platform');
        break;
    }

    const username = (platform !== 'pc') ? user.innerText : getPCId(user);

    return raid_url.concat(platform,'/', username);
  }

  function getPvPPlatformLink(user, platElem) {
    let platform;

    switch (platElem.getAttribute('data-platform')) {
      case 'Blizzard':
        platform = 'pc';
        break;
      case 'Playstation4':
        platform = 'psn';
        break;
      case 'XboxOne':
        platform = 'xbl';
        break;
      default:
        console.error('Invalid platform');
        break;
    }
    
    return pvp_url.concat(platform, '/', user.innerText, '/detailed', (platform === 'pc') ? "".concat('?mbmid=', getPCId(user)) : null);
    // return 'javascript:alert("PVP Report for PC players is currently in development");';
  }

  const users = document.getElementsByClassName('display-name');
  const platElem = document.getElementsByClassName('platform')[0];

  for(let user of users) {
    let raidLink = document.createElement('a');
    raidLink.setAttribute('href', getRaidPlatformLink(user, platElem));
    raidLink.setAttribute('style', 'color: #FFF;');
    raidLink.setAttribute('target', '_blank');
    raidLink.innerHTML = '&nbsp;&nbsp;Raid Report';

    user.parentElement.appendChild(raidLink);

    let pvpLink = document.createElement('a');
    pvpLink.setAttribute('href', getPvPPlatformLink(user, platElem));
    pvpLink.setAttribute('style', 'color: #FFF;');
    pvpLink.setAttribute('target', '_blank');
    pvpLink.innerHTML = '&nbsp;&nbsp;PVP Report';

    user.parentElement.appendChild(pvpLink);
  }
})();
