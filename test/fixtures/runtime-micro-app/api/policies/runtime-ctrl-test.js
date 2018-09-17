/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = function (req, res, next) {
    sails.log.info('runtime policy test ok');
    next();
};
