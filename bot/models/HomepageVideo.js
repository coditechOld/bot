var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Video Model
 * ===========
 */

var HomepageVideo = new keystone.List('HomepageVideo',{
    map: { name: 'link' },
    label:'Homepage Video'
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/homepagevideobackground'), // required; path where the files should be stored
  		publicPath: '/images/homepagevideobackground/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},
});


HomepageVideo.add({
    link: { type: String, required: true },
    backgroundImage: { type: Types.File, storage: myStorage},
});

HomepageVideo.register();