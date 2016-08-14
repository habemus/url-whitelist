// third-party
const UrlPattern = require('url-pattern');

const URL_PATTERN_OPTIONS = {
  /**
   * Use $ as the named char to make it easier to write
   * patterns
   * @type {String}
   */
  segmentNameStartChar: '$',
};

/**
 * Function that creates a url whitelist verifier function.
 * @param  {Array|String} whitelist
 * @return {Function}
 */
module.exports = function (whitelist) {

  if (!whitelist) {
    throw new Error('whitelist is required');
  }

  whitelist = (typeof whitelist === 'string') ?
    whitelist.split(',') : whitelist;

  var whitelistPatterns = whitelist.map((patternStr) => {
    return new UrlPattern(patternStr, URL_PATTERN_OPTIONS);
  });

  /**
   * Returns a function that receives the origin and verifies if
   * it is whitelisted
   * 
   * @param  {String}  origin
   * @return {Boolean}
   */
  return function isOriginWhitelisted(origin) {
    return whitelistPatterns.some((pattern) => {
      return pattern.match(origin) ? true : false;
    });
  };
};
