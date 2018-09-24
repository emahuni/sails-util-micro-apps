/**
 * Created by Emmanuel Mahuni. MIT 2018
 *
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
				/***************************************************************************
					*                                                                          *
					* Default policy for all controllers and actions, unless overridden.       *
					* (`true` allows public access)                                            *
					*                                                                          *
					***************************************************************************/

				// '*': true,

				BeforeController:{
								// test controller allowing
								'beforeCtrlPolicyAllow': 'allowBefore',
								// test controller denying
								'beforeCtrlPolicyDeny': 'denyBefore',
				},

				// standalone actions
				'beforeaction/act-policy-allow': 'allowBefore',
				'beforeaction/act-policy-deny': 'denyBefore',
};
