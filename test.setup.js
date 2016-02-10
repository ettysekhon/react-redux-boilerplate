import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

// We need to take all the properties that the jsdom window object contains,
// such as navigator, and hoist them on to the Node.js global object.
// This is done so that properties provided by window
// can be used without the window. prefix, which is
// what would happen in a browser environment.
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

const sessionStorage = () => {
  const storage = {};

  return {
    getItem: (key) => {
      return storage[key];
    },
    setItem: (key, value) => {
      storage[key] = value;
    },
    clear: () => {
      for (const key in storage) {
        if ({}.hasOwnProperty.call(storage, key)) {
          delete storage[key];
        }
      }
    }
  };
};

global.sessionStorage = sessionStorage();
