const _ = require('lodash');

module.exports = async function testPolicy (title, _action, type, check) {
  let policy = `${check}${_.upperFirst(_action)}`;
  let ctrl = type === 'action' ? `${_action.toLowerCase()}action`: `${_action.toLowerCase()}`;
  let action = type === 'action' ? `act-policy-${check}`: `${_action}ctrlpolicy${check}`;
  let route = `/${ctrl}/${action}`;
  let actionPolicy = `${ctrl}/${action}`;

  context(`${actionPolicy} action for policy ${policy} :: ${title}:`, async function () {
    it(`has injected test action ${actionPolicy} policy ${policy} into config policies`, async function (){
      // sails.log.debug('sails.router.explicitRoutes: ', sails.router.explicitRoutes);
      // sails.log.debug('sails.config.policies: ', sails.config.policies);
      expect(sails.config.policies[actionPolicy][0]).to.be.eql(policy);
    });

    if (policy.includes('allow')){
      it(`can allow test action ${actionPolicy} for policy ${policy} on route ${route}`, function (done){
        sails.request(route, (err, res, body)=>{
          if(err) done(err);

          expect(res.statusCode).to.be.eql(200);

          done();
        })
      });
    } else {
      it(`can deny test action ${actionPolicy} for policy ${policy} on route ${route}`, function (done){
        sails.request(route, (err, res, body)=>{
          // sails.log.debug('err: ', err);
          // sails.log.debug('body: ', body);
          // sails.log.debug('res: ', res);
          if(err) done(err);

          expect(err.status).to.be.eql(403);

          done();
        })
      });
    }
  });
}
