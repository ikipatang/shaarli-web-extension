
/**
 * ParseInt with minimum dimension of 45px
 * @param  {string} dimension -
 * @return {int}              -
 */
function parseIntDimension(dimension){
  const minDimension = 45;
  let parsedDimension = parseInt(dimension);
  if(isNaN(parsedDimension) || parsedDimension < minDimension){
    parsedDimension = minDimension;
  }
  return parsedDimension;
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

  // Get HTML input
  const url = document.querySelector("#url");
  const popupWidth = document.querySelector("#popupWidth");
  const popupHeight = document.querySelector("#popupHeight");
  const pageAction = document.querySelector("#pageAction");

  // Set HTML input with stored values
  url.value = restoredSettings.url;
  popupWidth.value = restoredSettings.popupWidth;
  popupHeight.value = restoredSettings.popupHeight;
  pageAction.checked = restoredSettings.pageAction;
}

/**
 * Store options UI using browser.storage.local.
 * @return {void}       -
 */
function storeSettings() {
  const url = document.querySelector("#url");
  const popupWidth = document.querySelector("#popupWidth");
  const popupHeight = document.querySelector("#popupHeight");
  const pageAction = document.querySelector("#pageAction");

  const settings = {
    url: url.value,
    popupWidth: parseIntDimension(popupWidth.value),
    popupHeight: parseIntDimension(popupHeight.value),
    pageAction: pageAction.checked,
  };
  // console.log('storeSettings settings');
  // console.log(settings);

  // Store in storage
  browser.storage.local.set(settings);

  // Update UI
  updateUI(settings);
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
