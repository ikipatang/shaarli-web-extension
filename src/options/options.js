/**
 * Store options UI using browser.storage.local.
 * @return {void}       -
 */
function storeSettings() {
  const settings = {
    url: document.querySelector("#url").value,
    popupWidth: parseInt(document.querySelector("#popupWidth").value),
    popupHeight: parseInt(document.querySelector("#popupHeight").value),
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
  // console.log('restoredSettings');
  // console.dir(restoredSettings, { depth: 10, colors: true }); // DEBUG

  const url = document.querySelector("#url");
  url.value = restoredSettings.url;

  const popupWidth = document.querySelector("#popupWidth");
  popupWidth.value = restoredSettings.popupWidth;
  const popupHeight = document.querySelector("#popupHeight");
  popupHeight.value = restoredSettings.popupHeight;

  const pageAction = document.querySelector("#pageAction");
  pageAction.checked = restoredSettings.pageAction;
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
