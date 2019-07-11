// Copyright (c) 2018 Joseph R. Quinn <quinn.josephr@protonmail.com>
// SPDX-License-Identifier: ISC

class LfgReport {
  private readonly raid_report_base: string = 'https://raid.report/';
  private readonly destiny_tracker_base: string = 'https://destinytracker.com/d2/profile/';
  // In place for an eventual switch to using the Bungie API only
  // for statistics.
  // private readonly bungie_api_base: string = 'https://www.bungie.net/Platform';

  // The platform for the LFG page.
  public readonly platform: string;
  // Target DOM Node for the for the Observer.
  public readonly targetNode: Element;

  constructor() {
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

  private get pvpPlatform(): string {
    switch(this.platform) {
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

  private getUsername(user: HTMLElement): string {
    return (this.platform !== 'pc') ? user!.innerText
      : user!.closest('li.user-fireteam')!
        .getAttribute('data-membershipid')!;
  }

  private addRaidReportLink(element: HTMLElement) {
    let link = document.createElement('a');
    link.setAttribute('href', this.raidPlatformLink(element));
    link.setAttribute('style', 'color: #FFF;');
    link.setAttribute('target', '_blank');
    link.innerHTML = '&nbsp;&nbsp;Raid Report';
    element.insertAdjacentElement('afterend', link);
  }

  private addPvpReportLink(element: HTMLElement) {
    let link = document.createElement('a');
    link.setAttribute('href', this.pvpPlatformLink(element));
    link.setAttribute('style', 'color: #FFF;');
    link.setAttribute('target', '_blank');
    link.innerHTML = '&nbsp;&nbsp;PVP Report';
    element.insertAdjacentElement('afterend', link);
  }

  public raidPlatformLink(user: HTMLElement): string {
    return encodeURI(this.raid_report_base.concat(this.platform, '/', this.getUsername(user)));
  }

  public pvpPlatformLink(user: HTMLElement): string {
    return encodeURI(this.destiny_tracker_base.concat(this.pvpPlatform, '/', this.getUsername(user)));
  }

  public addReportLinks(el: Element) {
    const user = el.querySelector('a.display-name') as HTMLElement;
    this.addPvpReportLink(user);
    this.addRaidReportLink(user);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const reporter = new LfgReport();

  const observer = new MutationObserver((mutations: MutationRecord[],
    _observer: MutationObserver) => {
    console.log('Observer fired mutation...')
    mutations.forEach((mutation) => {
      let nodes: Element[] = <Element[]><any>Array.from(mutation.addedNodes);
      nodes.forEach(reporter.addReportLinks);
    });
  });

  observer.observe(reporter.targetNode, { attributes: false, childList: true, subtree: false });

  for(let users of Array.from(reporter.targetNode.children)) {
    reporter.addReportLinks(users);
  }
});
