[![Build Status](https://travis-ci.org/twss/mapquest-api.png)](https://travis-ci.org/twss/mapquest-api)
mapquest-api
============
Provides access to the various Open MapQuest Web Services and APIs.

## Installation via npm
    $ npm install mapquest-api

## API
To make use of the Open MapQuest APIs, you will need to an API key. Which can
be obtained by signing up for an account at http://developer.mapquest.com.

You can then specify the key, using one of the following methods:

* Set the environment variable `MAPQUEST_API_KEY`; or
* Pass as the `key` property in any `options`.

### Usage

Get straight to work:

    var mq = require('mapquest-api');

## Geocoding Web Service | <small>[API Documentation](http://open.mapquestapi.com/geocoding/)</small>

If you only want to use this part, you can:

    var geocoder = require('mapquest-api').geocoder;

### .geocode(options, callback)

Pass a location in, as either a string, or a more structured, object via the options object. Pass
`all: true` in the options object to receive an array of all the locations retrieved.

    //  String Search
    geocoder.geocode({location: '1 Infinite Loop, Cupertino, CA'}, function(err, location) {
        console.log(location);
    });
    
    //  Object Search
    geocoder.geocode({location: {street: "1 Infinite Loop", city: "Cupertino", postalCode: "95014"}}, function(err, location) {
        console.log(location);
    });
