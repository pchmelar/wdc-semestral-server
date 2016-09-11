'use strict'

// grab the things we need
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let blogSchema = new Schema({
	blogid: { type: String, index: true },
	email: String,
	pass: String,
	title: String,
	about: String
});

// the schema is useless so far
// we need to create a model using it
let Blog = mongoose.model('blog', blogSchema, 'blog');

// make this available to our users in our Node applications
module.exports = Blog;