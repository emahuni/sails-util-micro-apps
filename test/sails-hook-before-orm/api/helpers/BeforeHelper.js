/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overriden on BeforeHelper.js file on your sails server
     * @param req
     * @param res
     */
    beforeHelperTest: function (req, res) {
        console.log('test method on BeforeHelper');
    }
};
