/**
 * Store options UI using browser.storage.local.
 * @return {void}       -
 */
function storeSettings() {
  const settings = {
    url: document.querySelector("#url").value,
    pageAction: document.querySelector("#pageAction").checked,
  };
  // console.log('storeSettings settings');
  // console.log(settings);
  browser.storage.local.set(settings);
}

/**
 * Update the options UI with the settings values retrieved from storage,
 * or the default settings if the stored settings are empty.
 * @param  {object} restoredSettings  -
 * @return {void}                     -
 */
function updateUI(restoredSettings) {
  const url = document.querySelector("#url");
  url.value = restoredSettings.url;
  // console.log('restoredSettings url');
  // console.log(url);

  const pageAction = document.querySelector("#pageAction");
  pageAction.checked = restoredSettings.pageAction;
  // console.log('restoredSettings pageAction');
  // console.log(pageAction);
}

/**
 * Display on error
 * @param  {object} error -
 * @return {void}   -
 */
function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);
