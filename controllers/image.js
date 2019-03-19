const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '05875cb24d8645e39bf4b2d7cccd69dc'
});

const handleApiCall = (req, res) => {
	app.models
  	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  	.then(data => {
  		res.json(data);
  	})
  	.catch(err => res.status(400).json('unable to work with API'))
}


const imageHandle = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	imageHandle,
	handleApiCall
}