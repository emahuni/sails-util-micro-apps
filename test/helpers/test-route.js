const _ = require('lodash');

module.exports = async function testRoute (title, routeName) {
				// the sails.router.explicitRoutes dictionary uses lowercase of routes definitions, so prepare for that
				// let routename = routeName.toLowerCase();
				let route1 = `/${routeName}/ctrltest`;
				let route2 = `/${routeName}/actiontest`;


				context(`${routeName} route :: ${title}:`, async function () {
								it(`has injected test controller route ${route1}`, async function (){
												expect(sails.router.explicitRoutes[route1]).to.be.a('string');
								});

								it(`has injected test action route ${route2}`, async function (){
												expect(sails.router.explicitRoutes[route2]).to.be.a('string');
												// sails.log.debug(sails._routes);
								});
				});
}
