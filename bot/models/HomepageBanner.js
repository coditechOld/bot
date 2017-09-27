var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Homepage Banner Model
 * =====================
 */

var HomepageBanner = new keystone.List('HomepageBanner',{
    label:'Homepage Banner',
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/bannerimages'), // required; path where the files should be stored
  		publicPath: '/images/bannerimages/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

HomepageBanner.add({

    title: {type:String, default:'Get Started!'},
    text:{type:String},
    buttonlink:{type:String},
    buttontext:{type:String},
    backgroundimage:{type: Types.File, storage: myStorage }

});

HomepageBanner.register();