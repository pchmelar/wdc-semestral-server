// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
	title: String,
	content: String,
	location: String,
	date: Date
});

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('post', postSchema, 'post');

// make this available to our users in our Node applications
module.exports = Post;