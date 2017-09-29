var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * How It Works Model
 * ==================
 */

var HomepageHowItWorks = new keystone.List('HomepageHowItWorks',{
    label:'How It Works'
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/howitworks'), // required; path where the files should be stored
  		publicPath: '/images/howitworks/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});

HomepageHowItWorks.add({
    title: { type: String, default:'How It Works?' },
    text: { type: Types.Html, wysiwyg: true, height: 150 },
    backgroundImage:{type: Types.File, storage: myStorage },    
});

HomepageHowItWorks.register();