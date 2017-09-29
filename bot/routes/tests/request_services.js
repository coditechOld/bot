var keystone = require('keystone');
var RequestService = keystone.list('RequestService');
exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'request_services';
    locals.enquiryTypes = RequestService.fields.interested.ops;

    locals.data = {
        posts: []

    };

    // Render the view
    view.render('test/request_services');
};
