var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * How It Works Model
 * ==================
 */

var HomepageHowItWorks = new keystone.List('HomepageHowItWorks',{
	label:'How It Works',
	map: { name: 'title' },
});


HomepageHowItWorks.add({
	icon: { type: String},
    title: { type: String},
    text: { type: Types.Html, wysiwyg: true, height: 150 },
});

HomepageHowItWorks.register();