module.exports = async function testHelper (title, helperName) {
		context(`${helperName} helper :: ${title}:`, async function () {
				it(`has ${helperName} helper`, async function (){
						expect(sails.helpers[helperName]).to.be.a('function');
						sails.log.debug(sails.helpers);
				});

				it(`can invoke helper ${helperName}`, async function (){
						let ret = await sails.helpers[helperName]();

						expect(ret).to.be.ok;
				});
		});
}
