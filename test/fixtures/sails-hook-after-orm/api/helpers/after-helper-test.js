/**
 * Created by Emmanuel Mahuni. MIT 2018
 */

module.exports = {
		friendlyName: 'After helper test',


		description: '',


		inputs: {

		},


		exits: {

		},


		fn: async function (inputs, exits) {
				sails.log.verbose('afterHelperTest works!');

				// All done.
				return exits.success(true);

		}

};
