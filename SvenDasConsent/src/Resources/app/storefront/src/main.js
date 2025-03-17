import './das-consent/das-consent.js';

// Reference Shopware's PluginManager
const PluginManager = window.PluginManager;

// Define the plugin inline
class SvenDasConsent extends Plugin {
    init() {
        super.init();
        console.log('SvenDasConsent plugin initialized');
    }
}

// Register the plugin directly
PluginManager.register('SvenDasConsent', SvenDasConsent, '[data-sven-das-consent]');