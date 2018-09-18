/**
 * Created by Emmanuel Mahuni. MIT 2018
 */

module.exports = {
		friendlyName: 'App helper test',


		description: '',


		inputs: {

		},


		exits: {

		},


		fn: async function (inputs, exits) {
				sails.log.verbose('appHelperTest works!');

				// All done.
				return exits.success(true);

		}

};
