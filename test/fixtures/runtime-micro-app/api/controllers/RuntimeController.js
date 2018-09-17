/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overide RuntimeController.js file on your sails main app
     * @param req
     * @param res
     */
    runtimeCtrlTest: function (req, res) {
        sails.log.info('test method on RuntimeController');
    }
};
