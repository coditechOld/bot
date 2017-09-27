var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.data = {
		partner: [],
    };
    
    locals.filters={
        slug:req.params.partner
    };


    view.on('init', function (next) {
        
                var q = keystone.list('Partner').model.findOne({
                    slug:locals.filters.slug
                });
        
                q.exec(function (err, results) {
                    locals.data.partner = results;
                    next(err);
                });
        
    });

    //CHANGE VIEW LATER
    view.render('testing');
}

