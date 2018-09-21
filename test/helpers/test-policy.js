const _ = require('lodash');

module.exports = async function testPolicy (title, action, policy) {
				let route = `/${action}`;

				context(`${action} action for policy ${policy} :: ${title}:`, async function () {
								it(`has injected test action ${action} policy ${policy} into config policies`, async function (){
												sails.log.debug('sails.config.policies: ', sails.config.policies);
												expect(sails.config.policies[action][0]).to.be.eql(policy);
								});

								if (policy.includes('allow')){
												it(`can allow test action ${action} for policy ${policy}`, function (done){
																sails.request(route, (err, res, body)=>{
																				if(err) done(err);

																				expect(res.statusCode).to.be.eql(200);

																				done();
																})
												});
								} else {
												it(`can deny test action ${action} for policy ${policy}`, function (done){
																sails.request(route, (err, res, body)=>{
																				sails.log.debug('err: ', err);
																				//if(err) done(err);

																				expect(err.status).to.be.eql(403);

																				done();
																})
												});
								}
				});
}
