var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About Us Text Model
 * ===================
 */

var AboutUs = new keystone.List('AboutUs');

AboutUs.add({
   missionTitle:{type:String,default:'Mission'},
   missionText:{type: Types.Html, wysiwyg: true, height: 200},
   visionTitle:{type:String,default:'Vision'},
   visionText:{type: Types.Html, wysiwyg: true, height: 200},
});

AboutUs.register();