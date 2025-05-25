document.getElementById("settings-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "show.settings" });
});

document.getElementById("shaarli-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "share.main" });
});

document.getElementById("altShaarli-button").addEventListener("click", () => {
  browser.runtime.sendMessage({ action: "share.alt" });
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
