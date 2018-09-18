const _ = require('lodash');

module.exports = async function testAction (title, actionName) {
				// the sails._actions dictionary uses lowercase of actions definitions, so prepare for that
				let actionname = actionName.toLowerCase();
				let action = `${actionname}action/test-action`;


				context(`${actionName} action :: ${title}:`, async function () {
								it(`has injected action ${actionName}Action/test-action`, async function (){
												// sails.log.debug('action: ', action);
												expect(sails._actions[action]).to.be.a('function');
												// sails.log.debug(sails._actions);
								});
				});
}
