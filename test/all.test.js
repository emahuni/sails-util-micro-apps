let __line = new require('lineno')(__filename).get;

const testMicroApp = require('./helpers/test-micro-app');

describe('Sails-hook-micro-apps Hook tests #', function () {

  // Test that Sails can lift with the hook in place
  it(`@${__line()} doesn\'t crash Sails`, async function () {
    return true;
  });

  // this tests the app api that we know was loaded normally, nothing should fail otherwise we have broken tests in testMicroApp
  context(`App API control test - none under here should fail, otherwise the failing test suite is broken ::`, async function () {
    testMicroApp('app');
  });

  // now test the injections
  context('Micro-Apps Injection Tests ::', async function () {
    context(`Before ORM Hook - Micro-App injection :: Injected using the parent module path:`, async function () {
      testMicroApp('before');
    });

    context(`After ORM Hook - Micro-App injection :: Injected using a path given to configure and adapt in the requiring module:`, async function () {
      testMicroApp('after');
    });

    context(`Throw when injection is done at runtime (sails.isLifted) :: to be removed once runtime injection has been fixed:`, async function () {
      it(`throws when used at runtime`, async function (){
        expect(()=>require('../')(sails, __dirname + '/fixtures/runtime-micro-app')).to.throw();
      });
    });

    // let's not do these test for now, the feature is not ready.
    context.skip(`Runtime Micro-App injection :: Injected by using given loader path (sails.isLifted):`, async function () {
      before(async function (){
        const loader = require('../')(sails, __dirname + '/fixtures/runtime-micro-app');

        loader.configure();

        loader.adapt();
      });

      testMicroApp('runtime');
    });
  });

});
