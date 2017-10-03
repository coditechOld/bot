var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';
    locals.data = {
        homeSliders: [],
        homeVideo: [],
        service: [],
        homepageHowItWorks: [],
        testimonial: [],
        partners: [],
        homepageBanner: [],
        blogPosts: [],


    };


    view.on('init', function (next) {

        var q = keystone.list('HomepageSlide').model.find();

        q.exec(function (err, results) {
            locals.data.homeSliders = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('HomepageVideo').model.find();

        q.exec(function (err, results) {
            locals.data.homeVideo = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('Service').model.find();

        q.exec(function (err, results) {
            locals.data.service = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('HomepageHowItWorks').model.find();

        q.exec(function (err, results) {
            locals.data.homepageHowItWorks = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('Testimonial').model.find();

        q.exec(function (err, results) {
            locals.data.testimonial = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('Partner').model.find();

        q.exec(function (err, results) {
            locals.data.partners = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('HomepageBanner').model.findOne();

        q.exec(function (err, results) {
            locals.data.homepageBanner = results;
            next(err);
        });


    });
    view.on('init', function (next) {
        var q = keystone.list('Post').model.find().where('state', 'published').sort('publishedDate').populate('author categories').limit(3);


        q.exec(function (err, results) {
            console.log('Error ==> ', err);

            locals.data.blogPosts = results;
            next(err);
        });


    });

    // Render the view
    view.render('index');
};
