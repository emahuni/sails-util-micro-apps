/**
 * Created by Emmanuel Mahuni. MIT 2018
 */
module.exports = function (req, res, next) {
    console.log('before orm policy test ok');
    next();
};
