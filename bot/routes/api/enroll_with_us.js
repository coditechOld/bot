const keystone = require('keystone');
const crypto = require('crypto');
const EnrollWithUs = keystone.list('EnrollWith');

exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);
    const locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';
    locals.data = {
        enrollWithUs: {
            success: false,
            enrollWithUs: {},
            errors: {
                contactName: true
                , contactEmail: true
                , contactPhoneNumber: true
                , contactArea: true
            },

        }

    };

    // On POST requests, add the Enquiry item to the database
    view.on('post', {action: 'enroll_with_us'}, function (next) {

        const newEnrollWithUs = new EnrollWithUs.model();
        const updater = newEnrollWithUs.getUpdateHandler(req);

        updater.process({
            contactName: req.body.contactName,
            contactEmail: req.body.contactEmail,
            phoneNumber: req.body.contactPhoneNumber,
            area: req.body.contactArea,
        }, {
            flashErrors: true,
            fields: 'contactName, contactEmail, phoneNumber,area',
            errorMessage: 'There was a problem submitting your enquiry:',
        }, function (err) {
            // console.log('Errors ==>>> ', err.detail);

            if (err) {

                locals.validationErrors = err.errors;
                locals.data.enrollWithUs.success = false;
                locals.data.enrollWithUs.errors.contactName = err.detail.contactName;
                locals.data.enrollWithUs.errors.contactEmail = err.detail.contactEmail;
                locals.data.enrollWithUs.errors.contactPhoneNumber = err.detail.phoneNumber;
                locals.data.enrollWithUs.errors.contactArea = err.detail.area;
            } else {
                locals.enquirySubmitted = true;
                locals.data.enrollWithUs.success = true;

            }
            next();
        });
    });

    // Render the view
    view.render('api/enrollWithUs');
    // return JSON.s
};
