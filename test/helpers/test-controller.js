const _ = require('lodash');

module.exports = async function testController (title, controllerName) {
		context(`${controllerName} controller :: ${title}:`, async function () {
				it(`has injected ${controllerName}Controller action ${controllerName}CtrlTest`, async function (){
						  expect(sails._actions[`${controllerName}/${controllerName}CtrlTest`]).to.be.an('object');
						// sails.log.debug(sails.controllers);
				});

		// 		it(`can invoke controller action for ${controllerName}Controller`, async function (){
		// 				let ret = await global[_.upperFirst(controllerName)][`${controllerName}Test`]();

		// 				expect(ret).to.be.ok;
		// 		});
		});
}
