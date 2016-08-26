SpyMaster = (function() {
  var defaultTag = 'SpyMaster';

  var spyOnOwn = function(obj, tag) {
    tag = tag || defaultTag;
    var prefix = tag + ': ';

    (Object.keys(obj) || [])
      .filter(function(key) { return typeof obj[key] === 'function'; })
      .forEach(function(key) {
        var originalFunc = obj[key];
        obj[key] = function() {
          console.log(prefix + key);
          return originalFunc.apply(this, arguments);
        };
      });
  };

  var spyOnPrototype = function(obj, tag) {
    var proto = Object.getPrototypeOf(obj);
    spyOnOwn(proto, tag);
  };

  var infiltrate = function(obj, tag) {
    spyOnOwn(obj, tag);
    spyOnPrototype(obj, tag);
  };

  return {
    infiltrate: infiltrate
  };
})();
