const _ = require('lodash');

module.exports = async function testConfig (title, configName) {
    context(`${configName} config :: ${title}:`, async function () {
	       it(`has ${configName} config set to true`, async function (){
	           expect(sails.config.custom[configName]).to.be.true;
	           // sails.log.debug(sails.config);
	       });

    });
}
