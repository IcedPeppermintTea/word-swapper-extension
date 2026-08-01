document.addEventListener("DOMContentLoaded", function () {
  /* Redirect user to settings page when they click on 'settings */
  const settingsBtn = document.querySelector("#settings-btn");

  settingsBtn.addEventListener("click", (e) => {
    chrome.tabs.create({
      url: "settings.html",
    });
  });

  /* Enable / Disable button functionality */
});
