const config = { subtree: true, childList: true };

class AdSkip {
	constructor() {
		this.ytAdModuleObserver = null;
		this.adModuleElement = null;
		this.adSkipButtonElement = null;
	}

	// Observe YouTube ad module for changes and run the checkForAd callback
	observeAdModule() {
		if (!this.adModuleElement) {
			this.adModuleElement = document.querySelector('#ytd-player .ytp-ad-module');

			if (this.adModuleElement) {
				this.checkForAd();
				this.ytAdModuleObserver = new MutationObserver(() => this.checkForAd());
				this.ytAdModuleObserver.observe(this.adModuleElement, { subtree: true, childList: true });
			}
		}
	}

	// Check if an ad is playing and show/hide the button accordingly
	checkForAd() {
		if (this.adModuleElement.innerHTML !== '') {
			if (!this.adSkipButtonElement) {
				this.createAdSkipButton();
			}
			this.adSkipButtonElement.style.visibility = 'visible';
		} else {
			if (this.adSkipButtonElement) {
				this.adSkipButtonElement.style.visibility = 'hidden';
			}
		}
	}

	// Create button to be rendered when an ad plays
	createAdSkipButton() {
		const videoElement = document.querySelector('video');
		if (!videoElement) return;

		videoElement.parentElement.style.position = 'relative';
		videoElement.parentElement.insertAdjacentHTML(
			'afterend',
	        `<button id="ad-skip-button">
		        <span>AdSkip</span>
		        <svg height="100%" viewBox="-6 -6 36 36" width="100%">
	          		<path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path>
	        	</svg>
	        </button>`
		);

		const adSkipButton = document.querySelector('#ad-skip-button');
		if (!adSkipButton) return;

		adSkipButton.style.padding = '10px 20px';
		adSkipButton.style.fontSize = '16px';
		adSkipButton.style.backgroundColor = '#4CAF50';
		adSkipButton.style.color = '#fff';
		adSkipButton.style.border = 'none';
		adSkipButton.style.borderRadius = '5px';
		adSkipButton.style.cursor = 'pointer';
		adSkipButton.style.position = 'absolute';
		adSkipButton.style.bottom = '86px';
		adSkipButton.style.right = '12px';
		adSkipButton.style.zIndex = '9999';
		adSkipButton.style.display = 'flex';
		adSkipButton.style.gap = '3px';

		adSkipButton.addEventListener('click', () => {
			this.skipAd();
		});

		this.adSkipButtonElement = adSkipButton;
	}

	// Skip the ad when the button is clicked
	skipAd() {
		const videoElement = document.querySelector('video');
		const skipButton = document.querySelector('button.ytp-ad-skip-button-modern');

		if (videoElement && isFinite(videoElement.duration)) {
			videoElement.currentTime = videoElement.duration;
		}

		if (skipButton) {
			skipButton.click();
		}

		chrome.runtime.sendMessage({ action: 'increment' });
	}
}


// run a callback when the DOM changes
function observeDocument(callback) {
	const observer = new MutationObserver((records, observer) => {
		callback(observer);
	});

	observer.observe(document, { subtree: true, childList: true });
}


function main() {
	// listen to message fro chrome extention Api

	const adSkip = new AdSkip();

	observeDocument((observer) => {
		if (!adSkip.adModuleElement) {
			adSkip.observeAdModule();
		} else {
			observer.disconnect();
		}
	});
}


main();
