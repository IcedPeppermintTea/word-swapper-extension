document.addEventListener("DOMContentLoaded", function() {

    /* Variables */
    const settingsBtn = document.querySelector('#settings-btn');

    /* Settings button functionality */

    settingsBtn.addEventListener("click", e => {
        chrome.tabs.create({
            url: "settings.html"
        })
    })

});