var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'homepage';

	locals.data = {
		slides: [],
		services: [],
		video: [],
		howitworks: [],
		banner: [],
        partners: [],
        testimonials:[],
	}

	view.on('init', function (next) {

		var q = keystone.list('HomepageSlide').model.find();

		q.exec(function (err, results) {
			locals.data.slides = results;
			next(err);
		});

	});

	view.on('init', function (next) {

		var q = keystone.list('ServiceCategory').model.find();

		q.exec(function (err, results) {
			locals.data.services = results;
			next(err);
		});

	});

	view.on('init', function (next) {

		var q = keystone.list('HomepageVideo').model.findOne();

		q.exec(function (err, results) {
			locals.data.video = results;
			next(err);
		});

	});

	view.on('init', function (next) {

		var q = keystone.list('HomepageHowItWorks').model.findOne();

		q.exec(function (err, results) {
			locals.data.howitworks = results;
			next(err);
		});

	});

	view.on('init', function (next) {
    
		var q = keystone.list('HomepageBanner').model.findOne();

		q.exec(function (err, results) {
			locals.data.banner = results;
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

		var q = keystone.list('Testimonial').model.find();

		q.exec(function (err, results) {
			locals.data.testimonials = results;
			next(err);
        });
        
	});

	//ADD HOMEPAGEVIEW @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    view.render('testing');
    
}
