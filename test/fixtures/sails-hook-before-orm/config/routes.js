/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports.routes = {
    '/before/ctrltest': 'BeforeController.beforeCtrlTest'
    '/before/actiontest': 'beforeaction/test-action',

				'/beforeaction/act-policy-allow': 'beforeaction/act-policy-allow',
				'/beforeaction/act-policy-deny': 'beforeaction/act-policy-deny',

				'/before/beforectrlpolicyallow': 'BeforeController.beforeCtrlPolicyAllow',
				'/before/beforectrlpolicydeny': 'BeforeController.beforeCtrlPolicyDeny',
};
