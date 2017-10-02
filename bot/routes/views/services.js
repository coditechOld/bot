var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.data = {
        services:[]
    }

    view.on('init', function (next) {
        
                var q = keystone.list('Service').model.find();
        
                q.exec(function (err, results) {
                    locals.data.services = results;
                    next(err);
                });
        
    });

    //CHANGE VIEW LATER
    view.render('testing');
        
}