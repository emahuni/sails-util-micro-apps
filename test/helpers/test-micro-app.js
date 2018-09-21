const testModel = require('./test-model');
const testHelper = require('./test-helper');
const testService = require('./test-service');
const testConfig = require('./test-config');
const testController = require('./test-controller');
const testAction = require('./test-action');
const testRoute = require('./test-route');
const testPolicy = require('./test-policy');

const _ = require('lodash');

module.exports = async function testMicroApp (mApp) {
				// let's test the micro app's  model if it's working properly as expected
		  testModel('test newly injected model', mApp);

		  // let's test extend capability of hook on micro app against the House main app model
		  testModel('test model extending and overridding capability', 'app', `${mApp}Ext`);

		  // let's test helpers
		  testHelper('test newly injected helpers', `${mApp}HelperTest`);
		  // testHelper(title, `fooBar`);

				// let's test services
				testService('test newly injected services', `${mApp}Service`);

    // let's test config
    testConfig('test newly injected config', `${mApp}ConfigVal`);

    // let's test controller
    testController('test newly injected controller', `${mApp}`);

				// let's test action
    testAction('test newly injected standalone action', `${mApp}`);

				// let's test routes
				testRoute('test newly injected routes',  `${mApp}`);

				// let's test policies
				testPolicy('test newly injected policies (allow)', `${mApp.toLowerCase()}action/act-policy-allow`, `allow${_.upperFirst(mApp)}`);
				testPolicy('test newly injected policies (deny)', `${mApp.toLowerCase()}action/act-policy-deny`, `deny${_.upperFirst(mApp)}`);
}
