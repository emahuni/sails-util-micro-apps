/**
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
				RuntimeController:{
								// test controller allowing
								'runtimeCtrlPolicyAllow': 'allowRuntime',
								// test controller denying
								'runtimeCtrlPolicyDeny': 'denyRuntime',
				},

				// standalone actions
				'runtimeaction/act-policy-allow': 'allowRuntime',
				'runtimeaction/act-policy-deny': 'denyRuntime',
};
