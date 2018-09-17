/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be override RuntimeService.js file on your sails server
     * @param req
     * @param res
     */
    runtimeServiceTest: function (req, res) {
        sails.log.info('test method on RuntimeService');

				return true;
    }
};
