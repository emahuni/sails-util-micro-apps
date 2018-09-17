/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overrided on BeforeService.js file on your sails server
     * @param req
     * @param res
     */
    beforeServiceTest: function (req, res) {
        console.log('test method on BeforeService');
    }
};