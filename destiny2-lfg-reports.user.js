// ==UserScript==
// @name         Destiny 2 LFG Reports
// @namespace    http://bungie.net/
// @version      2.0.0
// @description  Appends a raid report link and pvp info link to public fireteams on the Destiny LFG app.
// @author       Joseph R. Quinn <quinn.josephr@protonmail.com>
// @copyright    2019-2020 Joseph R. Quinn
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
(function () {
    'use strict';
    class LfgReport {
        constructor() {
            this.raid_report_base = 'https://raid.report/';
            this.destiny_tracker_base = 'https://destinytracker.com/d2/profile/';
            let elem = document.getElementsByClassName('platform')[0];
            switch (elem.getAttribute('data-platform')) {
                case 'Blizzard':
                case 'Steam': // Future-proof?
                case 'PC': // Future-proof?
                    this.platform = 'pc';
                    break;
                case 'Playstation4':
                    this.platform = 'ps';
                    break;
                case 'XboxOne':
                    this.platform = 'xb';
                    break;
                default:
                    console.error('Invalid pve platform');
                    this.platform = '';
                    break;
            }
            this.targetNode = document.getElementsByClassName('users-fireteam')[0];
        }
        get pvpPlatform() {
            switch (this.platform) {
                case 'pc':
                    return 'pc';
                    break;
                case 'ps':
                    return 'psn';
                    break;
                case 'xb':
                    return 'xbl'; // Double-check versus xb1;
                    break;
                default:
                    console.error('Invalid pvp platform');
                    return '';
                    break;
            }
        }
        getUsername(user) {
            return (this.platform !== 'pc') ? user.innerText
                : user.closest('li.user-fireteam')
                    .getAttribute('data-membershipid');
        }
        addRaidReportLink(element) {
            let link = document.createElement('a');
            link.setAttribute('href', this.raidPlatformLink(element));
            link.setAttribute('style', 'color: #FFF;');
            link.setAttribute('target', '_blank');
            link.innerHTML = '&nbsp;&nbsp;Raid Report';
            element.insertAdjacentElement('afterend', link);
        }
        addPvpReportLink(element) {
            let link = document.createElement('a');
            link.setAttribute('href', this.pvpPlatformLink(element));
            link.setAttribute('style', 'color: #FFF;');
            link.setAttribute('target', '_blank');
            link.innerHTML = '&nbsp;&nbsp;PVP Report';
            element.insertAdjacentElement('afterend', link);
        }
        raidPlatformLink(user) {
            return encodeURI(this.raid_report_base.concat(this.platform, '/', this.getUsername(user)));
        }
        pvpPlatformLink(user) {
            return encodeURI(this.destiny_tracker_base.concat(this.pvpPlatform, '/', this.getUsername(user)));
        }
        addReportLinks(el) {
            const user = el.querySelector('a.display-name');
            this.addPvpReportLink(user);
            this.addRaidReportLink(user);
        }
    }
    console.log('Registering LFG Report...');
    const reporter = new LfgReport();
    const observer = new MutationObserver((mutations, _observer) => {
        console.log('Observer fired mutation...');
        mutations.forEach((mutation) => {
            let nodes = Array.from(mutation.addedNodes);
            nodes.forEach(reporter.addReportLinks);
        });
    });
    observer.observe(reporter.targetNode, { attributes: false, childList: true, subtree: false });
    for (let users of Array.from(reporter.targetNode.children)) {
        reporter.addReportLinks(users);
    }
})();
