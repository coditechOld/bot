var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Service Model
 * =============
 */

var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});


Service.add({
    title: { type: String, required: true },
    icon: { type: String},
    briefDescription: {type: String },
    categoryComponents:{type: Types.Html, wysiwyg: true, height: 400}
});

Service.register();