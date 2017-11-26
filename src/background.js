/**
 * Open the given url in a popup
 * @param  {string} url -
 * @return {void}     -
 */
function openInPopup(url) {
  browser.windows.create({
    url,
    type: 'popup',
    allowScriptsToClose: true,
    height: 600,
    width: 900,
  });
}

/**
 * Share Current Tab
 * @return {void}       -
 */
function shareCurrentTab(tab) {
  const url = tab.url;
  const title = tab.title || url;
  browser.storage.local.get('url').then((storage) => {
    if(!storage.url){
      browser.runtime.openOptionsPage();
      return;
    }
    const shareUrl = `${storage.url}?post=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&source=bookmarklet`;
    openInPopup(shareUrl);
  });
}

browser.browserAction.onClicked.addListener(shareCurrentTab);
