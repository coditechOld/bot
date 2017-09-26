var keystone = require('keystone');

exports = module.exports = function (req, res) {
    
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'homepageslider';

    locals.data = {
        slides: []
    };

    view.on('init', function(next) {

        var q = keystone.list('HomepageSlide').model.find();

        q.exec(function(err, results) {
            locals.data.slides = results;
            next(err);
        });
    });

    

}