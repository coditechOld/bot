var keystone = require('keystone');
var crypto = require('crypto');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';
    locals.data = {
        posts: []

    };


    // On POST requests, add the Enquiry item to the database
    view.on('post', {action: 'subscribe'}, function (next) {
        var email = req.body.email.toLowerCase();
        var email_hashed = crypto.createHash('md5').update(email).digest('hex');


    });

    view.query('sliders', keystone.list('HomepageSlide').model.find().sort('sortOrder'));

    // Render the view
    view.render('index');
};
