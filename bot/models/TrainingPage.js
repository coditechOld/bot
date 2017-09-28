var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Training page Model
 * ===================
 */

var TraningPage = new keystone.List('TraningPage',{
    label: 'Training Page',
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/images/trainingpage'), // required; path where the files should be stored
  		publicPath: '/images/trainingpage/', // path where files will be served
	},
	schema: {
		originalname: true,
		url: true,
		path: true,
	},String
});

TraningPage.add({

    image:{type:Types.File, storage:myStorage},
    imageTitle:{type:String},
    imageText:{type:String},
    ourModelTitle:{type:String,default:'Our Model'},
    curriculumTitle:{type:String, default:'Our Curriculum'},
    curriculum:{type:Types.TextArray},
    //work with us

});

TraningPage.register();