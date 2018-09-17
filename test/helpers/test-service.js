const _ = require('lodash');

module.exports = async function testService (title, serviceName) {
		context(`${serviceName} service :: ${title}:`, async function () {
				it(`has ${serviceName} service`, async function (){
						expect(sails.services[serviceName.toLowerCase()]).to.be.an('object');
						// sails.log.debug(sails.services);
				});

				it(`can invoke service functions for ${serviceName}`, async function (){
						let ret = await global[_.upperFirst(serviceName)][`${serviceName}Test`]();

						expect(ret).to.be.ok;
				});
		});
}
