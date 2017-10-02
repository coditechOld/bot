var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About Us Text Model
 * ===================
 */

var About = new keystone.List('About', {
    label: 'About',
});

About.add({
    aboutUsTitle: {type: String, default: 'Mission'},
    aboutUsText: {type: Types.Html, wysiwyg: true, height: 200},
    missionTitle: {type: String, default: 'Mission'},
    missionText: {type: Types.Html, wysiwyg: true, height: 200},
    visionTitle: {type: String, default: 'Vision'},
    visionText: {type: Types.Html, wysiwyg: true, height: 200},
});

About.register();