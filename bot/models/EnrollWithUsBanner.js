const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Request Service Banner Model
 * ============================
 */

const EnrollWithUsBanner = new keystone.List('EnrollWithUsBanner', {
    map: {name: 'title'},
});

const myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/images/enrollwithusbanner'), // required; path where the files should be stored
        publicPath: '/images/enrollwithusbanner/', // path where files will be served
    },
    schema: {
        originalname: true,
        url: true,
        path: true,
    },
});

EnrollWithUsBanner.add({
    title: {type: String},
    image: {type: Types.File, storage: myStorage},
    text: {type: String},
});

EnrollWithUsBanner.register();