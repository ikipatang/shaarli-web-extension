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
function shareCurrentTab() {
  browser.tabs.query({
    active: true,
    currentWindow: true,
  }).then((tabs) => {
    const url = tabs[0].url;
    const title = tabs[0].title || url;
    browser.storage.local.get('url').then((storage) => {
      if(storage.url){
        const shareUrl = `${storage.url}?post=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&source=bookmarklet`;
        openInPopup(shareUrl);
      }else{
        browser.runtime.openOptionsPage()
      }
    });
  });
}

browser.browserAction.onClicked.addListener(shareCurrentTab);
