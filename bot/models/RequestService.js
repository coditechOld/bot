var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var RequestService = new keystone.List('RequestService', {
    nocreate: true,
    noedit: true,
});

RequestService.add({
    organizationName: {type: Types.Name, required: true},
    contactName: {type: Types.Name, required: true},
    email: {type: Types.Email, required: true},
    mobileNumber: {type: String, required: true},
    interested: {
        type: Types.Select, options: [
            {value: 'mobile-and-web', label: 'Mobile and Web'},
            {value: 'data', label: 'Data'},
            {value: 'e-commerce', label: 'E-Commerce'},
            {value: 'marketing', label: 'Marketing'},
            {value: 'design', label: 'Design'},
        ], required: true
    },
    budget: {
        type: Types.Select, options: [
            {value: '500', label: 'Less Than $500'},
            {value: '1000', label: 'Less than $1,000'},
            {value: '5000', label: 'Less than $5,000'},
            {value: 'other', label: '5000 plus'},
        ], required: true
    },
    createdAt: {type: Date, default: Date.now}
});

RequestService.schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

RequestService.schema.post('save', function () {
    if (this.wasNew) {
        // this.sendNotificationEmail();
    }
});

RequestService.schema.methods.sendNotificationEmail = function (callback) {
    if (typeof callback !== 'function') {
        callback = function (err) {
            if (err) {{

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // Set locals

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'request_services';
    locals.interestedTypes = RequestService.fields.interested.ops;
    locals.contactBudgetTypes = RequestService.fields.budget.ops;
    locals.formData = req.body || {};

    locals.data = {
        posts: []

    };

    // Render the view
    view.render('test/request_services');
}
                console.error('There was an error sending the notification email:', err);
            }
        };
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        return callback(new Error('could not find mailgun credentials'));
    }

    var contact = this;
    var brand = keystone.get('brand');

    keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
        if (err) return callback(err);
        new keystone.Email({
            templateName: 'enquiry-notification',
            transport: 'mailgun',
        }).send({
            to: admins,
            from: {
                name: 'BOT',
                email: 'contact@bot.com',
            },
            subject: 'New Enquiry for BOT',
            contact: contact,
            brand: brand,
            layout: false,
        }, callback);
    });
};

RequestService.defaultSort = '-createdAt';
RequestService.defaultColumns = 'organizationName, contactName, email, mobileNumber, interested, budget, createdAt';
RequestService.register();
