/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overide AppController.js file on your sails main app
     * @param req
     * @param res
     */
    appCtrlTest: function (req, res) {
        sails.log.verbose('test method on AppController');
        res.send(true);
    }
};
