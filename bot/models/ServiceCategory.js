var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Service Model
 * =============
 */

var ServiceCategory = new keystone.List('ServiceCategory', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});


ServiceCategory.add({
    title: { type: String, required: true },
    icon: { type: String},
    briefDescription: {type: String },
    categoryComponents:{type: Types.Html, wysiwyg: true, height: 400}
});

ServiceCategory.register();