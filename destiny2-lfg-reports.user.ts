const raid_url = 'https://raid.report/';
// const pvp_url = 'https://destinytracker.com/d2/profile/'
const api_endpoint = 'https://www.bungie.net/Platform';

function getPCId(el: Element): string {
  const pElem = el.closest('li.user-fireteam');
  return pElem!.getAttribute('data-membershipid')!;
}

function getRaidPlatformLink(user: HTMLElement, platElem: Element): string {
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
      return '';
      break;
  }

  const username = (platform !== 'pc') ? user!.innerText : getPCId(user);

  return encodeURI(raid_url.concat(platform,'/', username));
}

/* function getPvPPlatformLink(user, platElem) {
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

  return pvp_url.concat(platform, '/', user.innerText, (platform === 'pc') ? "".concat('?mbmid=', getPCId(user)) : '');
  // return 'javascript:alert("PVP Report for PC players is currently in development");';
}*/

const platElem = document.getElementsByClassName('platform')[0];
const targetNode = document.getElementsByClassName('users-fireteam')[0];

const observer = new MutationObserver((mutations: MutationRecord[],
  _observer: MutationObserver) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node: Node) => {
      let element = node as Element;
      let user = element.closest('a.display-name') as HTMLElement;
      let link = document.createElement('a');
      link.setAttribute('href', getRaidPlatformLink(user, platElem));
      link.setAttribute('style', 'color: #FFF;');
      link.setAttribute('target', '_blank');
      link.innerHTML = '&nbsp;&nbsp;Raid Report';
      element.insertAdjacentElement('afterend', link);
    });
  });
  // const users = document.getElementsByClassName('display-name');


  // for(let user of <any>users) {

    /*let pvpLink = document.createElement('a');
    pvpLink.setAttribute('href', getPvPPlatformLink(user, platElem));
    pvpLink.setAttribute('style', 'color: #FFF;');
    pvpLink.setAttribute('target', '_blank');
    pvpLink.innerHTML = '&nbsp;&nbsp;PVP Report';

    user.parentElement.appendChild(pvpLink);*/
  // }
});

observer.observe(targetNode, { attributes: false, childList: true, subtree: false });
