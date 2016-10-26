# WDC SERVER
Simple Node.js server and API for Web and Database Computing Project @ UNI Adelaide   
Using bcrypt for password hashing and JWT for user authentication   
Live demo on https://fierce-ridge-28571.herokuapp.com

## Resource /login

### POST /login - log user into app  

Request:
```json
{
	"email": String,
	"pass": String
}
```
Response:
```json
{
	"blogid": String,
	"email": String,
	"token": String
}
```

Status codes: 200 OK, 400 Bad Request, 403 Forbidden

## Resource /blog

### GET /blog - get list of blogs  

Response:
```json
[
	{
		"blogid": String,
		"title": String,
		"about": String
	}
]
```

Status codes: 200 OK, 400 Bad Request

### GET /blog/:blogid - get specific blog  

Response:
```json
{
	"blogid": String,
	"title": String,
	"about": String
}
```

Status codes: 200 OK, 400 Bad Request, 404 Not Found

### POST /blog - create blog  

Request:
```json
{
	"blogid": String,
	"email": String,
	"pass": String,
	"title": String,
	"about": String
}
```
Response:
```json
{
	"blogid": String,
	"email": String,
	"token": String
}
```

Status codes: 201 Created, 400 Bad Request, 409 Conflict

### PUT /blog/:blogid - update specific blog  

Request:
```json
{
	"title": String,
	"about": String
}
```

JWT token must be provided along with the request   
Status codes: 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found

### DELETE /blog/:blogid - delete specific blog  

JWT token must be provided along with the request   
Status codes: 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found

## Resource /post

### GET /blog/:blogid/post - get list of posts of specific blog  

Response:
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

Status codes: 200 OK, 400 Bad Request, 404 Not Found

### GET /blog/:blogid/post/:postid - get specific post of specific blog  

Response:
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

Status codes: 200 OK, 400 Bad Request, 404 Not Found

### POST /blog/:blogid/post - create post for specific blog  

Request:
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

JWT token must be provided along with the request   
Status codes: 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found

### PUT /blog/:blogid/post/:postid - update specific post of specific blog  

Request:
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

JWT token must be provided along with the request   
Status codes: 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found

### DELETE /blog/:blogid/post/:postid - delete specific post of specific blog  

JWT token must be provided along with the request   
Status codes: 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found
