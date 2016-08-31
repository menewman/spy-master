SpyMaster = (function() {
  var defaultTag = 'SpyMaster';

  // obj          - an object / class instance to spy on
  // tag          - an optional tag to use when logging to the console
  // keysToIgnore - an object containing keys to ignore, like { foo: true, bar: true }
  function spyOnOwn(obj, tag, keysToIgnore) {
    tag = tag || defaultTag;
    keysToIgnore = keysToIgnore || {};
    var prefix = tag + ': ';

    (Object.keys(obj) || [])
      .filter(function(key) {
        return !keysToIgnore[key] && typeof obj[key] === 'function';
      })
      .forEach(function(key) {
        var originalFunc = obj[key];
        obj[key] = function() {
          var args = Array.prototype.slice.call(arguments);

          console.group(prefix + key + " / " + args.length + " arguments");
          if (args.length) {
            console.dir(args);
          }
          console.groupEnd();
          return originalFunc.apply(this, args);
        };
      });
  }

  function spyOnPrototype(obj, tag, keysToIgnore) {
    var proto = Object.getPrototypeOf(obj);
    spyOnOwn(proto, tag, keysToIgnore);
  }

  function infiltrate(obj, tag, keysToIgnore) {
    spyOnOwn(obj, tag, keysToIgnore);
    spyOnPrototype(obj, tag, keysToIgnore);
  }

  return {
    infiltrate: infiltrate
  };
})();
