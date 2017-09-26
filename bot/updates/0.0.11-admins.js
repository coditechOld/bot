


const slidersData = [
    {
        title: "Slide 1"
        , image: './'
        , text: 'hello world Slide 1'
        , buttonlink: 'http://keystonejs.com/docs/configuration/'
        , buttontext: 'Keystone Docs'

    }
];
var keystone = require('keystone'),
    User = keystone.list('User'),
    Sliders = keystone.list('HomepageSlide');

const CreateSlider = function ({title,image  }) {
    // new Sliders.model({
    //
    // }).save(done);
    console.log('title ==>', title)

}


exports = module.exports = function (done) {
    console.log('title ==>', '22')

    slidersData.map(CreateSlider)
}