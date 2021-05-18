// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"article.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Article = function Article(_title, _link, _publishDate) {
  _classCallCheck(this, Article);

  this.title = _title;
  this.link = _link;
  this.publishDate = _publishDate;
};

exports.Article = Article;
},{}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var article_1 = require("./article");

var GET_REQUEST = "GET";
var READY_STATE_OK = 4;
var RESPONSE_STATUS_OK = 200;
var ENTER_KEY_CODE = 13;
var ENDPOINT = "https://medium-fetcher.herokuapp.com/medium/";
var request = null;
var articles = [];
var userProfileDiv = document.getElementById('userProfile');
var articlesList = document.getElementById('articles');
var spinner = document.getElementById('spinner');
var username = document.getElementById('username');
var errorHeader = document.getElementById('errorMessage');
username.addEventListener("keyup", function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault();
    fetchMediumRSSFeed();
  }
});

function fetchArticles() {
  request = new XMLHttpRequest();
  var url = ENDPOINT + username.value;
  request.open(GET_REQUEST, url);
  request.setRequestHeader("Content-Type", "application/json");

  try {
    request.send(null);
  } catch (exception) {
    console.error(exception);
  }

  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (this.readyState === READY_STATE_OK && this.status === RESPONSE_STATUS_OK) {
        var text = JSON.parse(this.responseText);
        resolve(text);
      } else if (this.status !== RESPONSE_STATUS_OK) {
        var errorMsg = this.statusText ? this.statusText : "Error in response";
        reject(errorMsg);
      }
    };
  });
}

function fetchMediumRSSFeed() {
  if (username.value.length === 0) {
    return;
  }

  resetContent();
  fetchArticles().then(function (response) {
    var userData = getUserDataFromResponse(response.message);
    getArticlesFromResponse(response.message.items);
    populateUserData(userData);
    populateArticles();
    spinner.style.display = 'none';
  }).catch(function (errorMessage) {
    spinner.style.display = 'none';
    errorHeader.innerHTML = errorMessage.message ? errorMessage.message : "An error has occurred.";
    errorHeader.style.display = 'inline-block';
  });
}

function resetContent() {
  errorHeader.style.display = 'none';
  spinner.style.display = 'inline-block';
  userProfileDiv.innerHTML = '';
  articlesList.innerHTML = '';
  articles = [];
}

function getUserDataFromResponse(response) {
  return {
    profileLink: response.url,
    profileImg: response.image
  };
}

function getArticlesFromResponse(mediumArticles) {
  for (var index = 0; index < mediumArticles.length; index++) {
    var mediumArticle = mediumArticles[index]; //If an item does not have a category attribute it is not an article

    if (!mediumArticle.hasOwnProperty('category')) {
      continue;
    }

    var article = new article_1.Article(mediumArticle.title, mediumArticle.url, convertPublishTimeToDate(mediumArticle.published));
    articles.push(article);
  }
}

function convertPublishTimeToDate(publishTimeInUnix) {
  var date = new Date(Number(publishTimeInUnix) * 1000);
  return date.getTime().toString();
}

function extractImageUrl(text) {
  var srcIndex = text.indexOf("src");
  var widthIndex = text.indexOf("width");
  var imageSoruce = text.substring(srcIndex + 5, widthIndex - 2);
  return imageSoruce;
}

function populateUserData(userData) {
  var anchorElement = document.createElement('a');
  var userAvatar = document.createElement('img');
  var userName = document.createElement('h2');
  userName.innerHTML = username.value;
  userName.setAttribute('id', 'username');
  userAvatar.setAttribute('src', userData.profileImg);
  userAvatar.setAttribute('id', 'userAvatar');
  userAvatar.style.width = '200px';
  userAvatar.style.height = '200px';
  anchorElement.href = userData.profileLink;
  anchorElement.setAttribute('target', '_blank');
  anchorElement.appendChild(userAvatar);
  userProfileDiv.appendChild(userName);
  userProfileDiv.appendChild(anchorElement);
}

function populateArticles() {
  for (var index = 0; index < articles.length; index++) {
    var liElem = document.createElement('li');
    var anchorElem = document.createElement('a');
    var article = articles[index];
    anchorElem.href = article.link;
    anchorElem.title = article.title;
    anchorElem.setAttribute('target', '_blank');
    anchorElem.innerHTML = article.title;
    liElem.appendChild(anchorElem);
    articlesList.appendChild(liElem);
  }
}
},{"./article":"article.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53166" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map