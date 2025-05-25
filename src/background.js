/**
 * Open the given url in a popup
 * @param  {string} url     -
 * @param  {number} width   -
 * @param  {number} height  -
 * @return {void}           -
 */
function openInPopup(url, width, height) {
  if(browser.windows) {
    browser.windows.create({
      url,
      type: 'popup',
      allowScriptsToClose: true,
      width,
      height,
    });
  }else if(browser.tabs){
    browser.tabs.create({
      active: true,
      url: url
    })
  }
}

/**
 * Share Current Tab
 * @return {void}       -
 */
function shareCurrentTab(tab, main = true) {
  const url = tab.url;
  const title = tab.title || url;
  browser.storage.local.get().then((storage) => {
    const shaarliUrl = main ? storage.url : storage.altUrl;
    if(!shaarliUrl){
      browser.runtime.openOptionsPage();

      return;
    }
    let shareUrl = `${shaarliUrl}?post=${encodeURIComponent(url)}&source=bookmarklet`;
    if(!storage.retrieveDescription) {
      shareUrl += `&title=${encodeURIComponent(title)}`;
    }
    openInPopup(shareUrl, storage.popupWidth, storage.popupHeight);
  });
}

function browserActionClick (tab) {
  browser.storage.local.get().then((storage) => {
    if(!storage.showMenu){
      shareCurrentTab(tab);
    } else {
      browser.browserAction.setPopup({ popup: "src/menu/menu.html" });
    }
  });
}

/**
 * Show Page Action on current page if activated
 * @param  {string} tabId - Current tab id
 * @return {void}         -
 */
function showPageAction(tabId){
  browser.storage.local.get().then((storage) => {
    if (storage.pageAction) {
      browser.pageAction.show(tabId);
    } else {
      browser.pageAction.hide(tabId)
    }
  });
}

/**
 * Show page action with given active information
 * @param  {object} activeInfo  -
 * @return {void}               -
 */
function tabActivation(activeInfo){
  showPageAction(activeInfo.tabId);
}

/*
Initialize
 */
browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
  showPageAction(tabs[0].id);
});

/*
Listeners
 */
browser.tabs.onActivated.addListener(tabActivation);
browser.browserAction.onClicked.addListener(browserActionClick);
browser.pageAction.onClicked.addListener(shareCurrentTab);

// Listen for messages from menu.js
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "show.settings") {
    browser.runtime.openOptionsPage();

    return;
  }
  
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const activeTab = tabs[0];
    shareCurrentTab(activeTab, message.action === "share.main");
  });
});
