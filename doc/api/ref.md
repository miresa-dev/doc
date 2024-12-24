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

### POST `/login`

Log in.

#### Payload

* `id`: The ID of the account to log in to.
* `pw`: The password of the account to log in to.

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

### GET `/u`

Get all users.

### GET `/u/{id}`

Get a user by their ID.

### GET `/u/{name}?getId=true`

Returns the ID for a username.

### PATCH `/u/{id}`

Updates the given user.

## Items

Items are any posts or comments. You can tell them apart by checking the
`parent` field. For posts, it will be empty, but comments will have the ID of
the item they were replying to.

### POST `/i`

Create a new item.

### GET `/i/{id}`

Get an item by ID.

### PATCH `/i/{id}`

Update an item by ID. This can only be done by its creator.

### DELETE `/i/{id}`

Delete an item by ID. This can only be done by its creator or an instance
administrator.

### GET `/i?limit={limit}&offset={offset}&sort={sort}`

The `sort` parameter should be one of:

* `topall`: Top voted items of all time
* `recent`: The most recent posts

The `limit` parameter must be higher than 0 but lower than 128.

## Miscellaneous

There are easter eggs hidden in the official server. See if you can find them!

### GET `/v`

Returns information about the server and the operating system running it.

#### Response

* `os`: The operating system on which the server is running
* `arch`: The arch (eg `x86-64`) on which the server is running
* `goroutines`: The number of goroutines currently running <!--/sched/goroutines:goroutines-->

The response is in valid JSON format.
