/*
Default settings. Initialize storage to these values.
*/
var storage = {
  url: '',
  pageAction: false,
  popupWidth: 900,
  popupHeight: 600,
}

/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
function checkStoredSettings(storedSettings) {
  if (storedSettings.url === undefined) {
    browser.storage.local.set(storage);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
