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


HomepageVideo.add({
    link: { type: String, required: true },
});

HomepageVideo.register();