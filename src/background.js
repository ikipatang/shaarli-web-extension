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
function shareCurrentTab(tab) {
  const url = tab.url;
  const title = tab.title || url;
  browser.storage.local.get().then((storage) => {
    if(!storage.url){
      browser.runtime.openOptionsPage();
      return;
    }
    const shareUrl = `${storage.url}?post=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&source=bookmarklet`;
    openInPopup(shareUrl, storage.popupWidth, storage.popupHeight);
  });
}

/**
 * Show Page Action on current page if activated
 * @param  {string} tabId - Current tab id
 * @return {void}         -
 */
function showPageAction(tabId){
  browser.storage.local.get().then((storage) => {
    storage.pageAction ? browser.pageAction.show(tabId) : browser.pageAction.hide(tabId);
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
browser.browserAction.onClicked.addListener(shareCurrentTab);
browser.pageAction.onClicked.addListener(shareCurrentTab);
