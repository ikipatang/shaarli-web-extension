/**
 * Open the given url in a popup
 * @param  {string} url     -
 * @param  {number} width   -
 * @param  {number} height  -
 * @return {void}           -
 */
function openInPopup(url, width, height) {
  if (browser.windows) {
    browser.windows.create({
      url,
      type: 'popup',
      allowScriptsToClose: true,
      width,
      height,
    });
  } else if (browser.tabs) {
    browser.tabs.create({
      active: true,
      url,
    });
  }
}

/**
 * Share Current Tab
 * @param  {object}  tab
 * @param  {boolean} main
 * @return {void}       -
 */
function shareCurrentTab(tab, main = true) {
  const url = tab.url;
  const title = tab.title || url;
  browser.storage.local.get().then((storage) => {
    const shaarliUrl = main ? storage.url : storage.altUrl;
    if (!shaarliUrl) {
      browser.runtime.openOptionsPage();

      return;
    }
    let shareUrl = `${shaarliUrl}?post=${encodeURIComponent(url)}&source=bookmarklet`;
    if (!storage.retrieveDescription) {
      shareUrl += `&title=${encodeURIComponent(title)}`;
    }
    openInPopup(shareUrl, storage.popupWidth, storage.popupHeight);
  });
}

/**
 * Show Page Action on current page if activated
 * @param  {number} tabId
 */
function showPageAction(tabId) {
  browser.storage.local.get().then((storage) => {
    if (storage.pageAction) {
      browser.pageAction.show(tabId);
    } else {
      browser.pageAction.hide(tabId);
    }
  });
}

/*
Initialize
 */
browser.storage.local.get().then((storage) => {
  if (!storage.showMenu) {
    browser.browserAction.setPopup({ popup: "" });
  }
});

browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  showPageAction(tabs[0].id);
});

/*
Listeners
 */
browser.tabs.onActivated.addListener((activeInfo) => {
  showPageAction(activeInfo.tabId);
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.showMenu) {
    browser.browserAction.setPopup({
      popup: changes.showMenu.newValue ? "src/menu/menu.html" : ""
    });
  }
});

browser.browserAction.onClicked.addListener((tab) => {
  shareCurrentTab(tab);
});

browser.pageAction.onClicked.addListener(shareCurrentTab);

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "show.settings") {
    browser.runtime.openOptionsPage();
    return;
  }

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    shareCurrentTab(tabs[0], message.action === "share.main");
  });
});
