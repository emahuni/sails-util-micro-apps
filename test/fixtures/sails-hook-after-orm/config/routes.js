/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports.routes = {
    '/after/ctrltest': 'AfterController.afterCtrlTest',
    '/after/actiontest': 'afteraction/test-action',

				'/afteraction/act-policy-allow': 'afteraction/act-policy-allow',
				'/afteraction/act-policy-deny': 'afteraction/act-policy-deny',

				'/after/afterctrlpolicyallow': 'AfterController.afterCtrlPolicyAllow',
				'/after/afterctrlpolicydeny': 'AfterController.afterCtrlPolicyDeny',
};
