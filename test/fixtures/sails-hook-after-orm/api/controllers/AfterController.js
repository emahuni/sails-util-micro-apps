/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overide AfterController.js file on your sails main app
     * @param req
     * @param res
     */
    afterCtrlTest: function (req, res) {
        sails.log.verbose('test method on AfterController');
        res.send(true);
    },

    afterCtrlPolicyAllow: function (req, res) {
        sails.log.verbose('test after allow policy');
        res.send(true);
    },
    afterCtrlPolicyDeny: function (req, res) {
        sails.log.verbose('test after deny policy');
        res.send(true);
    },
};
