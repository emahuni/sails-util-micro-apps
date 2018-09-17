const testModel = require('./test-model');

module.exports = async function testMicroApp (mApp) {
		// let's test the micro app's  model if it's working properly as expected
		testModel(mApp);

		// let's test extend capability of hook on micro app against the House main app model
		// testModel('house', `${mApp}Ext`);
}
