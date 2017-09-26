var keystone = require('keystone');
var Types = keystone.Field.Types

/**
 * Service Model
 * =============
 */

var Service = new keystone.List('Service', {
	map: { name: 'title' },
});

Service.add({
    title: { type: String, required: true },
    description: { type: String},
    categories: { type: Types.Relationship, ref: 'ServiceCategory' },
});

Service.register();