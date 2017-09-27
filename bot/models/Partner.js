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
		path: keystone.expandPath('./public/images/partnerlogos'), // required; path where the files should be stored
  		publicPath: '/images/partnerlogos/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},String
});

Partner.add({

    name: {type:String, required:true},
    image:{type: Types.File, storage: myStorage },
    typeOfWork:{type:String},
    url:{type:String},
    externalWebsite:{ type: Types.Boolean },
    text:{type: Types.Html, wysiwyg: true, height: 400},

});

Partner.register();