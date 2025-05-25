/*
Default settings. Initialize storage to these values.
*/
var DEFAULT_SETTINGS = {
  showMenu: true,
  retrieveDescription: false,
  pageAction: false,
  popupWidth: 800,
  popupHeight: 900,
  url: '',
  altUrl: '',
}

/**
 * Generic error logger.
 * @param  {object} e -
 * @return {void}     -
 */
function onError(e) {
  console.error(e);
}

/**
 * On startup, check whether we have stored settings.
 * If we don't, then store the default settings.
 * @param  {object} storedSettings  -
 * @return {void}                   -
 */
function checkStoredSettings(storedSettings) {
  if (storedSettings.url === undefined) {
    browser.storage.local.set(DEFAULT_SETTINGS);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
