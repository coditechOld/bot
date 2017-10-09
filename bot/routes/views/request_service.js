var keystone = require('keystone');
var RequestService = keystone.list('RequestService');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'request-service';
	locals.interestedTypes = RequestService.fields.interested.ops;
	locals.contactBudgetTypes = RequestService.fields.budget.ops;
	locals.formData = req.body || {};

	locals.data = {
		posts: [],
	};

	// Render the view
	view.render('request_services');
};
