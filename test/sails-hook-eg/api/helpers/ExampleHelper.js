/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overrided on ExampleHelper.js file on your sails server
     * @param req
     * @param res
     */
    test: function (req, res) {
        console.log('test method on ExampleHelper');
    }
};
