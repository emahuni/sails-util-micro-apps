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
				sails.log.info('runtimeHelperTest works!');

				// All done.
				return exits.success(true);

		}

};
