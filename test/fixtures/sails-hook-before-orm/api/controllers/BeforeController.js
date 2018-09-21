/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overide BeforeController.js file on your sails main app
     * @param req
     * @param res
     */
    beforeCtrlTest: function (req, res) {
        sails.log.verbose('test method on BeforeController');
        res.send(true);
    },

    beforeCtrlPolicyAllow: function (req, res) {
        sails.log.verbose('test before allow policy');
        res.send(true);
    },
    beforeCtrlPolicyDeny: function (req, res) {
        sails.log.verbose('test before deny policy');
        res.send(true);
    },
};
