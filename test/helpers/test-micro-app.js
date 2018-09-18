const testModel = require('./test-model');
const testHelper = require('./test-helper');
const testService = require('./test-service');
const testConfig = require('./test-config');
const testController = require('./test-controller');
const testAction = require('./test-action');

module.exports = async function testMicroApp (title, mApp) {
		  // let's test the micro app's  model if it's working properly as expected
		  testModel(title, mApp);

		  // let's test extend capability of hook on micro app against the House main app model
		  testModel(title, 'app', `${mApp}Ext`);

		  // let's test helpers
		  testHelper(title, `${mApp}HelperTest`);
		  // testHelper(title, `fooBar`);

				// let's test services
				testService(title, `${mApp}Service`);

    // let's test config
    testConfig(title, `${mApp}ConfigVal`);

    // let's test controller
    testController(title, `${mApp}`);

				// let's test action
    testAction(title, `${mApp}`);
}
