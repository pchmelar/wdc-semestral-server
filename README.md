# WDC API
Simple API for Web and Database Computing Project @ UNI Adelaide  
Live example on https://fierce-ridge-28571.herokuapp.com

## Resource: login

POST /login - log user into app  
Status codes: 200 - ok, 400 - bad request, 403 - wrong email or password

```json
{
	"email": String,
	"pass": String
}
```

## Resource: blog

GET /blog - get list of blogs  
Status codes: 200 - ok, 400 - bad request

```json
[
	{
		"blogid": String,
		"title": String,
		"about": String
	}
]
```

GET /blog/:blogid - get specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

```json
{
	"blogid": String,
	"title": String,
	"about": String
}
```

POST /blog - create blog  
Status codes: 201 - created, 400 - bad request, 409 - already exists

```json
{
	"blogid": String,
	"email": String,
	"pass": String,
	"title": String,
	"about": String
}
```

PUT /blog/:blogid - update specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

```json
{
	"title": String,
	"about": String
}
```

DELETE /blog/:blogid - delete specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

## Resource: post

GET /blog/:blogid/post - get list of posts of specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

```json
[
	{
		"title": String,
		"content": String,
		"location": {
			"description": String,
			"lat": Number,
			"lng": Number
		},
		"blogid": String
	}
]
```

GET /blog/:blogid/post/:postid - get specific post of specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

```json
{
	"title": String,
	"content": String,
	"location": {
		"description": String,
		"lat": Number,
		"lng": Number
	},
	"blogid": String
}
```

POST /blog/:blogid/post - create post for specific blog  
Status codes: 201 - created, 400 - bad request, 404 - not found

```json
{
	"title": String,
	"content": String,
	"location": {
		"description": String,
		"lat": Number,
		"lng": Number
	}
}
```

PUT /blog/:blogid/post/:postid - update specific post of specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found

```json
{
	"title": String,
	"content": String,
	"location": {
		"description": String,
		"lat": Number,
		"lng": Number
	}
}
```

DELETE /blog/:blogid/post/:postid - delete specific post of specific blog  
Status codes: 200 - ok, 400 - bad request, 404 - not found
