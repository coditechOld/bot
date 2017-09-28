var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Homepage Partner Model
 * =====================
 */

var Partner = new keystone.List('Partner',{
    map:{name: 'name'},
    autokey: { path: 'slug', from: 'name', unique: true },
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/partners'), // required; path where the files should be stored
  		publicPath: '/images/partners/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},String
});

Partner.add({

    name: {type:String, required:true},
	logo:{type: Types.File, storage: myStorage },
	image1:{type:Types.File, storage:myStorage},
	image2:{type:Types.File, storage:myStorage},
	image3:{type:Types.File, storage:myStorage},
	year:{type:Number},
    typeOfWork:{type:Types.TextArray},
	website:{type:String},
	externalWebsite:{ type: Types.Boolean },
	facebook:{type:String},
	twitter:{type:String},
    partnerDescription:{type: Types.Html, wysiwyg: true, height: 300},

});

Partner.register();