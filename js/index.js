document.addEventListener("DOMContentLoaded", async function () {
  /* Redirect user to settings page when they click on 'settings */
  const settingsBtn = document.querySelector("#settings-btn");
  const enableBtn = document.querySelector("#toggle-btn");

  settingsBtn.addEventListener("click", (e) => {
    chrome.tabs.create({
      url: "settings.html",
    });
  });

  /* Enable / Disable button functionality */
  const result = await chrome.storage.sync.get("enabled");
  const isEnabled = result.enabled === undefined ? true : result.enabled; // default to true
  setToggleUI(enableBtn, isEnabled);

  enableBtn.addEventListener("click", async () => {
    const current = await chrome.storage.sync.get("enabled");
    const newValue = !current.enabled;
    await chrome.storage.sync.set({ enabled: newValue });
    setToggleUI(enableBtn, newValue);
    reloadActiveTab();
  });
});

/* function that toggles UI button */
function setToggleUI(button, isEnabled) {
  button.setAttribute("aria-pressed", isEnabled);
  button.classList.toggle("is-on", isEnabled);
}

/* function that refreshes current tab */
async function reloadActiveTab() {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (activeTab?.id) {
    chrome.tabs.reload(activeTab.id);
  }
}
