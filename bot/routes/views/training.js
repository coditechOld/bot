const keystone = require('keystone');

exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);
    const locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'training';
    locals.data = {
        training: []
    };

    view.on('init', function (next) {

        const q = keystone.list('TraningPage').model.findOne();

        q.exec(function (err, results) {
            locals.data.training = results;
            next(err);
        });


    });

    // Render the view
    view.render('training');
};
