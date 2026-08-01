document.addEventListener("DOMContentLoaded", function () {
  /* Handle new rule saving */
  const givenWord = document.querySelector("#given_word");
  const swapValue = document.querySelector("#swap_value");
  const checkFullWord = document.querySelector("#full-word");
  const checkCaseSensitive = document.querySelector("#case-sensitive");
  const saveBtn = document.querySelector("#save");
  const existingRuleSection = document.querySelector("#rules-list");
  const rules = [];

  /* function to render all existing rules */
  function renderRules() {
    existingRuleSection.innerHTML = "";

    rules.forEach((rule) => {
      // create new rule element
      let ruleCard = document.createElement("div");
      ruleCard.innerHTML = `<div class="rule">
                        <div class="rule-words">
                            <span class="rule-word">${rule["word"]}</span>
                            <span class="swap-glyph" aria-hidden="true"></span>
                            <span class="rule-word rule-word--to">${rule["swap"]}</span>
                        </div>
                        <div class="rule-meta">
                            ${rule["isFullWord"] == true ? '<span class="rule-badge">Full word</span>' : ""}
                            ${rule["isCaseSensitive"] == true ? '<span class="rule-badge">Aa</span>' : ""}
                            <button type="button" class="btn-delete" aria-label="Delete rule">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>`;

      console.log(ruleCard);

      existingRuleSection.appendChild(ruleCard);
      ruleCard = "";
    });
  }

  saveBtn.addEventListener("click", (e) => {
    const word = givenWord.value;
    const swap = swapValue.value;
    const isFullWord = checkFullWord.checked;
    const isCaseSensitive = checkCaseSensitive.checked;

    const newRule = {
      word: word,
      swap: swap,
      isFullWord: isFullWord,
      isCaseSensitive: isCaseSensitive,
    };

    /* Display rules in existing rules section */
    rules.push(newRule);

    renderRules();
  });
});
