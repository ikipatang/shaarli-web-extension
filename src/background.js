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
      const shareUrl = `${storage.url}?post=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&source=bookmarklet`;

      browser.windows.create({
        url: shareUrl,
        type: 'popup',
        allowScriptsToClose: true,
      });
    });
  });
}

browser.browserAction.onClicked.addListener(shareCurrentTab);
