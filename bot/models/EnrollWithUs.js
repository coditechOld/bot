var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var EnrollWithUS = new keystone.List('EnrollWithUS', {
    nocreate: true,
    noedit: true,
});

EnrollWithUS.add({
    // name email phoneNumber ,  area
    contactName: {type: Types.Name, required: true},
    email: {type: Types.Email, required: true},
    phoneNumber: {type: String, required: true},
    area: {
        type: Types.Select, options: [
            {value: 'tripoli', label: 'Tripoli'},
            {value: 'akkar', label: 'Akkar'},
            {value: 'nabatieh', label: 'Nabatieh'},
            {value: 'sidon', label: 'Sidon'},
            {value: 'chouf', label: 'Chouf'},
            {value: 'beirut', label: 'Beirut'},
            {value: 'baalbeck', label: 'Baalbeck'},
            {value: 'central-beqaa', label: 'Central Beqaa'},
        ], required: true
    },
    createdAt: {type: Date, default: Date.now}
});

EnrollWithUS.schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

EnrollWithUS.schema.post('save', function () {
    if (this.wasNew) {
        // this.sendNotificationEmail();
    }
});

EnrollWithUS.schema.methods.sendNotificationEmail = function (callback) {
    if (typeof callback !== 'function') {
        callback = function (err) {
            if (err) {
                {

                    var view = new keystone.View(req, res);
                    var locals = res.locals;
                    // Set locals

                    // locals.section is used to set the currently selected
                    // item in the header navigation.
                    locals.section = 'request_services';
                    locals.interestedTypes = EnrollWithUS.fields.interested.ops;
                    locals.contactBudgetTypes = EnrollWithUS.fields.budget.ops;
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

EnrollWithUS.defaultSort = '-createdAt';
EnrollWithUS.defaultColumns = 'organizationName, contactName, email, mobileNumber, interested, budget, createdAt';
EnrollWithUS.register();
