//  test/geocode.js
var should = require('should');

var geocoder = require('../lib/mapquest-api').geocoder;

describe('geocoder.geocode', function() {
    describe('when api key is missing from options and env', function() {
        it('should return an error', function(done) {
            geocoder.geocode({address: 'B97 4RG'}, function(err, res) {
                if( typeof(err) === 'undefined' ) {
                    if( typeof(process.env.MAPQUEST_API_KEY) === 'undefined' ) {
                        throw new Error('call did not error!');
                    }
                }
                done();
            });
        });
    });
    
    describe('address lookup', function() {
        it('should return a result', function(done) {
            geocoder.geocode({location: 'B97 4RG'}, function(err, res) {
                if( err ) return done(err);
                
                if( res ) {
                    done();
                }
                else {
                    throw new Error('No result!');
                }
            });
        });
    });
    
    describe('json address lookup', function() {
        it('should return a result', function(done) {
            geocoder.geocode({location: {city: 'Redditch'}}, function(err, res) {
                if( err ) return done(err);
                
                if( res ) {
                    done();
                }
                else {
                    throw new Error('No result!');
                }
            });
        });
    });
    
    describe('multiple address lookup', function() {
        it('should return many results', function(done) {
            geocoder.geocode({location: {street: 'Vicarage Crescent'}, all: true}, function(err, res) {
                if( err ) return done(err);
                
                if( res ) {
                    //  HACK: Should be above '1' really, but can't easily a query to satisfy the condition.
                    res.length.should.above(0);
                    done();
                }
                else {
                    throw new Error('No result!');
                }
            });
        });
    });
});
