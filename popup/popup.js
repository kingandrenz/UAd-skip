let isReplacing = true;
const button = document.getElementById("toggle");

button.addEventListener("click", function () {
  isReplacing = !isReplacing;
  chrome.storage.local.set({ isReplacing });
  button.textContent = isReplacing ? "Disable Ad Recaer" : "Enable Ad Replacer";
});

// load saved state
chrome.storage.local.get(["isReplacing"], function (data) {
  if (data.isReplacing !== undefined) {
    isReplacing = data.isReplacing;
    button.textContent = isReplacing
      ? "Disable Ad Replacer"
      : "Enable Ad Replacer";
  }
});
