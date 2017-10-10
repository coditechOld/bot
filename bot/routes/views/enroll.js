const keystone = require('keystone');
const EnrollWithUs = keystone.list('EnrollWith');
exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);
    const locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'enroll-with-us';
    locals.contactArea = EnrollWithUs.fields.area.ops;
    locals.title = 'Bot - Enroll With Us ';

    locals.formData = req.body || {};

    locals.data = {
        posts: [],
        header: {
            background: null,
            title: null,
            text: null,
        },
    };
    view.on('init', function (next) {

        const q = keystone.list('EnrollWithUsBanner').model.findOne();

        q.exec(function (err, results) {
            locals.data.header.background = results.image;
            locals.data.header.title = results.title;
            locals.data.header.text = results.text;
            next(err);
        });


    });

    // Render the view
    view.render('enrollWithUs');
};
