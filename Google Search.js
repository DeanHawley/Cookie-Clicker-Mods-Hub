if (gs === undefined) var gs = {};
Game.registerMod("gs", {
  info: {
    Name: "Google Search",
    Description: "Adds the ability to use Google without leaving the Cookie Clicker tab (Some websites may not work)"
  },
  init: function() {
    const googleDiv = document.createElement('div');
    googleDiv.id = 'googleSearchMod';
    googleDiv.style.position = 'relative';
    googleDiv.style.margin = '0';
    googleDiv.style.padding = '0';
    googleDiv.style.border = 'none';
    googleDiv.style.width = '100%';

    const iframe = document.createElement('iframe');
    iframe.id = 'googleIframe';
    iframe.src = 'https://www.google.com/webhp?igu=1';
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    const separator = document.createElement('div');
    separator.className = 'separatorBottom';
    separator.style.position = 'absolute';
    separator.style.bottom = '-8px';
    separator.style.zIndex = '0';
    separator.style.width = 'calc(100% + 2px)';

    googleDiv.appendChild(iframe);
    googleDiv.appendChild(separator);

    const buildingsContainer = l('buildingsMaster');
    const centerArea = l('centerArea');

    if (buildingsContainer && centerArea) {
      centerArea.insertBefore(googleDiv, buildingsContainer.nextSibling);
    }
  }
});
