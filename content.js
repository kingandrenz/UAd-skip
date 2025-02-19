const customContent = [
  "Stay positive! Work hard.",
  "Success is built daily!",
  "Growth takes time.",
  "Push through obstacles.",
];

// Function to detect and replace ads
function replaceAds() {
  const adSelectors = [
    "iframe",
    "div[aria-label='Advertisement']",
    "div[id*='ad']",
    "div[class*='ad']",
  ];

  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((ad) => {
      if (!ad || typeof ad !== "object") return; // ✅ Prevents errors on null or undefined elements

      if (ad.tagName && ad.tagName.toLowerCase() === "iframe") {
        ad.style.display = "none"; // ✅ Hide iframe ads safely
      } else if (ad.innerHTML !== undefined) {
        if (!ad.dataset.replaced) {
          ad.innerHTML = `<div style="font-size: 18px; padding: 15px; color: white; background:#333; text-align: center;">
                            ${
                              customContent[
                                Math.floor(Math.random() * customContent.length)
                              ]
                            }
                          </div>`;

          if (ad.style) {
            ad.style.height = "auto"; // ✅ Safe modification
          }

          ad.dataset.replaced = "true"; // ✅ Prevent infinite replacements
        }
      }
    });
  });
}

// Run initially and every 2 seconds to handle dynamically loaded ads
replaceAds();
setInterval(replaceAds, 2000);
