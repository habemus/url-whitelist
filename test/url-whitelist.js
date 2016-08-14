const assert = require('assert');
const should = require('should');

const urlWhitelist = require('../lib');

describe('url-whitelist', function () {

  it('should return true for urls exactly defined in the whitelist', function () {

    const isWhitelisted = urlWhitelist([
      'http://localhost:4000',
      'http://some.domain.com',
    ]);

    isWhitelisted('http://localhost:4000').should.equal(true);
    isWhitelisted('http://some.domain.com').should.equal(true);
  });

  it('should return false for urls different from the whitelist', function () {

    const isWhitelisted = urlWhitelist([
      'http://localhost:4000',
      'http://some.domain.com',
    ]);

    isWhitelisted('http://localhost:3000').should.equal(false);
    isWhitelisted('http://some.other.domain.com').should.equal(false);
  });

  it('should return true for urls that match a pattern in the whitelist', function () {

    const isWhitelisted = urlWhitelist([
      'http://localhost:4000',
      'http://*.domain.com',
    ]);

    isWhitelisted('http://localhost:4000').should.equal(true);
    isWhitelisted('http://some.domain.com').should.equal(true);
    isWhitelisted('http://another.domain.com').should.equal(true);
    isWhitelisted('http://yet.another.domain.com').should.equal(true);
  });

  it('should accept a comma separated list of urls in the form of a string', function () {
    const isWhitelisted = urlWhitelist(
      'http://localhost:4000,https://*.domain.com,http://another.com'
    );

    isWhitelisted('http://localhost:4000').should.equal(true);
    isWhitelisted('https://some.domain.com').should.equal(true);
    isWhitelisted('https://another.domain.com').should.equal(true);
    isWhitelisted('https://yet.another.domain.com').should.equal(true);
    isWhitelisted('http://another.com').should.equal(true);

    isWhitelisted('http://yet.another.com').should.equal(false);
    isWhitelisted('http://localhost:3000').should.equal(false);
  });

});
