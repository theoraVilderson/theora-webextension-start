/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/backgroundServices/hot-reload-client.ts":
      /*!*****************************************************!*\
  !*** ./src/backgroundServices/hot-reload-client.ts ***!
  \*****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ closeHotReload: () =>
            /* binding */ closeHotReload,
          /* harmony export */ startHotReload: () =>
            /* binding */ startHotReload,
          /* harmony export */
        });
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"
          );
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__
          );

        var websocket;

        function createWebSocketConnection() {
          if ("WebSocket" in globalThis) {
            connect("ws://localhost:4293");
          }
        } //Make a websocket connection with the server.

        function connect(host) {
          if (websocket === undefined) {
            websocket = new WebSocket(host);
          }

          websocket.onmessage = function (event) {
            var data;

            try {
              data = JSON.parse(event.data);
            } catch (e) {
              return;
            }

            if (!data) return;
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default()
              .tabs.query({})
              .then(function (tabs) {
                if (!(tabs && tabs.length)) return;
                var allTabs = tabs.filter(function (tab) {
                  return (
                    tab.url &&
                    tab.url.includes(
                      "".concat(
                        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default()
                          .runtime.id
                      )
                    )
                  );
                });
                allTabs.forEach(function (tab) {
                  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.reload(
                    tab.id
                  );
                });
                closeWebSocketConnection();
                console.log("tabs got updated");
              })
              ["finally"](function () {
                var _data, _data2;

                console.log("background script got updated");
                if (
                  typeof ((_data = data) === null || _data === void 0
                    ? void 0
                    : _data.data.file.scop) === "string" &&
                  ((_data2 = data) === null || _data2 === void 0
                    ? void 0
                    : _data2.data.file.scop) === "background"
                )
                  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.reload();
              });
          }; //If the websocket is closed but the session is still active, create new connection again

          websocket.onclose = function () {
            closeWebSocketConnection();
          };
        } //Close the websocket connection

        function closeWebSocketConnection() {
          if (websocket != null || websocket != undefined) {
            websocket.close();
            websocket = undefined;
          }
        }

        var startHotReload = createWebSocketConnection;
        var closeHotReload = closeWebSocketConnection;

        /***/
      },

    /***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
      /***/ function (module, exports) {
        var __WEBPACK_AMD_DEFINE_FACTORY__,
          __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__;
        (function (global, factory) {
          if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = [module]),
            (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
            (__WEBPACK_AMD_DEFINE_RESULT__ =
              typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                    exports,
                    __WEBPACK_AMD_DEFINE_ARRAY__
                  )
                : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
            var mod;
          }
        })(
          typeof globalThis !== "undefined"
            ? globalThis
            : typeof self !== "undefined"
            ? self
            : this,
          function (module) {
            /* webextension-polyfill - v0.10.0 - Fri Aug 12 2022 19:42:44 */

            /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

            /* vim: set sts=2 sw=2 et tw=80: */

            /* This Source Code Form is subject to the terms of the Mozilla Public
             * License, v. 2.0. If a copy of the MPL was not distributed with this
             * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
            "use strict";

            if (!globalThis.chrome?.runtime?.id) {
              throw new Error(
                "This script should only be loaded in a browser extension."
              );
            }

            if (
              typeof globalThis.browser === "undefined" ||
              Object.getPrototypeOf(globalThis.browser) !== Object.prototype
            ) {
              const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE =
                "The message port closed before a response was received."; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
              // optimization for Firefox. Since Spidermonkey does not fully parse the
              // contents of a function until the first time it's called, and since it will
              // never actually need to be called, this allows the polyfill to be included
              // in Firefox nearly for free.

              const wrapAPIs = (extensionAPIs) => {
                // NOTE: apiMetadata is associated to the content of the api-metadata.json file
                // at build time by replacing the following "include" with the content of the
                // JSON file.
                const apiMetadata = {
                  alarms: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    clearAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  bookmarks: {
                    create: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getChildren: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getRecent: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getSubTree: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTree: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    move: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeTree: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  browserAction: {
                    disable: {
                      minArgs: 0,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    enable: {
                      minArgs: 0,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    getBadgeBackgroundColor: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getBadgeText: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    openPopup: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    setBadgeBackgroundColor: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setBadgeText: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setIcon: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    setPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  browsingData: {
                    remove: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    removeCache: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeCookies: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeDownloads: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeFormData: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeHistory: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeLocalStorage: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removePasswords: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removePluginData: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    settings: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  commands: {
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  contextMenus: {
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  cookies: {
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAllCookieStores: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  devtools: {
                    inspectedWindow: {
                      eval: {
                        minArgs: 1,
                        maxArgs: 2,
                        singleCallbackArg: false,
                      },
                    },
                    panels: {
                      create: {
                        minArgs: 3,
                        maxArgs: 3,
                        singleCallbackArg: true,
                      },
                      elements: {
                        createSidebarPane: {
                          minArgs: 1,
                          maxArgs: 1,
                        },
                      },
                    },
                  },
                  downloads: {
                    cancel: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    download: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    erase: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getFileIcon: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    open: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    pause: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeFile: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    resume: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    show: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  extension: {
                    isAllowedFileSchemeAccess: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    isAllowedIncognitoAccess: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  history: {
                    addUrl: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    deleteAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    deleteRange: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    deleteUrl: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getVisits: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  i18n: {
                    detectLanguage: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAcceptLanguages: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  identity: {
                    launchWebAuthFlow: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  idle: {
                    queryState: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  management: {
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getSelf: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    setEnabled: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    uninstallSelf: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                  },
                  notifications: {
                    clear: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    create: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getPermissionLevel: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  pageAction: {
                    getPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    hide: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setIcon: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    setPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    show: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  permissions: {
                    contains: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    request: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  runtime: {
                    getBackgroundPage: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getPlatformInfo: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    openOptionsPage: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    requestUpdateCheck: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    sendMessage: {
                      minArgs: 1,
                      maxArgs: 3,
                    },
                    sendNativeMessage: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    setUninstallURL: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  sessions: {
                    getDevices: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getRecentlyClosed: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    restore: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                  },
                  storage: {
                    local: {
                      clear: {
                        minArgs: 0,
                        maxArgs: 0,
                      },
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      remove: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                      set: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                    },
                    managed: {
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                    },
                    sync: {
                      clear: {
                        minArgs: 0,
                        maxArgs: 0,
                      },
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      remove: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                      set: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                    },
                  },
                  tabs: {
                    captureVisibleTab: {
                      minArgs: 0,
                      maxArgs: 2,
                    },
                    create: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    detectLanguage: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    discard: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    duplicate: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    executeScript: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getCurrent: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getZoom: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getZoomSettings: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    goBack: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    goForward: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    highlight: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    insertCSS: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    move: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    query: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    reload: {
                      minArgs: 0,
                      maxArgs: 2,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeCSS: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    sendMessage: {
                      minArgs: 2,
                      maxArgs: 3,
                    },
                    setZoom: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    setZoomSettings: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    update: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                  },
                  topSites: {
                    get: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  webNavigation: {
                    getAllFrames: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getFrame: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  webRequest: {
                    handlerBehaviorChanged: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  windows: {
                    create: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getCurrent: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getLastFocused: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                };

                if (Object.keys(apiMetadata).length === 0) {
                  throw new Error(
                    "api-metadata.json has not been included in browser-polyfill"
                  );
                }
                /**
                 * A WeakMap subclass which creates and stores a value for any key which does
                 * not exist when accessed, but behaves exactly as an ordinary WeakMap
                 * otherwise.
                 *
                 * @param {function} createItem
                 *        A function which will be called in order to create the value for any
                 *        key which does not exist, the first time it is accessed. The
                 *        function receives, as its only argument, the key being created.
                 */

                class DefaultWeakMap extends WeakMap {
                  constructor(createItem, items = undefined) {
                    super(items);
                    this.createItem = createItem;
                  }

                  get(key) {
                    if (!this.has(key)) {
                      this.set(key, this.createItem(key));
                    }

                    return super.get(key);
                  }
                }
                /**
                 * Returns true if the given object is an object with a `then` method, and can
                 * therefore be assumed to behave as a Promise.
                 *
                 * @param {*} value The value to test.
                 * @returns {boolean} True if the value is thenable.
                 */

                const isThenable = (value) => {
                  return (
                    value &&
                    typeof value === "object" &&
                    typeof value.then === "function"
                  );
                };
                /**
                 * Creates and returns a function which, when called, will resolve or reject
                 * the given promise based on how it is called:
                 *
                 * - If, when called, `chrome.runtime.lastError` contains a non-null object,
                 *   the promise is rejected with that value.
                 * - If the function is called with exactly one argument, the promise is
                 *   resolved to that value.
                 * - Otherwise, the promise is resolved to an array containing all of the
                 *   function's arguments.
                 *
                 * @param {object} promise
                 *        An object containing the resolution and rejection functions of a
                 *        promise.
                 * @param {function} promise.resolve
                 *        The promise's resolution function.
                 * @param {function} promise.reject
                 *        The promise's rejection function.
                 * @param {object} metadata
                 *        Metadata about the wrapped method which has created the callback.
                 * @param {boolean} metadata.singleCallbackArg
                 *        Whether or not the promise is resolved with only the first
                 *        argument of the callback, alternatively an array of all the
                 *        callback arguments is resolved. By default, if the callback
                 *        function is invoked with only a single argument, that will be
                 *        resolved to the promise, while all arguments will be resolved as
                 *        an array if multiple are given.
                 *
                 * @returns {function}
                 *        The generated callback function.
                 */

                const makeCallback = (promise, metadata) => {
                  return (...callbackArgs) => {
                    if (extensionAPIs.runtime.lastError) {
                      promise.reject(
                        new Error(extensionAPIs.runtime.lastError.message)
                      );
                    } else if (
                      metadata.singleCallbackArg ||
                      (callbackArgs.length <= 1 &&
                        metadata.singleCallbackArg !== false)
                    ) {
                      promise.resolve(callbackArgs[0]);
                    } else {
                      promise.resolve(callbackArgs);
                    }
                  };
                };

                const pluralizeArguments = (numArgs) =>
                  numArgs == 1 ? "argument" : "arguments";
                /**
                 * Creates a wrapper function for a method with the given name and metadata.
                 *
                 * @param {string} name
                 *        The name of the method which is being wrapped.
                 * @param {object} metadata
                 *        Metadata about the method being wrapped.
                 * @param {integer} metadata.minArgs
                 *        The minimum number of arguments which must be passed to the
                 *        function. If called with fewer than this number of arguments, the
                 *        wrapper will raise an exception.
                 * @param {integer} metadata.maxArgs
                 *        The maximum number of arguments which may be passed to the
                 *        function. If called with more than this number of arguments, the
                 *        wrapper will raise an exception.
                 * @param {boolean} metadata.singleCallbackArg
                 *        Whether or not the promise is resolved with only the first
                 *        argument of the callback, alternatively an array of all the
                 *        callback arguments is resolved. By default, if the callback
                 *        function is invoked with only a single argument, that will be
                 *        resolved to the promise, while all arguments will be resolved as
                 *        an array if multiple are given.
                 *
                 * @returns {function(object, ...*)}
                 *       The generated wrapper function.
                 */

                const wrapAsyncFunction = (name, metadata) => {
                  return function asyncFunctionWrapper(target, ...args) {
                    if (args.length < metadata.minArgs) {
                      throw new Error(
                        `Expected at least ${
                          metadata.minArgs
                        } ${pluralizeArguments(
                          metadata.minArgs
                        )} for ${name}(), got ${args.length}`
                      );
                    }

                    if (args.length > metadata.maxArgs) {
                      throw new Error(
                        `Expected at most ${
                          metadata.maxArgs
                        } ${pluralizeArguments(
                          metadata.maxArgs
                        )} for ${name}(), got ${args.length}`
                      );
                    }

                    return new Promise((resolve, reject) => {
                      if (metadata.fallbackToNoCallback) {
                        // This API method has currently no callback on Chrome, but it return a promise on Firefox,
                        // and so the polyfill will try to call it with a callback first, and it will fallback
                        // to not passing the callback if the first call fails.
                        try {
                          target[name](
                            ...args,
                            makeCallback(
                              {
                                resolve,
                                reject,
                              },
                              metadata
                            )
                          );
                        } catch (cbError) {
                          console.warn(
                            `${name} API method doesn't seem to support the callback parameter, ` +
                              "falling back to call it without a callback: ",
                            cbError
                          );
                          target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                          // use the unsupported callback anymore.

                          metadata.fallbackToNoCallback = false;
                          metadata.noCallback = true;
                          resolve();
                        }
                      } else if (metadata.noCallback) {
                        target[name](...args);
                        resolve();
                      } else {
                        target[name](
                          ...args,
                          makeCallback(
                            {
                              resolve,
                              reject,
                            },
                            metadata
                          )
                        );
                      }
                    });
                  };
                };
                /**
                 * Wraps an existing method of the target object, so that calls to it are
                 * intercepted by the given wrapper function. The wrapper function receives,
                 * as its first argument, the original `target` object, followed by each of
                 * the arguments passed to the original method.
                 *
                 * @param {object} target
                 *        The original target object that the wrapped method belongs to.
                 * @param {function} method
                 *        The method being wrapped. This is used as the target of the Proxy
                 *        object which is created to wrap the method.
                 * @param {function} wrapper
                 *        The wrapper function which is called in place of a direct invocation
                 *        of the wrapped method.
                 *
                 * @returns {Proxy<function>}
                 *        A Proxy object for the given method, which invokes the given wrapper
                 *        method in its place.
                 */

                const wrapMethod = (target, method, wrapper) => {
                  return new Proxy(method, {
                    apply(targetMethod, thisObj, args) {
                      return wrapper.call(thisObj, target, ...args);
                    },
                  });
                };

                let hasOwnProperty = Function.call.bind(
                  Object.prototype.hasOwnProperty
                );
                /**
                 * Wraps an object in a Proxy which intercepts and wraps certain methods
                 * based on the given `wrappers` and `metadata` objects.
                 *
                 * @param {object} target
                 *        The target object to wrap.
                 *
                 * @param {object} [wrappers = {}]
                 *        An object tree containing wrapper functions for special cases. Any
                 *        function present in this object tree is called in place of the
                 *        method in the same location in the `target` object tree. These
                 *        wrapper methods are invoked as described in {@see wrapMethod}.
                 *
                 * @param {object} [metadata = {}]
                 *        An object tree containing metadata used to automatically generate
                 *        Promise-based wrapper functions for asynchronous. Any function in
                 *        the `target` object tree which has a corresponding metadata object
                 *        in the same location in the `metadata` tree is replaced with an
                 *        automatically-generated wrapper function, as described in
                 *        {@see wrapAsyncFunction}
                 *
                 * @returns {Proxy<object>}
                 */

                const wrapObject = (target, wrappers = {}, metadata = {}) => {
                  let cache = Object.create(null);
                  let handlers = {
                    has(proxyTarget, prop) {
                      return prop in target || prop in cache;
                    },

                    get(proxyTarget, prop, receiver) {
                      if (prop in cache) {
                        return cache[prop];
                      }

                      if (!(prop in target)) {
                        return undefined;
                      }

                      let value = target[prop];

                      if (typeof value === "function") {
                        // This is a method on the underlying object. Check if we need to do
                        // any wrapping.
                        if (typeof wrappers[prop] === "function") {
                          // We have a special-case wrapper for this method.
                          value = wrapMethod(
                            target,
                            target[prop],
                            wrappers[prop]
                          );
                        } else if (hasOwnProperty(metadata, prop)) {
                          // This is an async method that we have metadata for. Create a
                          // Promise wrapper for it.
                          let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                          value = wrapMethod(target, target[prop], wrapper);
                        } else {
                          // This is a method that we don't know or care about. Return the
                          // original method, bound to the underlying object.
                          value = value.bind(target);
                        }
                      } else if (
                        typeof value === "object" &&
                        value !== null &&
                        (hasOwnProperty(wrappers, prop) ||
                          hasOwnProperty(metadata, prop))
                      ) {
                        // This is an object that we need to do some wrapping for the children
                        // of. Create a sub-object wrapper for it with the appropriate child
                        // metadata.
                        value = wrapObject(
                          value,
                          wrappers[prop],
                          metadata[prop]
                        );
                      } else if (hasOwnProperty(metadata, "*")) {
                        // Wrap all properties in * namespace.
                        value = wrapObject(
                          value,
                          wrappers[prop],
                          metadata["*"]
                        );
                      } else {
                        // We don't need to do any wrapping for this property,
                        // so just forward all access to the underlying object.
                        Object.defineProperty(cache, prop, {
                          configurable: true,
                          enumerable: true,

                          get() {
                            return target[prop];
                          },

                          set(value) {
                            target[prop] = value;
                          },
                        });
                        return value;
                      }

                      cache[prop] = value;
                      return value;
                    },

                    set(proxyTarget, prop, value, receiver) {
                      if (prop in cache) {
                        cache[prop] = value;
                      } else {
                        target[prop] = value;
                      }

                      return true;
                    },

                    defineProperty(proxyTarget, prop, desc) {
                      return Reflect.defineProperty(cache, prop, desc);
                    },

                    deleteProperty(proxyTarget, prop) {
                      return Reflect.deleteProperty(cache, prop);
                    },
                  }; // Per contract of the Proxy API, the "get" proxy handler must return the
                  // original value of the target if that value is declared read-only and
                  // non-configurable. For this reason, we create an object with the
                  // prototype set to `target` instead of using `target` directly.
                  // Otherwise we cannot return a custom object for APIs that
                  // are declared read-only and non-configurable, such as `chrome.devtools`.
                  //
                  // The proxy handlers themselves will still use the original `target`
                  // instead of the `proxyTarget`, so that the methods and properties are
                  // dereferenced via the original targets.

                  let proxyTarget = Object.create(target);
                  return new Proxy(proxyTarget, handlers);
                };
                /**
                 * Creates a set of wrapper functions for an event object, which handles
                 * wrapping of listener functions that those messages are passed.
                 *
                 * A single wrapper is created for each listener function, and stored in a
                 * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
                 * retrieve the original wrapper, so that  attempts to remove a
                 * previously-added listener work as expected.
                 *
                 * @param {DefaultWeakMap<function, function>} wrapperMap
                 *        A DefaultWeakMap object which will create the appropriate wrapper
                 *        for a given listener function when one does not exist, and retrieve
                 *        an existing one when it does.
                 *
                 * @returns {object}
                 */

                const wrapEvent = (wrapperMap) => ({
                  addListener(target, listener, ...args) {
                    target.addListener(wrapperMap.get(listener), ...args);
                  },

                  hasListener(target, listener) {
                    return target.hasListener(wrapperMap.get(listener));
                  },

                  removeListener(target, listener) {
                    target.removeListener(wrapperMap.get(listener));
                  },
                });

                const onRequestFinishedWrappers = new DefaultWeakMap(
                  (listener) => {
                    if (typeof listener !== "function") {
                      return listener;
                    }
                    /**
                     * Wraps an onRequestFinished listener function so that it will return a
                     * `getContent()` property which returns a `Promise` rather than using a
                     * callback API.
                     *
                     * @param {object} req
                     *        The HAR entry object representing the network request.
                     */

                    return function onRequestFinished(req) {
                      const wrappedReq = wrapObject(
                        req,
                        {},
                        /* wrappers */
                        {
                          getContent: {
                            minArgs: 0,
                            maxArgs: 0,
                          },
                        }
                      );
                      listener(wrappedReq);
                    };
                  }
                );
                const onMessageWrappers = new DefaultWeakMap((listener) => {
                  if (typeof listener !== "function") {
                    return listener;
                  }
                  /**
                   * Wraps a message listener function so that it may send responses based on
                   * its return value, rather than by returning a sentinel value and calling a
                   * callback. If the listener function returns a Promise, the response is
                   * sent when the promise either resolves or rejects.
                   *
                   * @param {*} message
                   *        The message sent by the other end of the channel.
                   * @param {object} sender
                   *        Details about the sender of the message.
                   * @param {function(*)} sendResponse
                   *        A callback which, when called with an arbitrary argument, sends
                   *        that value as a response.
                   * @returns {boolean}
                   *        True if the wrapped listener returned a Promise, which will later
                   *        yield a response. False otherwise.
                   */

                  return function onMessage(message, sender, sendResponse) {
                    let didCallSendResponse = false;
                    let wrappedSendResponse;
                    let sendResponsePromise = new Promise((resolve) => {
                      wrappedSendResponse = function (response) {
                        didCallSendResponse = true;
                        resolve(response);
                      };
                    });
                    let result;

                    try {
                      result = listener(message, sender, wrappedSendResponse);
                    } catch (err) {
                      result = Promise.reject(err);
                    }

                    const isResultThenable =
                      result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
                    // wrappedSendResponse synchronously, we can exit earlier
                    // because there will be no response sent from this listener.

                    if (
                      result !== true &&
                      !isResultThenable &&
                      !didCallSendResponse
                    ) {
                      return false;
                    } // A small helper to send the message if the promise resolves
                    // and an error if the promise rejects (a wrapped sendMessage has
                    // to translate the message into a resolved promise or a rejected
                    // promise).

                    const sendPromisedResult = (promise) => {
                      promise
                        .then(
                          (msg) => {
                            // send the message value.
                            sendResponse(msg);
                          },
                          (error) => {
                            // Send a JSON representation of the error if the rejected value
                            // is an instance of error, or the object itself otherwise.
                            let message;

                            if (
                              error &&
                              (error instanceof Error ||
                                typeof error.message === "string")
                            ) {
                              message = error.message;
                            } else {
                              message = "An unexpected error occurred";
                            }

                            sendResponse({
                              __mozWebExtensionPolyfillReject__: true,
                              message,
                            });
                          }
                        )
                        .catch((err) => {
                          // Print an error on the console if unable to send the response.
                          console.error(
                            "Failed to send onMessage rejected reply",
                            err
                          );
                        });
                    }; // If the listener returned a Promise, send the resolved value as a
                    // result, otherwise wait the promise related to the wrappedSendResponse
                    // callback to resolve and send it as a response.

                    if (isResultThenable) {
                      sendPromisedResult(result);
                    } else {
                      sendPromisedResult(sendResponsePromise);
                    } // Let Chrome know that the listener is replying.

                    return true;
                  };
                });

                const wrappedSendMessageCallback = (
                  { reject, resolve },
                  reply
                ) => {
                  if (extensionAPIs.runtime.lastError) {
                    // Detect when none of the listeners replied to the sendMessage call and resolve
                    // the promise to undefined as in Firefox.
                    // See https://github.com/mozilla/webextension-polyfill/issues/130
                    if (
                      extensionAPIs.runtime.lastError.message ===
                      CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE
                    ) {
                      resolve();
                    } else {
                      reject(
                        new Error(extensionAPIs.runtime.lastError.message)
                      );
                    }
                  } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                    // Convert back the JSON representation of the error into
                    // an Error instance.
                    reject(new Error(reply.message));
                  } else {
                    resolve(reply);
                  }
                };

                const wrappedSendMessage = (
                  name,
                  metadata,
                  apiNamespaceObj,
                  ...args
                ) => {
                  if (args.length < metadata.minArgs) {
                    throw new Error(
                      `Expected at least ${
                        metadata.minArgs
                      } ${pluralizeArguments(
                        metadata.minArgs
                      )} for ${name}(), got ${args.length}`
                    );
                  }

                  if (args.length > metadata.maxArgs) {
                    throw new Error(
                      `Expected at most ${
                        metadata.maxArgs
                      } ${pluralizeArguments(
                        metadata.maxArgs
                      )} for ${name}(), got ${args.length}`
                    );
                  }

                  return new Promise((resolve, reject) => {
                    const wrappedCb = wrappedSendMessageCallback.bind(null, {
                      resolve,
                      reject,
                    });
                    args.push(wrappedCb);
                    apiNamespaceObj.sendMessage(...args);
                  });
                };

                const staticWrappers = {
                  devtools: {
                    network: {
                      onRequestFinished: wrapEvent(onRequestFinishedWrappers),
                    },
                  },
                  runtime: {
                    onMessage: wrapEvent(onMessageWrappers),
                    onMessageExternal: wrapEvent(onMessageWrappers),
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                      minArgs: 1,
                      maxArgs: 3,
                    }),
                  },
                  tabs: {
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                      minArgs: 2,
                      maxArgs: 3,
                    }),
                  },
                };
                const settingMetadata = {
                  clear: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                };
                apiMetadata.privacy = {
                  network: {
                    "*": settingMetadata,
                  },
                  services: {
                    "*": settingMetadata,
                  },
                  websites: {
                    "*": settingMetadata,
                  },
                };
                return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
              }; // The build process adds a UMD wrapper around this file, which makes the
              // `module` variable available.

              module.exports = wrapAPIs(chrome);
            } else {
              module.exports = globalThis.browser;
            }
          }
        );
        //# sourceMappingURL=browser-polyfill.js.map

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!**********************************************!*\
  !*** ./src/backgroundServices/controller.ts ***!
  \**********************************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _hot_reload_client__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./hot-reload-client */ "./src/backgroundServices/hot-reload-client.ts"
      );
    // start Hot Reload

    (0, _hot_reload_client__WEBPACK_IMPORTED_MODULE_0__.startHotReload)(); // your code here
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtB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Q0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7OztVQ3B2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Q0NKQTs7QUFDQUssa0VBQWMsSUFDZCxpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RoZW9yYS0xc2VjbWFpbC1icm93c2VyLWV4dGVudGlvbi8uL3NyYy9iYWNrZ3JvdW5kU2VydmljZXMvaG90LXJlbG9hZC1jbGllbnQudHMiLCJ3ZWJwYWNrOi8vdGhlb3JhLTFzZWNtYWlsLWJyb3dzZXItZXh0ZW50aW9uLy4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vdGhlb3JhLTFzZWNtYWlsLWJyb3dzZXItZXh0ZW50aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RoZW9yYS0xc2VjbWFpbC1icm93c2VyLWV4dGVudGlvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90aGVvcmEtMXNlY21haWwtYnJvd3Nlci1leHRlbnRpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RoZW9yYS0xc2VjbWFpbC1icm93c2VyLWV4dGVudGlvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RoZW9yYS0xc2VjbWFpbC1icm93c2VyLWV4dGVudGlvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RoZW9yYS0xc2VjbWFpbC1icm93c2VyLWV4dGVudGlvbi8uL3NyYy9iYWNrZ3JvdW5kU2VydmljZXMvY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnJvd3NlciBmcm9tIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI7XHJcblxyXG5sZXQgd2Vic29ja2V0OiBXZWJTb2NrZXQgfCB1bmRlZmluZWQ7XHJcbmZ1bmN0aW9uIGNyZWF0ZVdlYlNvY2tldENvbm5lY3Rpb24oKSB7XHJcbiAgaWYgKFwiV2ViU29ja2V0XCIgaW4gZ2xvYmFsVGhpcykge1xyXG4gICAgY29uc29sZS5sb2coXCJ3ZSBhcmUgaGVyZVwiKTtcclxuICAgIGNvbm5lY3QoXCJ3czovL2xvY2FsaG9zdDozMDEzXCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy9NYWtlIGEgd2Vic29ja2V0IGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyLlxyXG5mdW5jdGlvbiBjb25uZWN0KGhvc3Q6IHN0cmluZykge1xyXG4gIGlmICh3ZWJzb2NrZXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgd2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldChob3N0KTtcclxuICB9XHJcblxyXG4gIHdlYnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGxldCBkYXRhOiBudWxsIHwge1xyXG4gICAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBmaWxlOiB7XHJcbiAgICAgICAgICBzY29wOiBcImJhY2tncm91bmRcIiB8IFwiY29udGVudFNjcmlwdFwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgIGJyb3dzZXIudGFic1xyXG4gICAgICAucXVlcnkoe30pXHJcbiAgICAgIC50aGVuKCh0YWJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCEodGFicyAmJiB0YWJzLmxlbmd0aCkpIHJldHVybjtcclxuICAgICAgICBjb25zdCBhbGxUYWJzID0gdGFicy5maWx0ZXIoXHJcbiAgICAgICAgICAodGFiKSA9PiB0YWIudXJsICYmIHRhYi51cmwuaW5jbHVkZXMoYCR7YnJvd3Nlci5ydW50aW1lLmlkfWApXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhbGxUYWJzLmZvckVhY2goKHRhYikgPT4ge1xyXG4gICAgICAgICAgYnJvd3Nlci50YWJzLnJlbG9hZCh0YWIuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsb3NlV2ViU29ja2V0Q29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInRhYnMgZ290IHVwZGF0ZWRcIik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJhY2tncm91bmQgc2NyaXB0IGdvdCB1cGRhdGVkXCIpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHR5cGVvZiBkYXRhPy5kYXRhLmZpbGUuc2NvcCA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICAgICAgZGF0YT8uZGF0YS5maWxlLnNjb3AgPT09IFwiYmFja2dyb3VuZFwiXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnJlbG9hZCgpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG5cclxuICAvL0lmIHRoZSB3ZWJzb2NrZXQgaXMgY2xvc2VkIGJ1dCB0aGUgc2Vzc2lvbiBpcyBzdGlsbCBhY3RpdmUsIGNyZWF0ZSBuZXcgY29ubmVjdGlvbiBhZ2FpblxyXG4gIHdlYnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2xvc2VXZWJTb2NrZXRDb25uZWN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuLy9DbG9zZSB0aGUgd2Vic29ja2V0IGNvbm5lY3Rpb25cclxuZnVuY3Rpb24gY2xvc2VXZWJTb2NrZXRDb25uZWN0aW9uKCkge1xyXG4gIGlmICh3ZWJzb2NrZXQgIT0gbnVsbCB8fCB3ZWJzb2NrZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICB3ZWJzb2NrZXQuY2xvc2UoKTtcclxuICAgIHdlYnNvY2tldCA9IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuY29uc3Qgc3RhcnRIb3RSZWxvYWQgPSBjcmVhdGVXZWJTb2NrZXRDb25uZWN0aW9uO1xyXG5jb25zdCBjbG9zZUhvdFJlbG9hZCA9IGNsb3NlV2ViU29ja2V0Q29ubmVjdGlvbjtcclxuXHJcbmV4cG9ydCB7IHN0YXJ0SG90UmVsb2FkLCBjbG9zZUhvdFJlbG9hZCB9O1xyXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIiwgW1wibW9kdWxlXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGZhY3RvcnkobW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kKTtcbiAgICBnbG9iYWwuYnJvd3NlciA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIC8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjEwLjAgLSBGcmkgQXVnIDEyIDIwMjIgMTk6NDI6NDQgKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKCFnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gIH1cblxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsVGhpcy5icm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9OyAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLmJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYnJvd3NlciBmcm9tIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI7XHJcbmltcG9ydCB7IHN0YXJ0SG90UmVsb2FkIH0gZnJvbSBcIi4vaG90LXJlbG9hZC1jbGllbnRcIjtcclxuLy8gc3RhcnQgSG90IFJlbG9hZFxyXG5zdGFydEhvdFJlbG9hZCgpO1xyXG4vLyB5b3VyIGNvZGUgaGVyZVxyXG4iXSwibmFtZXMiOlsiYnJvd3NlciIsIndlYnNvY2tldCIsImNyZWF0ZVdlYlNvY2tldENvbm5lY3Rpb24iLCJnbG9iYWxUaGlzIiwiY29uc29sZSIsImxvZyIsImNvbm5lY3QiLCJob3N0IiwidW5kZWZpbmVkIiwiV2ViU29ja2V0Iiwib25tZXNzYWdlIiwiZXZlbnQiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiZSIsInRhYnMiLCJxdWVyeSIsInRoZW4iLCJsZW5ndGgiLCJhbGxUYWJzIiwiZmlsdGVyIiwidGFiIiwidXJsIiwiaW5jbHVkZXMiLCJydW50aW1lIiwiaWQiLCJmb3JFYWNoIiwicmVsb2FkIiwiY2xvc2VXZWJTb2NrZXRDb25uZWN0aW9uIiwiZmlsZSIsInNjb3AiLCJvbmNsb3NlIiwiY2xvc2UiLCJzdGFydEhvdFJlbG9hZCIsImNsb3NlSG90UmVsb2FkIl0sInNvdXJjZVJvb3QiOiIifQ==
