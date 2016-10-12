'use strict'

// grab the things we need
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let postSchema = new Schema({
	title: String,
	content: String,
	location: {
		description: String,
		lat: Number, 
		lng: Number
	},
	blogid: String,
},
{
	timestamps: true
});

// the schema is useless so far
// we need to create a model using it
let Post = mongoose.model('post', postSchema, 'post');

// make this available to our users in our Node applications
module.exports = Post;