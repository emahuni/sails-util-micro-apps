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
        console.log('test method on AfterController');
    }
};
