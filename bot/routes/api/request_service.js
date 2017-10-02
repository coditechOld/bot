var keystone = require('keystone');
var crypto = require('crypto');
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
            organizationName: req.body.contactOrganizationName,
            contactName: req.body.contactEmail,
            email: req.body.contactEmail,
            mobileNumber: req.body.contactMobileNumber,
            interested: req.body.contactInterests,
            budget: req.body.contactBudget
        }, {
            flashErrors: true,
            fields: 'organizationName, contactName, email,mobileNumber, interested,budget',
            errorMessage: 'There was a problem submitting your enquiry:',
        }, function (err) {
            // console.log('Errors ==>>> ', err.detail);

            if (err) {

                locals.validationErrors = err.errors;
                locals.data.request_service.success = false;
                locals.data.request_service.errors.organizationName = err.detail.organizationName;
                locals.data.request_service.errors.contactName = err.detail.contactName;
                locals.data.request_service.errors.contactEmail = err.detail.email;
                locals.data.request_service.errors.contactPhone = err.detail.mobileNumber;
                locals.data.request_service.errors.contactInterests = err.detail.interested;
                locals.data.request_service.errors.contactBudget = err.detail.budget;
            } else {
                locals.enquirySubmitted = true;
                locals.data.request_service.success = true;

            }
            next();
        });
    });

    // Render the view
    view.render('api/requestService');
    // return JSON.s
};
