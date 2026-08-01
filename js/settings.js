document.addEventListener("DOMContentLoaded", function () {
  /* Handle new rule saving */
  const givenWord = document.querySelector("#given_word");
  const swapValue = document.querySelector("#swap_value");
  const checkFullWord = document.querySelector("#full-word");
  const checkCaseSensitive = document.querySelector("#case-sensitive");
  const saveBtn = document.querySelector("#save");
  const existingRuleSection = document.querySelector("#rules-list");
  const ruleCount = document.querySelector("#rule-count");
  const emptyStateMsg = document.querySelector("#empty-state");
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

      // create a separate listener for each rule to delete via closures
      const deleteBtn = ruleCard.querySelector(".btn-delete");

      deleteBtn.addEventListener("click", (e) => {
        deleteRule(rule.id); // captures the rule via closure
      });

      existingRuleSection.appendChild(ruleCard);
    });

    ruleCount.textContent = `${rules.length} rules`;

    // display empty state message if rules.length == 0
    if (rules.length != 0) {
      emptyStateMsg.classList.add("display-none");
    } else {
      emptyStateMsg.classList.remove("display-none");
    }
  }

  /* function to delete a specific rule by id */
  function deleteRule(id) {
    const index = rules.findIndex((rule) => rule.id == id);
    if (index !== -1) rules.splice(index, 1);
    renderRules();
  }

  saveBtn.addEventListener("click", (e) => {
    const word = givenWord.value;
    const swap = swapValue.value;
    const isFullWord = checkFullWord.checked;
    const isCaseSensitive = checkCaseSensitive.checked;

    const newRule = {
      id: self.crypto.randomUUID(),
      word: word,
      swap: swap,
      isFullWord: isFullWord,
      isCaseSensitive: isCaseSensitive,
    };

    /* If rules exist: display in existing rules section*/
    rules.push(newRule);
    renderRules();
    console.log(rules);
  });
});
