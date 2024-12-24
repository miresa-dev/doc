---
outline: deep
---

# API Reference

This document fully outlines the Miresa API (apart from the easter eggs!).

## Versioning

The API is versioned. Currently, it is at `v0`.

The base URL for the API is `https://YOUR_INSTANCE/api/vVERSION`, where
`YOUR_INSTANCE` is the domain of the instance you're trying to connect to and
`VERSION` is the API version number.

## Authentication

### GET `/init`

Get the initial data required to log in.

#### Response

* `captcha`: A simple question for a human to solve
* `sid`: A session ID

### POST `/login`

Log in.

#### Payload

* `id`: The ID of the account to log in to.
* `password`: The password of the account to log in to.
* `sid`: The session ID you got from `/init`
* `captcha`: The solution to the captcha you got from `/init`

#### Response

The server may return...

* `200 OK` if the login was successful
* `400 Bad Request` if a field was missing
* `401 Unauthorized` if one or more of the fields was incorrect
* `500 Internal Server Error` if something went wrong with the server.

If everything goes well, the server will also return a session ID, as JSON
in the `sid` key. **You should authenticate all of your requests by setting
the `Authorization` header to this session ID.**

### POST `/logout`

Log out. Do not send any data, just your session ID as the `Authorization`
header. It will be dropped from the database and invalidated.

#### Response

The server may respond with...

* `204 No Content` if logout was successful
* `401 Unauthorized` if the session ID is invalid
* `500 Internal Server Error` if the server encountered an error.

## Users

### POST `/u`

Create a new user.

Before `POST`ing to `/u`, get the data from `/init`. See Authorization section
for information.

#### Payload

* `username`: The display name of the user
* `password`: The password for the new user (will be hashed before storing)
* `sid`: The session ID you got from `/init`
* `captcha`: The solution to the captcha you got from `/init`

#### Response

* `username`: The display name of the user
* `id`: The user's ID.
* `created`: The time the user was registered
* `about`: A short description of the user (empty until set by user)

The server may respond with...

* `201 Created` if the user creation was successful
* `400 Bad Request` if a field is missing
* `409 Conflict` if a user with that account name exists
* `500 Internal Server Error` if the server encountered an error.

### GET `/u/{id}`

Get a user by their ID.

#### Response

* `username`: The display name of the user
* `id`: The user's ID
* `created`: The time the user registered
* `about`: The user's biography
* `items`: A list of the IDs of the items the user has created

### GET `/u`

Get all users.

#### Response

The same as `/u/{id}`, except as a list.

### GET `/u/{name}?getId=true`

Returns the ID for a username.

#### Response

* `id`: The ID for the username

The server may response with, apart from `200` and `500`, `404 Not Found` if
the username does not exist.

### PATCH `/u/{id}`

Updates the given user.

## Items

Items are any posts or comments. You can tell them apart by checking the
`parent` field. For posts, it will be empty, but comments will have the ID of
the item they were replying to.

### POST `/i`

Create a new item.

#### Payload

* `title`: The title of the item (only applicable for posts)
* `content`: The content of the item
* `parent`: The ID of the parent item (only applicable for comments)

#### Response

The server may respond with...

* `201 Created` if the item was successfully made
* `400 Bad Request` if the `content` field is missing, or the `parent` **and**
  `title` fields are missing.
* `404 Not Found` if the parent ID is invalid (empty is not invalid)
* `500 Internal Server Error` if the server encountered an error.

### GET `/i/{id}`

Get an item by ID.

#### Response

* `creator`: The ID of the user who made the item
* `id`: The ID of the item
* `parent`: The ID of the parent of the item (only applicable for comments)
* `title`: The title of the item (only applicable for posts)
* `children`: A list of IDs of comments replying to the item.

### PATCH `/i/{id}`

Update an item by ID. This can only be done by its creator.

### DELETE `/i/{id}`

Delete an item by ID. This can only be done by its creator or an instance
administrator.

#### Response

The server may respond with...

* `204 No Content` if deletion was successful
* `404 Not Found` if the item is not found
* `500 Internal Server Error` if the server had an error.

### GET `/i?limit={limit}&offset={offset}&sort={sort}`

The `sort` parameter should be one of:

* `topall`: Top voted items of all time
* `recent`: The most recent posts

The `limit` parameter must be higher than 0 but lower than 128.

## Miscellaneous

There are easter eggs hidden in the official server. See if you can find them!

<small>Hint: check the code.</small>

### GET `/v`

Returns information about the server and the operating system running it.

#### Response

* `os`: The operating system on which the server is running
* `arch`: The arch (eg `x86-64`) on which the server is running
* `goroutines`: The number of goroutines currently running <!--/sched/goroutines:goroutines-->

The response is in valid JSON format.
