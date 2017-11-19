/*
Store options UI using browser.storage.local.
*/
function storeSettings() {
  const url = document.querySelector("#url");
  // console.log('storeSettings url');
  // console.log(url);
  browser.storage.local.set({
    url: url.value,
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  const url = document.querySelector("#url");
  // console.log('restoredSettings url');
  // console.log(url);
  url.value = restoredSettings.url || "";
}

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
