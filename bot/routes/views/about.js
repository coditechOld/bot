var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';
    locals.data = {
        aboutSliders: [],
        about: []


    };


    view.on('init', function (next) {

        var q = keystone.list('AboutUsSlide').model.find();

        q.exec(function (err, results) {
            locals.data.aboutSliders = results;
            next(err);
        });


    });


    view.on('init', function (next) {

        var q = keystone.list('About').model.findOne();

        q.exec(function (err, results) {
            locals.data.about = results;
            next(err);
        });


    });

    // Render the view
    view.render('about');
};
