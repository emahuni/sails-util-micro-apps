module.exports = async function testModel (title, modelName, attr = 'name') {
				let Model, ModelName = _.upperFirst(modelName);

				before ( function () {
								Model = global[ModelName]; // the reason why I am plucking this from global is for me to test if it was globalised properly
								// sails.log.debug(`${modelName}  schema`, Model.schema);
				});


				let pre = attr.includes('Ext') ? 'Extended ' : '';

				context(`${pre}${ModelName} model :: ${title}:`, async function () {
								it(`has ${ModelName} model`, async function (){
												expect(sails.models[modelName]).to.be.an('object');
												expect(Model).to.be.an('object');
								});

								it(`has ${attr} attribute in model`, async function (){
												expect(Model.schema[`${attr}`]).to.be.ok;
								});

								it(`can (create & find) records using attrib: ${attr}`, async function (){
												for (let i=0; i<3; i++){
																await Model.create({
																				[attr]: `${modelName} ${i}`
																});
												}

												let recs = await Model.find();

												expect(recs).to.be.an('array').with.lengthOf(3);
												expect(recs[1][attr]).to.be.eql(`${modelName} 1`);
								});

								it(`can (update) records using attrib: ${attr}`, async function (){
												let recs = await Model.update({ [attr]: `${modelName} 2` }, { [attr]: `${modelName} 2.1` }).fetch();

												expect(recs[0][attr]).to.be.eql(`${modelName} 2.1`);
								});

								it(`can (delete) records using attrib: ${attr}`, async function (){
												await Model.destroy({});

												let recs = await Model.find();

												expect(recs).to.be.an('array').with.lengthOf(0);
								});

				});
}
