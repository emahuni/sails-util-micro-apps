const _ = require('lodash');

module.exports = async function testPolicy (title, action, policy, route) {
				let actionPolicy = `${action}/${policy}`;

				context(`${actioPolicy} policy :: ${title}:`, async function () {
								it(`has injected test action policy ${actionPolicy} into config policies`, async function (){
												expect(sails.config.policies[actionPolicy]).to.be.eql(policy);
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
																				if(err) done(err);

																				expect(res.statusCode).to.be.eql(403);

																				done();
																})
												});
								}
				});
}
