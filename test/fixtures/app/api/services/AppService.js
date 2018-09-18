/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overrided on AppService.js file on your sails server
     * @param req
     * @param res
     */
    appServiceTest: function (req, res) {
        sails.log.verbose('test method on AppService');

								return true;
    }
};
