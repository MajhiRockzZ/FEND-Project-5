let userConsent = false;

/**
 * Delay Service Worker
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        new IndexController();
    });
}

function IndexController() {
    this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function () {
    /**
     * Check if browser supports service worker
     */
    if (!navigator.serviceWorker) return;

    let IndexController = this;

}
}