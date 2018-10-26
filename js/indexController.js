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

    let indexController = this;

    /**
     * Register new service worker
     */
    navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Service Worker successfully registered with scope : ', reg.scope);

        /**
         * TODO: Add comment(Sumesh)
         */
        if (!navigator.serviceWorker.controller) {
            return;
        }

        /**
         * Check for WAITING WORKER
         */
        if (reg.waiting) {
            indexController._updateReady(reg.waiting);
            return;
        }

        /**
         * Check for INSTALLING WORKER
         */
        if (reg.installing) {
            indexController._trackInstalling(reg.installing);
            return;
        }
    });
};