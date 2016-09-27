SpyMaster = (function() {
  var defaultTag = 'SpyMaster';

  // obj          - an object / class instance to spy on
  // tag          - an optional tag to use when logging to the console
  // keysToIgnore - an object containing keys to ignore, like { foo: true, bar: true }
  // pauseOn      - an object containing functions we should pause on (via debugger)
  function spyOnOwn(obj, tag, keysToIgnore, pauseOn) {
    tag = tag || defaultTag;
    keysToIgnore = keysToIgnore || {};
    pauseOn = pauseOn || {};
    var prefix = tag + ': ';

    (Object.keys(obj) || [])
      .filter(function(key) {
        return !keysToIgnore[key] && typeof obj[key] === 'function';
      })
      .forEach(function(key) {
        var originalFunc = obj[key];
        var shouldPause = pauseOn[key];
        obj[key] = function() {
          var args = Array.prototype.slice.call(arguments);

          console.group(prefix + key + " / " + args.length + " arguments");
          if (args.length) {
            console.dir(args);
          }
          console.groupEnd();

          if (shouldPause) {
            debugger; // the consumer asked us to pause on this key
          }
          return originalFunc.apply(this, args);
        };
      });
  }

  function spyOnPrototype(obj, tag, keysToIgnore, pauseOn) {
    var proto = Object.getPrototypeOf(obj);
    spyOnOwn(proto, tag, keysToIgnore, pauseOn);
  }

  function infiltrate(obj, tag, keysToIgnore, pauseOn) {
    spyOnOwn(obj, tag, keysToIgnore, pauseOn);
    spyOnPrototype(obj, tag, keysToIgnore, pauseOn);
  }

  return {
    infiltrate: infiltrate
  };
})();
