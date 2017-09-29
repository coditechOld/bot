var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Contact = new keystone.List('Contact', {
    nocreate: true,
    noedit: true,
});

Contact.add({
    name: {type: Types.Name, required: true},
    email: {type: Types.Email, required: true},
    phone: {type: String},
    subject: {type: String, required: true},
    message: {type: Types.Markdown, required: true},
    createdAt: {type: Date, default: Date.now},
});

Contact.schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

Contact.schema.post('save', function () {
    if (this.wasNew) {
        // this.sendNotificationEmail();
    }
});

Contact.schema.methods.sendNotificationEmail = function (callback) {
    if (typeof callback !== 'function') {
        callback = function (err) {
            if (err) {
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

Contact.defaultSort = '-createdAt';
Contact.defaultColumns = 'name, email, enquiryType, createdAt';
Contact.register();
