/**
 * @fileOverview
 * @name act-policy-deny.js
 * @author Emmanuel Mahuni <emahuni@gmail.com>
 * @license MIT
 */

module.exports = {


  friendlyName: 'Test action',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    return exits.success(true);

  }


};
