var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Testimonial Model
 * =================
 */


var Testimonial = new keystone.List('Testimonial',{
    map:{name: 'name'},
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/testimonials'), // required; path where the files should be stored
  		publicPath: '/images/testimonials/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},String
});

Testimonial.add({
    name:{type:String, required:true},
    jobPosition:{type:String},
    testimonial:{type:String},
    profileImage:{type: Types.File, storage: myStorage },
});

Testimonial.register();