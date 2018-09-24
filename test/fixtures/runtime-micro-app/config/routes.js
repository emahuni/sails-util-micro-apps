/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports.routes = {
    '/runtime/ctrltest': 'RuntimeController.runtimeCtrlTest',
    '/runtime/actiontest': 'runtimeaction/test-action',

				'/runtimeaction/act-policy-allow': 'runtimeaction/act-policy-allow',
				'/runtimeaction/act-policy-deny': 'runtimeaction/act-policy-deny',

				'/runtime/runtimectrlpolicyallow': 'RuntimeController.runtimeCtrlPolicyAllow',
				'/runtime/runtimectrlpolicydeny': 'RuntimeController.runtimeCtrlPolicyDeny',

};
