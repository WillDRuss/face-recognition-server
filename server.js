const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'empty',
		database : 'smartbrain'
	}
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send(database.users);
})


// Sign in port
app.post('/signin', (req, res) => { signin.signinHandle(req, res, db, bcrypt) })

// register port
app.post('/register', (req, res) => { register.registerHandle(req, res, db, bcrypt) })

// profile port
app.get('/profile/:id', (req, res) => { profile.profileHandleGet(req, res, db) })

// image port (to update number of entries)
app.put('/image', (req, res) => { image.imageHandle(req, res, db) })

// image Url port (for call to Clarifai API)
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, ()=> {
	console.log('app is running on port 3001');
})

/*

/ --> res = this is working
/signin --> POST = success/fail (post as we are sending a password)
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
