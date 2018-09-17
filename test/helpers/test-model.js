module.exports = async function testModel (modelName) {
		let Model, ModelName = _.upperFirst(modelName);

		before ( function () {
				Model = global[ModelName]; // the reason why I am plucking this from global is for me to test if it was globalised properly
		});

		context(`${ModelName} model ::`, async function () {
				it(`successfully injected ${ModelName} model`, async function (){
						expect(sails.models[modelName]).to.be.an('object');
						expect(Model).to.be.an('object');
				});

				it(`can (create & find) records`, async function (){
						for (let i=0; i<3; i++){
								await Model.create({
										name: `${modelName} ${i}`
								});
						}

						let recs = await Model.find();

						expect(recs).to.be.an('array').with.lengthOf(3);
						expect(recs[1].name).to.be.eql(`${modelName} 1`);
				});

				it(`can (update) records`, async function (){
						let recs = await Model.update({name: `${modelName} 2`}, {name: `${modelName} 2.1`}).fetch();

						expect(recs[0].name).to.be.eql(`${modelName} 2.1`);
				});

				it(`can (delete) records`, async function (){
						await Model.destroy({});

						let recs = await Model.find();

						expect(recs).to.be.an('array').with.lengthOf(0);
				});

		});
}
