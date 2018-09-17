/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = {
    /**
     * Can be overriden on ExampleHelper.js file on your sails server
     * @param req
     * @param res
     */
    afterHelperTest: function (req, res) {
        console.log('test method on AfterHelper');
    }
};
