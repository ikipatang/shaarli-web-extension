document.getElementById("settings-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "show.settings" });
  window.close();
});

document.getElementById("shaarli-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "share.main" });
  window.close();
});

document.getElementById("altShaarli-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "share.alt" });
  window.close();
});

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Get the altShaarli-button element
  const altShaarliButton = document.getElementById("altShaarli-button");

  // Check storage for the altUrl flag
  browser.storage.local.get().then((storage) => {
    if (storage.altUrl) {
      altShaarliButton.style.display = "flex";
    }
  }).catch(() => {});
});
