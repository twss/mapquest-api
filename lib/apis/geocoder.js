var get = require('superagent').get;

var api_url = 'http://open.mapquestapi.com/geocoding/v1';





var extractLocationsFromResult = function (options, callback) {
    var err = options.err,
        res = options.res,
        all = options.all,
        results;
    
    // console.log( options );
    
    if (err) {
        //  Something went wrong!
        callback(err);
    } else if (res.body.results[0].locations.length === 0 && res.body.info.statuscode !== 200) {
        //  The API returned an error.
        callback(new Error(res.body.results[0].locations[0]));
    } else {
        //  It was successful
        results = res.body.results[0].locations[0];
        
        if (all) {
            results = res.body.results.map(function (result) {
                return result.locations[0];
            });
        }
        
        callback(null, results);
    }
};




module.exports.geocode = function (options, callback) {
    var result = null,
        all = options.all,
        location = options.location,
        key = options.key,
        geocode = get(api_url + '/address');
    
    switch (typeof (location)) {
    case 'string':
        geocode.query({
            location: location
        });
        break;
    case 'object':
        geocode.query({
            json: JSON.stringify({location: location})
        });
        break;
    }
    
    if (process.env.MAPQUEST_API_KEY) {
        key = process.env.MAPQUEST_API_KEY;
    }

    if (key && key !== '') {
        geocode.end(function (err, res) {
            // console.log(res);
            var opts = { err: err, res: res, all: all };
            extractLocationsFromResult(opts, callback);
        });
    } else {
        callback(new Error('Missing API Key'));
    }
};
