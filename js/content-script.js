/***
 * content script to run silently on every page
 * apply the rules to each web page visited
 ***/

/* initial state function: read the rules from storage */
async function init() {
  // check enablement flag status
  const toggleResult = await chrome.storage.sync.get("enabled");

  if (toggleResult.enabled === false) {
    return;
  }

  const result = await chrome.storage.sync.get("rules");
  const rules = result.rules || [];

  if (rules.length === 0) return;

  // build new array of rule objects with the new regex key-value pair
  const regexRules = rules.map((rule) => ({
    ...rule,
    regex: buildRuleRegex(rule),
  }));

  // walk throughout the DOM text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      // filter and skip tags
      acceptNode(node) {
        const parentTag = node.parentElement?.tagName;
        const skipTags = ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "NOSCRIPT"];

        if (parentTag && skipTags.includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );
  let node;
  while ((node = walker.nextNode())) {
    let text = node.textContent;

    regexRules.forEach((rule) => {
      text = text.replace(rule["regex"], rule["swap"]);
    });

    if (text !== node.textContent) {
      node.textContent = text;
    }
  }
}

/* helper function to escape special characters */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* function to build a regex for each rule */
function buildRuleRegex(rule) {
  const safeWord = escapeRegex(rule["word"]);

  const pattern = rule["isFullWord"] ? `\\b${safeWord}\\b` : safeWord;
  const flags = rule["isCaseSensitive"] ? "g" : "gi";

  return new RegExp(pattern, flags);
}

init();
