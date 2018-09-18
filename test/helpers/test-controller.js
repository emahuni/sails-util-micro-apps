const _ = require('lodash');

module.exports = async function testController (title, controllerName) {
				// the sails._actions dictionary uses lowercase of actions definitions, so prepare for that
				let controllername = controllerName.toLowerCase();
				let action = `${controllername}/${controllername}ctrltest`;


				context(`${controllerName} controller :: ${title}:`, async function () {
								it(`has injected ${controllerName}Controller action ${controllerName}CtrlTest`, async function (){
												// sails.log.debug('action: ', action);
												expect(sails._actions[action]).to.be.a('function');
												// sails.log.debug(sails._actions);
								});
				});
}
