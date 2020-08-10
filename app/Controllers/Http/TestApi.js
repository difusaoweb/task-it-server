var request = require("request")

var options = {
	method: 'POST',
	url: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/:emailUser@gmail.com'
	qs: {
		hapikey: 'demo',
	},
	headers: {
		'Content-Type': 'application/json'
	},
	body:
	{
		properties: 
		[
			{property: 'firstname', value: 'Mateus'},
			{property: 'lastname', value: 'Aguiar'},
			{property: 'website', value: 'matdevs.com'},
			{property: 'company', value: 'MAT Devs'},
			{property: 'phone', value: '64992303788'},
			{property: 'address', value: 'rua 3 aguias'},
			{property: 'city', value: 'Caldas Novas'},
			{property: 'state', value: 'Go'},
			{property: 'zip', value: '75690000'}
		]
	},
	json: true
};

request(options, function (error, response, body)) {
	if (error) throw new Error(error);

	console.log(body)
}