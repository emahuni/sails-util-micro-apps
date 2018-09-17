/**
 * Created by Emmanuel Mahuni. MIT 2018
 */

module.exports = {
		friendlyName: 'Runtime helper test',


		description: '',


		inputs: {

		},


		exits: {

		},


		fn: async function (inputs, exits) {
				console.log('runtimeHelperTest works!');

				// All done.
				return exits.success(true);

		}

};
