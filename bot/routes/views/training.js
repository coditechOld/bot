const keystone = require('keystone');

exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);
    const locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'training';
    locals.data = {
        training: [],
        header: {
            background: null,
            title: null,
            text: null
        }
    };
    locals.title =  'Bot - Training ';


    view.on('init', function (next) {

        const q = keystone.list('TraningPage').model.findOne();

        q.exec(function (err, results) {
            locals.data.training = results;
            locals.data.header.background = results.image;
            locals.data.header.title = results.imageTitle;
            locals.data.header.text = results.imageText;
            next(err);
        });


    });

    // Render the view
    view.render('training');
};
