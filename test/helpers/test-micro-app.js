const testModel = require('./test-model');
const testHelper = require('./test-helper');

module.exports = async function testMicroApp (title, mApp) {
		// let's test the micro app's  model if it's working properly as expected
		testModel(title, mApp);

		// let's test extend capability of hook on micro app against the House main app model
		testModel(title, 'house', `${mApp}Ext`);

		// let's test helpers
		testHelper(title, `${mApp}HelperTest`);
		// testHelper(title, `fooBar`);
}
