var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ServiceCategory Model
 * ====================
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

ServiceCategory.add({
    title: { type: String, required: true },
    briefDescription:{type:String},
    icon: { type: Types.File, storage: myStorage},
});

ServiceCategory.relationship({ ref: 'Service', path: 'services', refPath: 'categories' });

ServiceCategory.register();
