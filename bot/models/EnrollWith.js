const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

const EnrollWithUS = new keystone.List('EnrollWith', {
    nocreate: true,
    noedit: true,
    label: 'Enroll With Us',
});

EnrollWithUS.add({
    // name email phoneNumber ,  area
    contactName: {type: Types.Name, required: true},
    contactEmail: {type: Types.Email, required: true},
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

                    const view = new keystone.View(req, res);
                    const locals = res.locals;
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

    const contact = this;
    const brand = keystone.get('brand');

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
