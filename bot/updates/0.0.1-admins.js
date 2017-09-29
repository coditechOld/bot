/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
    User: [
        {'name.first': 'Admin', 'name.last': 'User', 'email': 'admin', 'password': 'Bot!@#123', 'isAdmin': true},
    ],
};

const slidersData = [
    {
        title: "Slide 1"
        , image: './'
        , text: 'hello world Slide 1'
        , buttonlink: 'http://keystonejs.com/docs/configuration/'
        , buttontext: 'Keystone Docs'

    }
];

incrementByOne = function (element) {
    return element + 1;
}

myArray = [1, 2, 3, 4];

myArray.map(incrementByOne);


var keystone = require('keystone'),
    User = keystone.list('User');

// const CreateSlider = function ({title,image  }) {
//     // new Sliders.model({
//     //
//     // }).save(done);
//     console.log('title ==>', title)
//
// }
//
//
// exports = module.exports = function (done) {
//     console.log('title ==>', '22')
//
//     slidersData.map(CreateSlider)
// }


/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin (admin, done) {

	var newAdmin = new User.model(admin);

	newAdmin.isAdmin = true;
	newAdmin.save(function (err) {
		if (err) {
			console.error('Error adding admin ' + admin.email + ' to the database:');
			console.error(err);
		} else {
			console.log('Added admin ' + admin.email + ' to the database.');
		}
		done(err);
	});

}

exports = module.exports = function (done) {
	async.forEach(admins, createAdmin, done);
};

*/
