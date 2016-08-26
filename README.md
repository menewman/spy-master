# SpyMaster
This is a simple utility to wrap each function on an object and log when that function is called.

To use this function, simply call `SpyMaster.infiltrate`:

```javascript
SpyMaster.infiltrate(obj, tag);
```

Use the `infiltrate` method to wrap each function of an instance and its immediate prototype. (Note that this won't work well if you're using inheritance and need to spy on methods more than one layer deep in the prototype chain.) Pass the object to be infiltrated as the first parameter, and optionally pass a tag that will used as a prefix when logging function calls to the console.
