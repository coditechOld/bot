var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Homepage Slider Model
 * =====================
 */

 var HomepageSlide = new keystone.List('HomepageSlide',{
	map: { name: 'title' },
 });

 var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/homepageslides'), // required; path where the files should be stored
  		publicPath: '/images/homepageslides/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

HomepageSlide.add({
  title: { type: String},	
  image: { type: Types.File, storage: myStorage},
  text: { type: String },
  buttonlink: { type: String } ,
  buttontext: { type: String },
});

HomepageSlide.register();