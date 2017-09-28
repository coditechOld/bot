var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About Us Slider Model
 * =====================
 */

 var AboutUsSlide = new keystone.List('AboutUsSlide',{
	map: { name: 'title' },
 });

 var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/aboutusslides'), // required; path where the files should be stored
  		publicPath: '/images/aboutusslides/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

AboutUsSlide.add({
  title: { type: String},	
  image: { type: Types.File, storage: myStorage},
  text: { type: String },
  buttonlink: { type: String } ,
  buttontext: { type: String },
});

AboutUsSlide.register();