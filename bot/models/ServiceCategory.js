var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Service Model
 * =============
 */

var ServiceCategory = new keystone.List('ServiceCategory', {
	map: { name: 'title' },
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/servicesicons'), // required; path where the files should be stored
  		publicPath: '/images/servicesicons/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});
ServiceCategory
ServiceCategory.add({
    title: { type: String, required: true },
    icon: { type: Types.File, storage: myStorage},
    briefDescription: {type: String },
    categoryComponents:{type: Types.Html, wysiwyg: true, height: 400}
});

ServiceCategory.register();