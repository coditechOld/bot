var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Homepage Slider Model
 * =====================
 */

 var SliderHomepageImage = new keystone.List('HomepageSliderImage',{
	map: { name: 'image' }
 });

 var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/homepagesliderimages'), // required; path where the files should be stored
  		publicPath: '/images/homepagesliderimages/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

SliderHomepageImage.add({
  title: { type: String, default: Date.now},	
  image: { type: Types.File, storage: myStorage, required: true },
  text: { type: String },
  buttonlink: { type: String } ,
  buttontext: { type: String },
});


SliderHomepageImage.register();