
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
  const showMenu = document.querySelector("#showMenu");
  const pageAction = document.querySelector("#pageAction");
  const retrieveDescription = document.querySelector("#retrieveDescription");
  const popupWidth = document.querySelector("#popupWidth");
  const popupHeight = document.querySelector("#popupHeight");
  const url = document.querySelector("#url");
  const altUrl = document.querySelector("#altUrl");

  // Set HTML input with stored values
  showMenu.checked = restoredSettings.showMenu;
  pageAction.checked = restoredSettings.pageAction;
  retrieveDescription.checked = restoredSettings.retrieveDescription;
  popupWidth.value = restoredSettings.popupWidth;
  popupHeight.value = restoredSettings.popupHeight;
  url.value = restoredSettings.url;
  altUrl.value = restoredSettings.altUrl;
}

/**
 * Store options UI using browser.storage.local.
 * @return {void}       -
 */
function storeSettings() {
  const showMenu = document.querySelector("#showMenu");
  const pageAction = document.querySelector("#pageAction");
  const retrieveDescription = document.querySelector("#retrieveDescription");
  const popupWidth = document.querySelector("#popupWidth");
  const popupHeight = document.querySelector("#popupHeight");
  const url = document.querySelector("#url");
  const altUrl = document.querySelector("#altUrl");

  if (url.value && altUrl.value) {
    showMenu.checked = true;
  }

  const settings = {
    showMenu: showMenu.checked,
    pageAction: pageAction.checked,
    retrieveDescription: retrieveDescription.checked,
    popupWidth: parseIntDimension(popupWidth.value),
    popupHeight: parseIntDimension(popupHeight.value),
    url: url.value,
    altUrl: altUrl.value,
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
