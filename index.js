var _ = require('lodash');
var loaderUtils = require('loader-utils');

function processOptions(source, options) {
  if (!_.isUndefined(options.search) && !_.isUndefined(options.replace)) {
    if (!_.isUndefined(options.flags) && !_.isRegExp(query.search)) {
      options.search = new RegExp(options.search, options.flags);
    }

    source = source.replace(options.search, options.replace);
  }

  return source;
}

module.exports = function (source, map) {
  this.cacheable();
  this.async();

  var options = loaderUtils.getOptions(this);

  if (_.isArray(options.multiple)) {
    options.multiple.forEach(function (suboptions) {
      source = processOptions(source, suboptions);
    });
  } else {
    source = processOptions(source, options);
  }

  this.callback(source, map);
};
