var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * How It Works Model
 * ==================
 */

var HomepageHowItWorks = new keystone.List('HomepageHowItWorks',{
    label:'How It Works'
});

HomepageHowItWorks.add({
    title: { type: String, default:'How It Works?' },
    text: { type: Types.Html, wysiwyg: true, height: 150 },
});

HomepageHowItWorks.register();