var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Request Service Banner Model
 * ============================
 */

var RequestServiceBanner = new keystone.List('RequestServiceBanner',{
	map: { name: 'title' },
 });

 var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/requestservicebanner'), // required; path where the files should be stored
  		publicPath: '/images/requestservicebanner/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

RequestServiceBanner.add({
    title: { type: String},	
    image: { type: Types.File, storage: myStorage},
    text: { type: String },
});

RequestServiceBanner.register();