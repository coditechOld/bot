var keystone = require('keystone');
var crypto = require('crypto');
var Contact = keystone.list('Contact');
var RequestService = keystone.list('RequestService');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';
    locals.data = {
        request_service: {
            success: false,
            request_service: {},
            errors: {
                organizationName: true
                , contactName: true
                , contactEmail: true
                , contactPhone: true
                , contactInterests: true
                , contactBudget: true
            },

        }

    };

    // On POST requests, add the Enquiry item to the database
    view.on('post', {action: 'request_service'}, function (next) {

        var newRequestService = new RequestService.model();
        var updater = newRequestService.getUpdateHandler(req);

        console.log('req.body ==>>', req.body);
        updater.process({
            name: req.body.contactName,
            email: req.body.contactEmail,
            phone: req.body.contactPhone,
            subject: req.body.contactSubject,
            message: req.body.contactMessage
        }, {
            flashErrors: true,
            fields: 'name, email, phone,subject, message',
            errorMessage: 'There was a problem submitting your enquiry:',
        }, function (err) {
            console.log('Errors ==>>> ', err);

            if (err) {

                locals.validationErrors = err.errors;
                locals.data.contact.success = false;
                locals.data.contact.errors.name = err.detail.name;
                locals.data.contact.errors.email = err.detail.email;
                locals.data.contact.errors.phone = err.detail.phone;
                locals.data.contact.errors.subject = err.detail.subject;
                locals.data.contact.errors.message = err.detail.message;
            } else {
                locals.enquirySubmitted = true;
            }
            next();
        });
    });

    // Render the view
    view.render('api/contact');
    // return JSON.s
};
