"use strict";
(self["webpackChunkportal_crediall"] = self["webpackChunkportal_crediall"] || []).push([["src_app_modules_main_main_module_ts"],{

/***/ 206:
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_ID": () => (/* binding */ DEFAULT_ID),
/* harmony export */   "Loader": () => (/* binding */ Loader),
/* harmony export */   "LoaderStatus": () => (/* binding */ LoaderStatus)
/* harmony export */ });
// do not edit .js files directly - edit src/index.jst
var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  } // true if both NaN, false otherwise


  return a !== a && b !== b;
};
/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */

var LoaderStatus;

(function (LoaderStatus) {
  LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
  LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */


class Loader {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({
    apiKey,
    authReferrerPolicy,
    channel,
    client,
    id = DEFAULT_ID,
    language,
    libraries = [],
    mapIds,
    nonce,
    region,
    retries = 3,
    url = "https://maps.googleapis.com/maps/api/js",
    version
  }) {
    this.CALLBACK = "__googleMapsCallback";
    this.callbacks = [];
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.apiKey = apiKey;
    this.authReferrerPolicy = authReferrerPolicy;
    this.channel = channel;
    this.client = client;
    this.id = id || DEFAULT_ID; // Do not allow empty string

    this.language = language;
    this.libraries = libraries;
    this.mapIds = mapIds;
    this.nonce = nonce;
    this.region = region;
    this.retries = retries;
    this.url = url;
    this.version = version;

    if (Loader.instance) {
      if (!fastDeepEqual(this.options, Loader.instance.options)) {
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
      }

      return Loader.instance;
    }

    Loader.instance = this;
  }

  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }

  get status() {
    if (this.errors.length) {
      return LoaderStatus.FAILURE;
    }

    if (this.done) {
      return LoaderStatus.SUCCESS;
    }

    if (this.loading) {
      return LoaderStatus.LOADING;
    }

    return LoaderStatus.INITIALIZED;
  }

  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   */


  createUrl() {
    let url = this.url;
    url += `?callback=${this.CALLBACK}`;

    if (this.apiKey) {
      url += `&key=${this.apiKey}`;
    }

    if (this.channel) {
      url += `&channel=${this.channel}`;
    }

    if (this.client) {
      url += `&client=${this.client}`;
    }

    if (this.libraries.length > 0) {
      url += `&libraries=${this.libraries.join(",")}`;
    }

    if (this.language) {
      url += `&language=${this.language}`;
    }

    if (this.region) {
      url += `&region=${this.region}`;
    }

    if (this.version) {
      url += `&v=${this.version}`;
    }

    if (this.mapIds) {
      url += `&map_ids=${this.mapIds.join(",")}`;
    }

    if (this.authReferrerPolicy) {
      url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
    }

    return url;
  }

  deleteScript() {
    const script = document.getElementById(this.id);

    if (script) {
      script.remove();
    }
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   */


  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   */


  loadPromise() {
    return new Promise((resolve, reject) => {
      this.loadCallback(err => {
        if (!err) {
          resolve(window.google);
        } else {
          reject(err.error);
        }
      });
    });
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   */


  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  /**
   * Set the script on document.
   */


  setScript() {
    if (document.getElementById(this.id)) {
      // TODO wrap onerror callback for cases where the script was loaded elsewhere
      this.callback();
      return;
    }

    const url = this.createUrl();
    const script = document.createElement("script");
    script.id = this.id;
    script.type = "text/javascript";
    script.src = url;
    script.onerror = this.loadErrorCallback.bind(this);
    script.defer = true;
    script.async = true;

    if (this.nonce) {
      script.nonce = this.nonce;
    }

    document.head.appendChild(script);
  }
  /**
   * Reset the loader state.
   */


  reset() {
    this.deleteScript();
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.onerrorEvent = null;
  }

  resetIfRetryingFailed() {
    if (this.failed) {
      this.reset();
    }
  }

  loadErrorCallback(e) {
    this.errors.push(e);

    if (this.errors.length <= this.retries) {
      const delay = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.onerrorEvent = e;
      this.callback();
    }
  }

  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
  }

  callback() {
    this.done = true;
    this.loading = false;
    this.callbacks.forEach(cb => {
      cb(this.onerrorEvent);
    });
    this.callbacks = [];
  }

  execute() {
    this.resetIfRetryingFailed();

    if (this.done) {
      this.callback();
    } else {
      // short circuit and warn if google.maps is already loaded
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." + "This may result in undesirable behavior as options and script parameters may not match.");
        this.callback();
        return;
      }

      if (this.loading) ;else {
        this.loading = true;
        this.setCallback();
        this.setScript();
      }
    }
  }

}



/***/ }),

/***/ 2354:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/forkJoin.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forkJoin": () => (/* binding */ forkJoin)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ 4932);
/* harmony import */ var _util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/argsArgArrayOrObject */ 8206);
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./innerFrom */ 3957);
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ 2718);
/* harmony import */ var _operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/OperatorSubscriber */ 5308);
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ 424);
/* harmony import */ var _util_createObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/createObject */ 3095);







function forkJoin(...args) {
    const resultSelector = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(args);
    const { args: sources, keys } = (0,_util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__.argsArgArrayOrObject)(args);
    const result = new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable((subscriber) => {
        const { length } = sources;
        if (!length) {
            subscriber.complete();
            return;
        }
        const values = new Array(length);
        let remainingCompletions = length;
        let remainingEmissions = length;
        for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            let hasValue = false;
            (0,_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(sources[sourceIndex]).subscribe(new _operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__.OperatorSubscriber(subscriber, (value) => {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, () => remainingCompletions--, undefined, () => {
                if (!remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? (0,_util_createObject__WEBPACK_IMPORTED_MODULE_5__.createObject)(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        }
    });
    return resultSelector ? result.pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__.mapOneOrManyArgs)(resultSelector)) : result;
}


/***/ }),

/***/ 8863:
/*!**************************************************!*\
  !*** ./src/app/core/services/api/api.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiService": () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);

class ApiService {
    constructor() {
        this.base_url = 'https://api-test.homer.com.br';
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(); };
ApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 325:
/*!*****************************************************!*\
  !*** ./src/app/modules/main/main-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainRoutingModule": () => (/* binding */ MainRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/home/home.component */ 4459);
/* harmony import */ var _pages_search_property_search_property_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/search-property/search-property.component */ 5547);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const routes = [
    { path: '', component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent },
    { path: 'search-property/:property-parameters', component: _pages_search_property_search_property_component__WEBPACK_IMPORTED_MODULE_1__.SearchPropertyComponent }
];
class MainRoutingModule {
}
MainRoutingModule.ɵfac = function MainRoutingModule_Factory(t) { return new (t || MainRoutingModule)(); };
MainRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MainRoutingModule });
MainRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MainRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 7366:
/*!*********************************************!*\
  !*** ./src/app/modules/main/main.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainModule": () => (/* binding */ MainModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _main_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-routing.module */ 325);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/home/home.component */ 4459);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _pages_home_components_app_nav_bar_app_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home/components/app-nav-bar/app-nav-bar.component */ 9633);
/* harmony import */ var _pages_search_property_search_property_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/search-property/search-property.component */ 5547);
/* harmony import */ var _pages_search_property_components_search_result_search_result_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/search-property/components/search-result/search-result.component */ 7348);
/* harmony import */ var _shared_main_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/main.service */ 2998);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);









class MainModule {
}
MainModule.ɵfac = function MainModule_Factory(t) { return new (t || MainModule)(); };
MainModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: MainModule });
MainModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [_shared_main_service__WEBPACK_IMPORTED_MODULE_5__.MainService], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _main_routing_module__WEBPACK_IMPORTED_MODULE_0__.MainRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](MainModule, { declarations: [_pages_home_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent,
        _pages_home_components_app_nav_bar_app_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__.AppNavBarComponent,
        _pages_search_property_search_property_component__WEBPACK_IMPORTED_MODULE_3__.SearchPropertyComponent,
        _pages_search_property_components_search_result_search_result_component__WEBPACK_IMPORTED_MODULE_4__.SearchResultComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
        _main_routing_module__WEBPACK_IMPORTED_MODULE_0__.MainRoutingModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule] }); })();


/***/ }),

/***/ 9633:
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/main/pages/home/components/app-nav-bar/app-nav-bar.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppNavBarComponent": () => (/* binding */ AppNavBarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);

class AppNavBarComponent {
    constructor() { }
    ngOnInit() {
    }
}
AppNavBarComponent.ɵfac = function AppNavBarComponent_Factory(t) { return new (t || AppNavBarComponent)(); };
AppNavBarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppNavBarComponent, selectors: [["app-app-nav-bar"]], decls: 22, vars: 0, consts: [[1, "navbar", "navbar-expand-lg", "p-3"], [1, "container-fluid"], [1, "col-md-6"], ["href", "#", 1, "navbar-brand"], ["src", "../../../assets/img/logo_crediall_complete.png", "alt", "Creadiall", 2, "height", "20px", "width", "130px"], ["type", "button", "data-bs-toggle", "offcanvas", "data-bs-target", "#navbarOffcanvasLg", "aria-controls", "navbarOffcanvasLg", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["tabindex", "-1", "id", "navbarOffcanvasLg", "aria-labelledby", "navbarOffcanvasLgLabel", 1, "offcanvas", "offcanvas-end"], [1, "offcanvas-header", "p-4"], ["type", "button", "data-bs-dismiss", "offcanvas", "aria-label", "Close", 1, "btn-close", "btn-close-black"], [1, "offcanvas-body"], [1, "navbar-nav", "justify-content-evenly", "flex-grow-1", "pe-3"], [1, "nav-item"], ["href", "#", 1, "nav-link"]], template: function AppNavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Sal\u00E3o de Im\u00F3veis");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Encontre um Im\u00F3vel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Parceiros");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["a[_ngcontent-%COMP%] {\r\n  color: #012942;\r\n  font-weight: 500;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC1uYXYtYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6ImFwcC1uYXYtYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhIHtcclxuICBjb2xvcjogIzAxMjk0MjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 4459:
/*!***********************************************************!*\
  !*** ./src/app/modules/main/pages/home/home.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ 206);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ 1149);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _shared_main_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/main.service */ 2998);
/* harmony import */ var _components_app_nav_bar_app_nav_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app-nav-bar/app-nav-bar.component */ 9633);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);









function HomeComponent_option_106_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("value", col_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](col_r2.name);
} }
function HomeComponent_option_166_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("value", col_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](col_r3.name);
} }
class HomeComponent {
    constructor(formBuilder, myRoute, mainService) {
        this.formBuilder = formBuilder;
        this.myRoute = myRoute;
        this.mainService = mainService;
        this.propertyTypes = [];
        this.loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({
            apiKey: "",
            version: "weekly",
            libraries: ["places"]
        });
        this.mapOptions = {
            center: {
                lat: -22.983781298015188,
                lng: -43.3612144413545
            },
            zoom: 11
        };
        this.propertySearchForm = this.formBuilder.group({
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])],
            property_type: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])],
            price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])],
            rooms: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])],
            parking_spot: [''],
        });
    }
    ngOnInit() {
        this.loadMap();
        this.getPropertyTypes();
    }
    getPropertyTypes() {
        this.mainService.getPropertyTypes()
            .subscribe((data) => {
            this.propertyTypes = data.result;
        }).add(() => {
        });
    }
    searchProperty() {
        var _a, _b, _c, _d, _e;
        if (this.propertySearchForm.invalid) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
                title: 'Preencha todos campos do formulário',
                icon: 'warning',
                iconHtml: '',
                confirmButtonText: 'ok',
                confirmButtonColor: '#012942',
                showCloseButton: true,
            });
        }
        else {
            this.myRoute.navigate([`/home/search-property/${{
                    "address": (_a = this.propertySearchForm.get('address')) === null || _a === void 0 ? void 0 : _a.value,
                    "property_type": (_b = this.propertySearchForm.get('property_type')) === null || _b === void 0 ? void 0 : _b.value,
                    "price": (_c = this.propertySearchForm.get('price')) === null || _c === void 0 ? void 0 : _c.value,
                    "rooms": (_d = this.propertySearchForm.get('rooms')) === null || _d === void 0 ? void 0 : _d.value,
                    "parking_spot": (_e = this.propertySearchForm.get('parking_spot')) === null || _e === void 0 ? void 0 : _e.value,
                }}`
            ]);
        }
    }
    loadMap() {
        this.loader.loadCallback(e => {
            if (e) {
                console.log(e);
            }
            else {
                new google.maps.Map(document.getElementById("map"), this.mapOptions);
            }
        });
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_main_service__WEBPACK_IMPORTED_MODULE_2__.MainService)); };
HomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 245, vars: 4, consts: [[1, "first", "col-md-12", "p-4"], [1, "d-flex", "justify-content-center", "align-items-center"], [1, "d-flex", "justify-content-start", "align-items-center", 2, "height", "80vh", "width", "60%", "position", "absolute"], [1, "web-simulator", "p-4"], [1, "d-flex", "flex-column", "align-items-center", "justify-content-evenly"], [1, "fs-1", "fw-bold", "text-white"], [1, "fw-semibold", "text-white"], ["type", "button", 1, "simple-elevated-button", "btn"], [1, "mobile-simulator", "p-4"], [1, "banner-img", "w-100"], [1, "second", "col-md-12", "p-4"], [1, "column", "text-center"], [1, "title"], [1, "d-flex", "felx-column", "flex-wrap", "justify-content-center", "p-4"], [1, "event-card-left"], [1, "event-card-right"], [1, "d-flex", "flex-column", "p-4"], [1, "text-end"], ["href", "#", 1, "btn", "p-0"], [1, "fw-bold"], [1, "bi", "bi-chevron-right"], [1, "fw-bold", "fs-4", "pb-2"], [1, "fw-bold", "fs-6", "pb-5"], [1, "d-flex", "flex-row", "pb-4"], ["src", "../../../assets/icons/Pin.png", 2, "height", "25px", "width", "20px"], [2, "line-height", "18px"], [1, "small-sub-title", "fw-semibold"], [1, "d-flex", "flex-row", "flex-wrap", "justify-content-evenly", "align-items-center"], [1, "event-card-right-section"], ["type", "button", 1, "simple-elevated-red-button", "btn"], ["src", "../../../assets/icons/calendar.png"], [1, "fs-6", "fw-semibold"], ["src", "../../../assets/icons/clock.png"], [1, "third", "col-md-12", "p-4"], [1, "column"], [1, "d-flex", "felx-column", "flex-wrap", "justify-content-evenly", "pb-5"], ["src", "../../../assets/img/kreditos-imobi.png", 1, "pt-5", 2, "height", "100px", "width", "135px"], ["src", "../../../assets/img/homer.png", 1, "pt-5", 2, "height", "100px", "width", "135px"], ["src", "../../../assets/img/logo_crediall_complete.png", 1, "pt-5", 2, "height", "70px", "width", "150px"], [1, "column", "p-4"], ["src", "../../../assets/img/rede_dor.png", 1, "pt-5"], ["src", "../../../assets/img/coren.png", 1, "pt-5"], [1, "fourth", "col-md-12", "p-5"], [1, "d-flex", "flex-column", "align-items-center", "text-center"], [1, "title", "pb-3"], ["id", "web"], [1, "d-flex", "flex-column", "flex-wrap", "align-items-center", "w-75", 3, "formGroup", "submit"], [1, "input-group", "w-75"], [1, "search-form-field", 2, "width", "99.5%", "border-radius", "10px 10px 0px 0px"], [1, "form-label", "pt-1"], [1, "bi", "bi-geo-alt-fill"], ["formControlName", "address", "type", "text", "placeholder", "Endere\u00E7o, Bairro, Condom\u00EDnio", 1, "form-control", "input-style"], [1, "search-form-field", 2, "width", "30%", "border-radius", "0px 0px 0px 10px"], [1, "bi", "bi-house-fill"], [1, "d-flex", "flex-row", "align-items-center", "w-100"], ["formControlName", "property_type", 1, "input-style", "form-control"], ["value", "0", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "bi", "bi-chevron-down"], [1, "search-form-field", 2, "width", "30%"], [1, "bi", "bi-currency-dollar"], ["formControlName", "price", "type", "text", "placeholder", "Insira o valor", 1, "form-control", "input-style"], [1, "search-form-field", 2, "width", "20%"], ["formControlName", "rooms", 1, "input-style", "form-control"], ["value", "", "selected", ""], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], [1, "search-form-field", 2, "width", "20%", "border-radius", "0px 0px 10px 0px"], [1, "bi", "bi-car-front-fill"], ["formControlName", "parking_spot", 1, "input-style", "form-control"], ["type", "submit", 1, "simple-elevated-red-button", "btn", "mt-5"], ["id", "mobile"], [1, "d-flex", "flex-column", "flex-wrap", "align-items-center", "w-100", 3, "formGroup", "submit"], [1, "input-group", "w-100", "mb-3"], [1, "search-form-field", "rounded-3", "w-100"], [1, "input-group", "w-100"], [1, "search-form-field", "rounded-3", "w-100", "mb-3"], [1, "search-form-field", "rounded-3", "w-50"], [1, "sixth", "col-md-12", "p-4"], [1, "d-flex", "flex-row", "flex-wrap", "text-center"], [1, "col-md-4", "col-12"], ["src", "../../../assets/img/logo_crediall_complete.png", 1, "pb-5"], [1, "d-flex", "flex-row", "justify-content-center", "pb-5"], ["href", "https://www.linkedin.com/feed/"], ["src", "../../../assets/icons/linkdin.png"], ["href", "https://pt-br.facebook.com/"], ["src", "../../../assets/icons/facebook.png"], ["href", "https://www.instagram.com/"], ["src", "../../../assets/icons/instagram.png"], [1, "sub-title"], [1, "d-flex", "justify-content-center"], ["id", "map"], [1, "d-flex", "flex-row", "text-start", "pt-4", 2, "max-width", "600px"], ["src", "../../../assets/icons/adress-pin.png", 2, "height", "35px", "width", "35px"], [1, "column", "text-start", "p-4"], [1, "input-group", "mb-3"], ["type", "text", 1, "form-control", "border-dark"], ["type", "button", 1, "btn", "simple-elevated-button"], [3, "value"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-app-nav-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " O melhor lugar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " para seu");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " investimento ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, " Financie at\u00E9 80% do seu novo im\u00F3vel, com ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "menos burocracia e mais flexibilidade. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " Simular agora ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, " O melhor lugar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, " para seu");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, " investimento ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, " Financie at\u00E9 80% do seu novo im\u00F3vel, com ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "menos burocracia e mais flexibilidade. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, " Simular agora ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](32, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, "Sal\u00E3o de Im\u00F3veis");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](38, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "p", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "1/2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](45, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "p", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "Sal\u00E3o de Im\u00F3veis - Rio de Janeiro");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "p", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Texto sobre o evento (criar um resumo sobre o evento).");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](51, "img", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](54, " \u00A0\u00A0Via Parque Shopping - Estacionamento ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](55, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, " Avenida Ayrton Senna, 3000, Barra da Tijuca, Rio de Janeiro, RJ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61, " Saiba mais ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](63, "img", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "p", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](65, "\u00A0\u00A031/01 a 02/02");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](67, "img", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](68, "p", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](69, "\u00A0\u00A010h \u00E0s 22h");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](70, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](71, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](73, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](74, "Realiza\u00E7\u00E3o");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](75, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](76, "img", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](77, "img", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](78, "img", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](79, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](80, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](81, "Participa\u00E7\u00E3o");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](82, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](83, "img", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](84, "img", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](85, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](86, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](87, "p", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](88, "Encontre um im\u00F3vel pr\u00F3ximo de voc\u00EA!");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](89, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](90, "form", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function HomeComponent_Template_form_submit_90_listener() { return ctx.searchProperty(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](91, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](92, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](93, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](94, "i", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](95, "\u00A0Endere\u00E7o");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](96, "input", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](97, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](98, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](99, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](100, "i", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](101, "\u00A0Tipo do im\u00F3vel");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](102, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](103, "select", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](104, "option", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](105, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](106, HomeComponent_option_106_Template, 2, 2, "option", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](107, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](108, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](109, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](110, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](111, "i", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](112, "\u00A0Im\u00F3vel at\u00E9");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](113, "input", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](114, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](115, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](116, "\u00A0Quartos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](117, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](118, "select", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](119, "option", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](120, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](121, "option", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](122, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](123, "option", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](124, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](125, "option", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](126, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](127, "option", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](128, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](129, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](130, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](131, "div", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](132, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](133, "i", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](134, "\u00A0Vagas");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](135, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](136, "select", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](137, "option", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](138, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](139, "option", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](140, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](141, "option", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](142, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](143, "option", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](144, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](145, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](146, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](147, "button", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](148, " Buscar im\u00F3veis ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](149, "div", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](150, "form", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function HomeComponent_Template_form_submit_150_listener() { return ctx.searchProperty(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](151, "div", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](152, "div", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](153, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](154, "i", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](155, "\u00A0Endere\u00E7o");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](156, "input", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](157, "div", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](158, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](159, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](160, "i", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](161, "\u00A0Tipo do im\u00F3vel");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](162, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](163, "select", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](164, "option", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](165, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](166, HomeComponent_option_166_Template, 2, 2, "option", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](167, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](168, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](169, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](170, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](171, "i", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](172, "\u00A0Im\u00F3vel at\u00E9");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](173, "input", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](174, "div", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](175, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](176, "\u00A0Quartos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](177, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](178, "select", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](179, "option", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](180, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](181, "option", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](182, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](183, "option", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](184, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](185, "option", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](186, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](187, "option", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](188, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](189, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](190, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](191, "div", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](192, "label", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](193, "i", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](194, "\u00A0Vagas");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](195, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](196, "select", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](197, "option", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](198, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](199, "option", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](200, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](201, "option", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](202, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](203, "option", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](204, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](205, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](206, "i", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](207, "button", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](208, " Buscar im\u00F3veis ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](209, "div", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](210, "div", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](211, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](212, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](213, "img", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](214, "div", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](215, "a", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](216, "img", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](217, " \u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](218, "a", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](219, "img", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](220, " \u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](221, "a", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](222, "img", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](223, "p", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](224, "Tel: (21) 98283-0243");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](225, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](226, "div", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](227, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](228, "div", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](229, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](230, "img", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](231, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](232, "p", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](233, "Av. Jos\u00E9 Silva de Azevedo Neto, 200, Bl 2, Sala 403 Barra da Tijuca - Rio de Janeiro / RJ \u2013 CEP: 22775-056");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](234, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](235, "div", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](236, "p", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](237, "ASSINAR");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](238, "p", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](239, "Receba not\u00EDcias e atualiza\u00E7\u00F5es sobre a Crediall por e-mail.");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](240, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](241, "div", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](242, "input", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](243, "button", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](244, "Assinar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](90);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.propertySearchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.propertyTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.propertySearchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.propertyTypes);
    } }, directives: [_components_app_nav_bar_app_nav_bar_component__WEBPACK_IMPORTED_MODULE_3__.AppNavBarComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf], styles: [".first[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  display: flexbox;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.web-simulator[_ngcontent-%COMP%] {\r\n  height: 83vh;\r\n  width: 45vh;\r\n  display: flex;\r\n  position: absolute;\r\n  background-color: #c30000d8;\r\n}\r\n\r\n.mobile-simulator[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n.banner-img[_ngcontent-%COMP%] {\r\n  height: 80vh;\r\n  background-size: auto;\r\n  background-position: center; \r\n  background-repeat: no-repeat;\r\n  background-image: url(\"/../../assets/img/banner-img-2.jpg\");\r\n}\r\n\r\n\r\n\r\n.second[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: rgba(143, 31, 153, 0)\r\n}\r\n\r\n.event-card-left[_ngcontent-%COMP%] {\r\n  height: 400px;\r\n  width: 500px;\r\n  min-width: 15%;\r\n  background-size: cover;\r\n  background-color: #380f91;\r\n  background-position: center; \r\n  background-repeat: no-repeat;\r\n  background-image: url(\"/../../assets/img/property_hall.png\");\r\n}\r\n\r\n.event-card-right[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  min-width: 15%;\r\n  text-align: start;\r\n  color: #380f91;\r\n  background-color: #E0D9C3;\r\n}\r\n\r\n.event-card-right-section[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  margin-top: 10px;\r\n  max-height: 40px;\r\n  min-width: 150px;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n\r\n\r\n.third[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: rgba(98, 21, 105, 0)\r\n}\r\n\r\n\r\n\r\n.fourth[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #ffffff;\r\n  background-color: #012942;\r\n}\r\n\r\n.search-form-field[_ngcontent-%COMP%] {\r\n\r\n  display: flex;\r\n  padding-inline: 10px;\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n\r\n  height: 80px;\r\n  border: #ffffffbf;\r\n  border-style: solid;\r\n  border-width: 1px;\r\n  -webkit-text-decoration: #ffffff;\r\n          text-decoration: #ffffff;\r\n  color: rgb(255, 255, 255);\r\n  background-color: transparent;\r\n}\r\n\r\n.input-style[_ngcontent-%COMP%] {\r\n  border: none;\r\n  color: #ffffffbf;\r\n  background-color: transparent;\r\n}\r\n\r\n[_ngcontent-%COMP%]::placeholder {\r\n  color: #ffffffbf;\r\n}\r\n\r\noption[_ngcontent-%COMP%] {\r\n  background-color: #012942;\r\n}\r\n\r\n\r\n\r\n.fifth[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: rgba(40, 8, 43, 0)\r\n}\r\n\r\n\r\n\r\n.sixth[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: #F5F5F5\r\n}\r\n\r\n#map[_ngcontent-%COMP%] {\r\n  height: 300px;\r\n  width: auto;\r\n  max-width: 600px;\r\n}\r\n\r\n.input-group[_ngcontent-%COMP%] {\r\n  width: auto;\r\n  max-width: 600px;\r\n  background-color: transparent;\r\n}\r\n\r\n\r\n\r\n.title[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-size: 25px;\r\n}\r\n\r\n.sub-title[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-size: 15px;\r\n}\r\n\r\n.small-sub-title[_ngcontent-%COMP%] {\r\n  font-weight: 100;\r\n  font-size: 12px;\r\n}\r\n\r\n.simple-elevated-button[_ngcontent-%COMP%] {\r\n  color: white;\r\n  font-weight: 500;\r\n  background-color: #012942;\r\n}\r\n\r\n.simple-elevated-red-button[_ngcontent-%COMP%] {\r\n  color: white;\r\n  font-weight: 500;\r\n  min-width: 100px;\r\n  background-color: #C30000;\r\n}\r\n\r\n#web[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n#mobile[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n  display: none;\r\n}\r\n\r\n\r\n\r\n@media screen and (max-width: 980px) {\r\n  #web[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  #mobile[_ngcontent-%COMP%] {\r\n    display: block;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 610px) {\r\n  .web-simulator[_ngcontent-%COMP%] {\r\n    visibility: hidden;\r\n  }\r\n\r\n  .mobile-simulator[_ngcontent-%COMP%] {\r\n    height: 83vh;\r\n    width: 100vh;\r\n    display: flex;\r\n    background-color: #c30000d8;\r\n  }\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsVUFBVTs7QUFFVjtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsMkRBQTJEO0FBQzdEOztBQUVBLFlBQVk7O0FBRVo7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkO0FBQ0Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIseUJBQXlCO0VBQ3pCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsNERBQTREO0FBQzlEOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsY0FBYztFQUNkLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBLFVBQVU7O0FBRVY7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkO0FBQ0Y7O0FBRUEsV0FBVzs7QUFFWDtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2QseUJBQXlCO0FBQzNCOztBQUVBOztFQUVFLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsc0JBQXNCO0VBQ3RCLHVCQUF1Qjs7RUFFdkIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdDQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIseUJBQXlCO0VBQ3pCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBLFVBQVU7O0FBRVY7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkO0FBQ0Y7O0FBRUEsVUFBVTs7QUFFVjtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQiw2QkFBNkI7QUFDL0I7O0FBRUEsY0FBYzs7QUFFZDtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQSxnQkFBZ0I7O0FBRWhCO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLDJCQUEyQjtFQUM3Qjs7QUFFRiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogRklSU1QgKi9cclxuXHJcbi5maXJzdCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGRpc3BsYXk6IGZsZXhib3g7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLndlYi1zaW11bGF0b3Ige1xyXG4gIGhlaWdodDogODN2aDtcclxuICB3aWR0aDogNDV2aDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzMwMDAwZDg7XHJcbn1cclxuXHJcbi5tb2JpbGUtc2ltdWxhdG9yIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4uYmFubmVyLWltZyB7XHJcbiAgaGVpZ2h0OiA4MHZoO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogYXV0bztcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IFxyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLy4uLy4uL2Fzc2V0cy9pbWcvYmFubmVyLWltZy0yLmpwZ1wiKTtcclxufVxyXG5cclxuLyogU0VDT05EICAqL1xyXG5cclxuLnNlY29uZCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjMDEyOTQyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQzLCAzMSwgMTUzLCAwKVxyXG59XHJcblxyXG4uZXZlbnQtY2FyZC1sZWZ0IHtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG4gIHdpZHRoOiA1MDBweDtcclxuICBtaW4td2lkdGg6IDE1JTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODBmOTE7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyBcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi8uLi8uLi9hc3NldHMvaW1nL3Byb3BlcnR5X2hhbGwucG5nXCIpO1xyXG59XHJcblxyXG4uZXZlbnQtY2FyZC1yaWdodCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG1pbi13aWR0aDogMTUlO1xyXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xyXG4gIGNvbG9yOiAjMzgwZjkxO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNFMEQ5QzM7XHJcbn1cclxuXHJcbi5ldmVudC1jYXJkLXJpZ2h0LXNlY3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXgtaGVpZ2h0OiA0MHB4O1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLyogVEhJUkQgKi9cclxuXHJcbi50aGlyZCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjMDEyOTQyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoOTgsIDIxLCAxMDUsIDApXHJcbn1cclxuXHJcbi8qIEZPVVJUSCAqL1xyXG5cclxuLmZvdXJ0aCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMTI5NDI7XHJcbn1cclxuXHJcbi5zZWFyY2gtZm9ybS1maWVsZCB7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcGFkZGluZy1pbmxpbmU6IDEwcHg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuXHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG4gIGJvcmRlcjogI2ZmZmZmZmJmO1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiAjZmZmZmZmO1xyXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5pbnB1dC1zdHlsZSB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGNvbG9yOiAjZmZmZmZmYmY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbjo6cGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiAjZmZmZmZmYmY7XHJcbn1cclxuXHJcbm9wdGlvbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAxMjk0MjtcclxufVxyXG5cclxuLyogRklGVEggKi9cclxuXHJcbi5maWZ0aCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjMDEyOTQyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDgsIDQzLCAwKVxyXG59XHJcblxyXG4vKiBTSVhUSCAqL1xyXG5cclxuLnNpeHRoIHtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgY29sb3I6ICMwMTI5NDI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Y1RjVGNVxyXG59XHJcblxyXG4jbWFwIHtcclxuICBoZWlnaHQ6IDMwMHB4O1xyXG4gIHdpZHRoOiBhdXRvO1xyXG4gIG1heC13aWR0aDogNjAwcHg7XHJcbn1cclxuXHJcbi5pbnB1dC1ncm91cCB7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogVVRJTElUSUVTICovXHJcblxyXG4udGl0bGUge1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG59XHJcblxyXG4uc3ViLXRpdGxlIHtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLnNtYWxsLXN1Yi10aXRsZSB7XHJcbiAgZm9udC13ZWlnaHQ6IDEwMDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5zaW1wbGUtZWxldmF0ZWQtYnV0dG9uIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDEyOTQyO1xyXG59XHJcblxyXG4uc2ltcGxlLWVsZXZhdGVkLXJlZC1idXR0b24ge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1pbi13aWR0aDogMTAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0MzMDAwMDtcclxufVxyXG5cclxuI3dlYiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNtb2JpbGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi8qIE1FRElBIFFVRVJZICovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5ODBweCkge1xyXG4gICN3ZWIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcblxyXG4gICNtb2JpbGUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MTBweCkge1xyXG4gIC53ZWItc2ltdWxhdG9yIHtcclxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICB9XHJcblxyXG4gIC5tb2JpbGUtc2ltdWxhdG9yIHtcclxuICAgIGhlaWdodDogODN2aDtcclxuICAgIHdpZHRoOiAxMDB2aDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzMwMDAwZDg7XHJcbiAgfVxyXG5cclxufSJdfQ== */"] });


/***/ }),

/***/ 7348:
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/main/pages/search-property/components/search-result/search-result.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchResultComponent": () => (/* binding */ SearchResultComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 8267);


function SearchResultComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " IM\u00D3VEL DE INCORPORADORA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " \u00A0\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "HOMER");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Apartamento ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " \u00E0 vista ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Empreendimento: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Fale com o Especialista");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", col_r1.medias[0].url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", col_r1.location, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" A partir de R$ ", ctx_r0.getFormattedPrice(col_r1.price.minimumPrice), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Commiss\u00E3o de at\u00E9 ", ctx_r0.getFormattedPercent(col_r1.commission), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", col_r1.size.roomsCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", col_r1.size.parkingSpotsCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", col_r1.propertyDeveloper.name, " ");
} }
class SearchResultComponent {
    constructor() {
        this.propertiesList = [];
    }
    ngOnInit() {
    }
    getFormattedPrice(price) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }
    getFormattedPercent(num) {
        return new Intl.NumberFormat('default', {
            style: 'percent',
            minimumFractionDigits: 1,
        }).format(num / 100);
    }
}
SearchResultComponent.ɵfac = function SearchResultComponent_Factory(t) { return new (t || SearchResultComponent)(); };
SearchResultComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SearchResultComponent, selectors: [["app-search-result"]], inputs: { propertiesList: "propertiesList" }, decls: 4, vars: 1, consts: [[1, "col-12", "mt-4", "p-4"], [1, "d-flex", "flex-row", "flex-wrap", "justify-content-center"], [1, "row", "justify-content-center"], ["class", "card border border-dark rounded-3 p-0 m-3", 4, "ngFor", "ngForOf"], [1, "card", "border", "border-dark", "rounded-3", "p-0", "m-3"], [1, "d-flex", "justify-content-center", "w-100", "rounded-top", "p-1", 2, "height", "22px", "background-color", "#012942"], [1, "text-white", 2, "font-size", "11px"], [1, "card-img-top", 3, "src"], [1, "card-body", "justify-content-center"], [1, "d-flex", "flex-row", "justify-content-between", "pb-2", 2, "height", "22px"], [1, "d-flex", "align-items-center"], ["src", "../../../assets/icons/homer.png"], [1, "fs-5", "fw-semibold", "pt-4"], ["href", "#", 2, "color", "#012942"], [1, "bi", "bi-three-dots-vertical"], [1, "d-flex", "flex-row", "pt-4", "pb-2"], [2, "line-height", "18px"], [1, "fs-5", "fw-semibold"], [1, "fs-5", "fw-normal", "text-success"], [1, "location", "pb-2"], [1, "pb-2", 2, "line-height", "18px"], [1, "text-secondary"], [1, "column", "pb-2"], [1, "form-label", "pt-1"], [1, "bi", "bi-house-fill"], [1, "bi", "bi-car-front-fill"], [1, "d-flex", "flex-row", "pb-2"], [1, "fw-semibold"], [1, "fw-bold"], [1, "text-center"], ["type", "button", 1, "btn", "btn-outline-danger", "fw-semibold"]], template: function SearchResultComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SearchResultComponent_div_3_Template, 45, 7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.propertiesList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf], styles: [".card[_ngcontent-%COMP%] {\r\n  height: 640px;\r\n  width: 320px;\r\n  max-width: 320px;\r\n}\r\n\r\n.row[_ngcontent-%COMP%] {\r\n  width: 80%;\r\n}\r\n\r\n.card-img-top[_ngcontent-%COMP%] {\r\n  height: 250px;\r\n}\r\n\r\n.location[_ngcontent-%COMP%] {\r\n  height: 50px;\r\n  display: -webkit-box; \r\n  -webkit-line-clamp: 1.5; \r\n  -webkit-box-orient: vertical; \r\n  overflow: hidden;\r\n  font-weight: 500;\r\n  color: gray;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1yZXN1bHQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQix1QkFBdUI7RUFDdkIsNEJBQTRCO0VBQzVCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiIiwiZmlsZSI6InNlYXJjaC1yZXN1bHQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkIHtcclxuICBoZWlnaHQ6IDY0MHB4O1xyXG4gIHdpZHRoOiAzMjBweDtcclxuICBtYXgtd2lkdGg6IDMyMHB4O1xyXG59XHJcblxyXG4ucm93IHtcclxuICB3aWR0aDogODAlO1xyXG59XHJcblxyXG4uY2FyZC1pbWctdG9wIHtcclxuICBoZWlnaHQ6IDI1MHB4O1xyXG59XHJcblxyXG4ubG9jYXRpb24ge1xyXG4gIGhlaWdodDogNTBweDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDsgXHJcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAxLjU7IFxyXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7IFxyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogZ3JheTtcclxufSJdfQ== */"] });


/***/ }),

/***/ 5547:
/*!*********************************************************************************!*\
  !*** ./src/app/modules/main/pages/search-property/search-property.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchPropertyComponent": () => (/* binding */ SearchPropertyComponent)
/* harmony export */ });
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ 206);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _shared_main_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/main.service */ 2998);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _components_search_result_search_result_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/search-result/search-result.component */ 7348);







function SearchPropertyComponent_option_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r13.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r13.name);
} }
function SearchPropertyComponent_option_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r14.name);
} }
function SearchPropertyComponent_option_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r15.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r15.name);
} }
function SearchPropertyComponent_option_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r16.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r16.name);
} }
function SearchPropertyComponent_option_105_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r17.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r17.name);
} }
function SearchPropertyComponent_option_118_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r18.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r18.name);
} }
function SearchPropertyComponent_option_128_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r19.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r19.name);
} }
function SearchPropertyComponent_option_138_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r20.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r20.name);
} }
function SearchPropertyComponent_option_149_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r21.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r21.name);
} }
function SearchPropertyComponent_option_202_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", col_r22.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](col_r22.name);
} }
function SearchPropertyComponent_app_search_result_205_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-search-result", 88);
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("propertiesList", ctx_r10.propertiesList);
} }
function SearchPropertyComponent_div_206_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function SearchPropertyComponent_div_207_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "p", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Nenhum resultado encontrado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class SearchPropertyComponent {
    constructor(currentRoute, formBuilder, mainService) {
        this.currentRoute = currentRoute;
        this.formBuilder = formBuilder;
        this.mainService = mainService;
        this.states = [];
        this.cities = [];
        this.districts = [];
        this.propertyTypes = [];
        this.propertyDevelopers = [];
        this.gettingPropertiesList = false;
        this.propertiesList = [];
        this.loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({
            apiKey: "",
            version: "weekly",
            libraries: ["places"]
        });
        this.mapOptions = {
            center: {
                lat: -22.983781298015188,
                lng: -43.3612144413545
            },
            zoom: 11
        };
        this.propertySearchForm = this.formBuilder.group({
            state: ['Rio de Janeiro'],
            city: ['Rio de Janeiro'],
            district: [''],
            typology: [''],
            price: [0],
            rooms: [0],
            parking_spot: [0],
            property_developer: [''],
        });
    }
    ngOnInit() {
        console.log(this.currentRoute.snapshot.params['property-parameters']);
        this.getProperties();
        this.loadMap();
    }
    getProperties() {
        var _a, _b, _c;
        this.getStates();
        this.getCities((_a = this.propertySearchForm.get('state')) === null || _a === void 0 ? void 0 : _a.value);
        this.getDistrict((_b = this.propertySearchForm.get('city')) === null || _b === void 0 ? void 0 : _b.value, (_c = this.propertySearchForm.get('state')) === null || _c === void 0 ? void 0 : _c.value);
        this.getPropertyTypes();
        this.getPropertyDevelopers();
        this.getPropertiesList();
    }
    // GET ROUTINES
    getStates() {
        this.mainService.getStates()
            .subscribe((data) => {
            this.states = data.result;
        }).add(() => {
        });
    }
    getCities(state) {
        this.mainService.getCities(state)
            .subscribe((data) => {
            this.cities = data.result;
        }).add(() => {
        });
    }
    getDistrict(city, state) {
        this.mainService.getDistricts(city, state)
            .subscribe((data) => {
            this.districts = data.result;
        }).add(() => {
        });
    }
    getPropertyTypes() {
        this.mainService.getPropertyTypes()
            .subscribe((data) => {
            this.propertyTypes = data.result;
        }).add(() => {
        });
    }
    getPropertyDevelopers() {
        this.mainService.getPropertyDevelopers()
            .subscribe((data) => {
            this.propertyDevelopers = data.result;
        }).add(() => {
        });
    }
    getPropertiesList() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.gettingPropertiesList = true;
        let params = {
            'limit': 20,
            'offset': 0,
            'area': 200,
            'state': (_a = this.propertySearchForm.get('state')) === null || _a === void 0 ? void 0 : _a.value,
            'city': (_b = this.propertySearchForm.get('city')) === null || _b === void 0 ? void 0 : _b.value,
            'district': (_c = this.propertySearchForm.get('district')) === null || _c === void 0 ? void 0 : _c.value,
            'minimumPrice': parseFloat((_d = this.propertySearchForm.get('price')) === null || _d === void 0 ? void 0 : _d.value),
            'maximumPrice': parseFloat((_e = this.propertySearchForm.get('price')) === null || _e === void 0 ? void 0 : _e.value),
            'parkingSpots': parseInt((_f = this.propertySearchForm.get('parking_spot')) === null || _f === void 0 ? void 0 : _f.value),
            'propertyDeveloperId': parseInt((_g = this.propertySearchForm.get('property_developer')) === null || _g === void 0 ? void 0 : _g.value),
            'propertyStateId': parseInt((_h = this.propertySearchForm.get('state')) === null || _h === void 0 ? void 0 : _h.value),
            'propertyTypeId': parseInt((_j = this.propertySearchForm.get('typology')) === null || _j === void 0 ? void 0 : _j.value),
            'rooms': parseInt((_k = this.propertySearchForm.get('rooms')) === null || _k === void 0 ? void 0 : _k.value),
        };
        this.mainService.getPropertiesList(params)
            .subscribe((data) => {
            this.propertiesList = data.result.results;
        }).add(() => {
            this.gettingPropertiesList = false;
        });
    }
    // CHANGE ROUTINES
    stateChanged() {
        var _a, _b, _c;
        this.getCities((_a = this.propertySearchForm.get('state')) === null || _a === void 0 ? void 0 : _a.value);
        this.getDistrict((_b = this.propertySearchForm.get('city')) === null || _b === void 0 ? void 0 : _b.value, (_c = this.propertySearchForm.get('state')) === null || _c === void 0 ? void 0 : _c.value);
        this.propertySearchForm.controls['city'].setValue('');
        this.propertySearchForm.controls['district'].setValue('');
        this.getPropertiesList();
    }
    cityChanged() {
        var _a, _b;
        this.getDistrict((_a = this.propertySearchForm.get('city')) === null || _a === void 0 ? void 0 : _a.value, (_b = this.propertySearchForm.get('state')) === null || _b === void 0 ? void 0 : _b.value);
        this.propertySearchForm.controls['district'].setValue('');
        this.getPropertiesList();
    }
    districtChanged() {
        this.getPropertiesList();
    }
    typologyChanged() {
        this.getPropertiesList();
    }
    priceChanged() {
        this.getPropertiesList();
    }
    roomChanged() {
        this.getPropertiesList();
    }
    parkingSpotChanged() {
        this.getPropertiesList();
    }
    propertyDeveloperChanged() {
        this.getPropertiesList();
    }
    loadMap() {
        this.loader.loadCallback(e => {
            if (e) {
                console.log(e);
            }
            else {
                new google.maps.Map(document.getElementById("map"), this.mapOptions);
            }
        });
    }
}
SearchPropertyComponent.ɵfac = function SearchPropertyComponent_Factory(t) { return new (t || SearchPropertyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_main_service__WEBPACK_IMPORTED_MODULE_1__.MainService)); };
SearchPropertyComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: SearchPropertyComponent, selectors: [["app-search-property"]], decls: 281, vars: 15, consts: [[1, "d-flex", "align-items-baseline", "justify-content-between", "p-3", "w-100"], ["routerLink", "/home/", 2, "font-size", "25px", "color", "#012942"], ["aria-hidden", "true", 1, "fa", "fa-arrow-circle-left", "mb-4"], ["href", "#", 1, "navbar-brand"], ["src", "../../../assets/img/logo_crediall_complete.png", "alt", "Creadiall", 2, "height", "20px", "width", "130px"], [1, "first", "col-md-12", "p-4"], [1, "d-flex", "flex-column", "justify-content-center", "align-items-center"], [1, "col-md-12", "pb-3"], [1, "web", 3, "formGroup"], [1, "d-flex", "flex-row", "justify-content-center"], [1, "search-form-field", "rounded"], [1, "form-label"], [1, "d-flex", "flex-row", "align-items-center", "w-100"], ["formControlName", "state", 1, "input-style", "form-control", 3, "change"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "bi", "bi-chevron-down"], [1, "search-form-field", "rounded", 2, "min-width", "180px", "max-width", "250px"], ["formControlName", "city", 1, "input-style", "form-control", 3, "change"], [1, "search-form-field", "rounded", 2, "min-width", "180px"], ["formControlName", "district", 1, "input-style", "form-control", 3, "change"], ["formControlName", "typology", 1, "input-style", "form-control", 3, "change"], ["value", "", "selected", ""], ["selected", "", 3, "value", 4, "ngFor", "ngForOf"], [1, "search-form-field", "rounded", 2, "max-width", "180px"], [1, "d-flex", "flex-row", "align-items-baseline", "w-100"], ["formControlName", "price", 1, "input-style", "form-control"], ["formControlName", "rooms", 1, "input-style", "form-control", 3, "change"], ["value", "0", "selected", ""], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["formControlName", "parking_spot", 1, "input-style", "form-control", 3, "change"], ["formControlName", "property_developer", 1, "input-style", "form-control", 3, "change"], [1, "mobile", 3, "formGroup"], [1, "d-flex", "flex-column", "justify-content-center", 2, "width", "100%"], [1, "d-flex", "flex-row", "flex-wrap"], [1, "search-form-field", "rounded", "col-md-4", "col-12"], [1, "search-form-field", "rounded", "col-md-4", "col-6"], [3, "propertiesList", 4, "ngIf"], ["class", "d-flex align-items-center w-100", 4, "ngIf"], [1, "second", "col-md-12", "p-4"], [1, "column", "text-center"], [1, "title"], [1, "d-flex", "felx-column", "flex-wrap", "justify-content-center", "p-4"], [1, "event-card-left"], [1, "event-card-right"], [1, "d-flex", "flex-column", "p-4"], [1, "text-end"], ["href", "#", 1, "btn", "p-0"], [1, "fw-bold"], [1, "bi", "bi-chevron-right"], [1, "fw-bold", "fs-4", "pb-2"], [1, "fw-bold", "fs-6", "pb-5"], [1, "d-flex", "flex-row", "pb-4"], ["src", "../../../assets/icons/Pin.png", 2, "height", "25px", "width", "20px"], [2, "line-height", "18px"], [1, "small-sub-title", "fw-semibold"], [1, "d-flex", "flex-row", "flex-wrap", "justify-content-evenly", "align-items-center"], [1, "event-card-right-section"], ["type", "button", 1, "simple-elevated-red-button", "btn"], ["src", "../../../assets/icons/calendar.png"], [1, "fs-6", "fw-semibold"], ["src", "../../../assets/icons/clock.png"], [1, "sixth", "col-md-12", "p-4"], [1, "d-flex", "flex-row", "flex-wrap", "text-center"], [1, "col-md-4", "col-12"], [1, "column", "p-4"], ["src", "../../../assets/img/logo_crediall_complete.png", 1, "pb-5"], [1, "d-flex", "flex-row", "justify-content-center", "pb-5"], ["href", "https://www.linkedin.com/feed/"], ["src", "../../../assets/icons/linkdin.png"], ["href", "https://pt-br.facebook.com/"], ["src", "../../../assets/icons/facebook.png"], ["href", "https://www.instagram.com/"], ["src", "../../../assets/icons/instagram.png"], [1, "sub-title"], [1, "d-flex", "justify-content-center"], ["id", "map"], [1, "d-flex", "flex-row", "text-start", "pt-4", 2, "max-width", "600px"], ["src", "../../../assets/icons/adress-pin.png", 2, "height", "35px", "width", "35px"], [1, "column", "text-start", "p-4"], [1, "input-group", "mb-3"], ["type", "text", 1, "form-control", "border-dark"], ["type", "button", 1, "btn", "simple-elevated-button"], [3, "value"], ["selected", "", 3, "value"], [3, "propertiesList"], [1, "d-flex", "align-items-center", "w-100"], [1, "w-100", "p-5", "text-center"], [1, "spinner-border", 2, "height", "4rem", "width", "4rem", "color", "#012942"], [1, "fs-4", "fw-semibold", "text-muted"]], template: function SearchPropertyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "form", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Estado");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_15_listener() { return ctx.stateChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, SearchPropertyComponent_option_18_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Cidade");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_26_listener() { return ctx.cityChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, SearchPropertyComponent_option_29_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](31, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Bairro");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_37_listener() { return ctx.districtChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, SearchPropertyComponent_option_40_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, "Tipologia");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "select", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_48_listener() { return ctx.typologyChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](51, SearchPropertyComponent_option_51_Template, 2, 2, "option", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](53, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "Valor M\u00E1x");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "R$");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](61, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](62, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](63, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Quartos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "select", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_68_listener() { return ctx.roomChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "option", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](70, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "option", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "option", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "option", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](80, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](81, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](84, "Vagas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](86, "select", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_86_listener() { return ctx.parkingSpotChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "option", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "option", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](90, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](92, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "option", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](94, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](96, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](100, "Incorporadoras");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "select", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_102_listener() { return ctx.propertyDeveloperChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](103, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](104, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](105, SearchPropertyComponent_option_105_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](106, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](107, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "form", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](109, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](112, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "Estado");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_115_listener() { return ctx.stateChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](118, SearchPropertyComponent_option_118_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](120, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](123, "Cidade");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](124, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_125_listener() { return ctx.cityChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](127, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](128, SearchPropertyComponent_option_128_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](130, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](131, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](132, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](133, "Bairro");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](134, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_135_listener() { return ctx.districtChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](137, "Todos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](138, SearchPropertyComponent_option_138_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](140, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](141, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](142, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](143, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](144, "Tipologia");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](145, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](146, "select", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_146_listener() { return ctx.typologyChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](147, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](148, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](149, SearchPropertyComponent_option_149_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](150, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](151, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](152, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](154, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](155, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](156, "Valor M\u00E1x");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](157, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](158, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](159, "R$");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](160, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](161, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](163, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](164, "Quartos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](165, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](166, "select", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_166_listener() { return ctx.roomChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](167, "option", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](168, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](169, "option", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](170, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](171, "option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](172, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "option", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](174, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](175, "option", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](176, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](177, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](178, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](179, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](180, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](181, "Vagas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](182, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](183, "select", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_183_listener() { return ctx.parkingSpotChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](184, "option", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](185, "0+");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](186, "option", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](187, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](188, "option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](189, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](190, "option", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](191, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](192, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](193, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](194, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](195, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](196, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](197, "Incorporadoras");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](198, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](199, "select", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function SearchPropertyComponent_Template_select_change_199_listener() { return ctx.propertyDeveloperChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](200, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](201, "Todas");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](202, SearchPropertyComponent_option_202_Template, 2, 2, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](203, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](204, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](205, SearchPropertyComponent_app_search_result_205_Template, 1, 1, "app-search-result", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](206, SearchPropertyComponent_div_206_Template, 3, 0, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](207, SearchPropertyComponent_div_207_Template, 4, 0, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](208, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](209, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](210, "p", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](211, "Sal\u00E3o de Im\u00F3veis");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](212, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](213, "div", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](214, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](215, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](216, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](217, "a", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](218, "p", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](219, "1/2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](220, "i", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](221, "p", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](222, "Sal\u00E3o de Im\u00F3veis - Rio de Janeiro");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](223, "p", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](224, "Texto sobre o evento (criar um resumo sobre o evento).");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](225, "div", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](226, "img", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](227, "p", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](228, "span", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](229, " \u00A0\u00A0Via Parque Shopping - Estacionamento ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](230, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](231, "span", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](232, " Avenida Ayrton Senna, 3000, Barra da Tijuca, Rio de Janeiro, RJ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](233, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](234, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](235, "button", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](236, " Saiba mais ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](237, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](238, "img", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](239, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](240, "\u00A0\u00A031/01 a 02/02");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](241, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](242, "img", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](243, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](244, "\u00A0\u00A010h \u00E0s 22h");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](245, "div", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](246, "div", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](247, "div", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](248, "div", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](249, "img", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](250, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](251, "a", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](252, "img", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](253, " \u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](254, "a", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](255, "img", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](256, " \u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](257, "a", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](258, "img", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](259, "p", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](260, "Tel: (21) 98283-0243");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](261, "div", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](262, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](263, "div", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](264, "div", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](265, "div", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](266, "img", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](267, " \u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](268, "p", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](269, "Av. Jos\u00E9 Silva de Azevedo Neto, 200, Bl 2, Sala 403 Barra da Tijuca - Rio de Janeiro / RJ \u2013 CEP: 22775-056");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](270, "div", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](271, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](272, "p", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](273, "ASSINAR");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](274, "p", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](275, "Receba not\u00EDcias e atualiza\u00E7\u00F5es sobre a Crediall por e-mail.");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](276, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](277, "div", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](278, "input", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](279, "button", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](280, "Assinar");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.propertySearchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.states);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.cities);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.districts);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.propertyTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](54);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.propertyDevelopers);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.propertySearchForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.states);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.cities);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.districts);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.propertyTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](53);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.propertyDevelopers);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.gettingPropertiesList && ctx.propertiesList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.gettingPropertiesList && ctx.propertiesList.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.gettingPropertiesList && ctx.propertiesList.length == 0);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _components_search_result_search_result_component__WEBPACK_IMPORTED_MODULE_2__.SearchResultComponent], styles: [".first[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  min-height: 84vh;\r\n}\r\n\r\n.mobile[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n.search-form-field[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  padding-inline: 10px;\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n\r\n  height: 80px;\r\n  color: #012942;\r\n  border: #012942;\r\n  border-width: 1px;\r\n  border-style: solid;\r\n  -webkit-text-decoration: #ffffff;\r\n          text-decoration: #ffffff;\r\n  background-color: transparent;\r\n}\r\n\r\ninput[_ngcontent-%COMP%] {\r\n  border: none;\r\n}\r\n\r\nselect[_ngcontent-%COMP%] {\r\n  border: none;\r\n}\r\n\r\n\r\n\r\n.second[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: rgba(143, 31, 153, 0)\r\n}\r\n\r\n.event-card-left[_ngcontent-%COMP%] {\r\n  height: 400px;\r\n  width: 500px;\r\n  min-width: 15%;\r\n  background-size: cover;\r\n  background-color: #380f91;\r\n  background-position: center; \r\n  background-repeat: no-repeat;\r\n  background-image: url(\"/../../assets/img/property_hall.png\");\r\n}\r\n\r\n.event-card-right[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  min-width: 15%;\r\n  color: #380f91;\r\n  text-align: start;\r\n  background-color: #E0D9C3;\r\n}\r\n\r\n.event-card-right-section[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  margin-top: 10px;\r\n  max-height: 40px;\r\n  min-width: 150px;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n\r\n\r\n.sixth[_ngcontent-%COMP%] {\r\n  height: auto;\r\n  color: #012942;\r\n  background-color: #F5F5F5\r\n}\r\n\r\n#map[_ngcontent-%COMP%] {\r\n  height: 300px;\r\n  width: auto;\r\n  max-width: 600px;\r\n}\r\n\r\n.input-group[_ngcontent-%COMP%] {\r\n  width: auto;\r\n  max-width: 600px;\r\n  background-color: transparent;\r\n}\r\n\r\n\r\n\r\n.title[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-size: 25px;\r\n}\r\n\r\n.sub-title[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-size: 15px;\r\n}\r\n\r\n.small-sub-title[_ngcontent-%COMP%] {\r\n  font-weight: 100;\r\n  font-size: 12px;\r\n}\r\n\r\n.simple-elevated-button[_ngcontent-%COMP%] {\r\n  color: white;\r\n  font-weight: 500;\r\n  background-color: #012942;\r\n}\r\n\r\n.simple-elevated-red-button[_ngcontent-%COMP%] {\r\n  color: white;\r\n  font-weight: 500;\r\n  min-width: 100px;\r\n  background-color: #C30000;\r\n}\r\n\r\n\r\n\r\n@media screen and (max-width: 1160px) {\r\n  .web[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .mobile[_ngcontent-%COMP%] {\r\n    display: flex;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1wcm9wZXJ0eS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxVQUFVOztBQUVWO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsc0JBQXNCO0VBQ3RCLHVCQUF1Qjs7RUFFdkIsWUFBWTtFQUNaLGNBQWM7RUFDZCxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixnQ0FBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQSxZQUFZOztBQUVaO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZDtBQUNGOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLDREQUE0RDtBQUM5RDs7QUFFQTtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2QsY0FBYztFQUNkLGlCQUFpQjtFQUNqQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQSxVQUFVOztBQUVWO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZDtBQUNGOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtBQUMvQjs7QUFFQSxjQUFjOztBQUVkO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUEsZ0JBQWdCOztBQUVoQjtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmO0FBQ0YiLCJmaWxlIjoic2VhcmNoLXByb3BlcnR5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogRklSU1QgKi9cclxuXHJcbi5maXJzdCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG1pbi1oZWlnaHQ6IDg0dmg7XHJcbn1cclxuXHJcbi5tb2JpbGUge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5zZWFyY2gtZm9ybS1maWVsZCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwYWRkaW5nLWlubGluZTogMTBweDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG5cclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgY29sb3I6ICMwMTI5NDI7XHJcbiAgYm9yZGVyOiAjMDEyOTQyO1xyXG4gIGJvcmRlci13aWR0aDogMXB4O1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiAjZmZmZmZmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5pbnB1dCB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG5zZWxlY3Qge1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLyogU0VDT05EICAqL1xyXG5cclxuLnNlY29uZCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjMDEyOTQyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQzLCAzMSwgMTUzLCAwKVxyXG59XHJcblxyXG4uZXZlbnQtY2FyZC1sZWZ0IHtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG4gIHdpZHRoOiA1MDBweDtcclxuICBtaW4td2lkdGg6IDE1JTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODBmOTE7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyBcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi8uLi8uLi9hc3NldHMvaW1nL3Byb3BlcnR5X2hhbGwucG5nXCIpO1xyXG59XHJcblxyXG4uZXZlbnQtY2FyZC1yaWdodCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG1pbi13aWR0aDogMTUlO1xyXG4gIGNvbG9yOiAjMzgwZjkxO1xyXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNFMEQ5QzM7XHJcbn1cclxuXHJcbi5ldmVudC1jYXJkLXJpZ2h0LXNlY3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXgtaGVpZ2h0OiA0MHB4O1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLyogU0lYVEggKi9cclxuXHJcbi5zaXh0aCB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIGNvbG9yOiAjMDEyOTQyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNGNUY1RjVcclxufVxyXG5cclxuI21hcCB7XHJcbiAgaGVpZ2h0OiAzMDBweDtcclxuICB3aWR0aDogYXV0bztcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG59XHJcblxyXG4uaW5wdXQtZ3JvdXAge1xyXG4gIHdpZHRoOiBhdXRvO1xyXG4gIG1heC13aWR0aDogNjAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi8qIFVUSUxJVElFUyAqL1xyXG5cclxuLnRpdGxlIHtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxufVxyXG5cclxuLnN1Yi10aXRsZSB7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuXHJcbi5zbWFsbC1zdWItdGl0bGUge1xyXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uc2ltcGxlLWVsZXZhdGVkLWJ1dHRvbiB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAxMjk0MjtcclxufVxyXG5cclxuLnNpbXBsZS1lbGV2YXRlZC1yZWQtYnV0dG9uIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNDMzAwMDA7XHJcbn1cclxuXHJcbi8qIE1FRElBIFFVRVJZICovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMTYwcHgpIHtcclxuICAud2ViIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAubW9iaWxlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 2998:
/*!*****************************************************!*\
  !*** ./src/app/modules/main/shared/main.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainService": () => (/* binding */ MainService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var src_app_core_services_api_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/core/services/api/api.service */ 8863);



class MainService {
    constructor(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this.api = this.apiService.base_url;
    }
    getPropertyTypes() {
        return this.http.get(`/v1/new-constructions/property-types`);
    }
    getStates() {
        return this.http.get(`/v1/new-constructions/states`);
    }
    getCities(state) {
        return this.http.get(`/v1/new-constructions/cities`, {
            params: {
                'state': state,
            },
        });
    }
    getDistricts(city, state) {
        return this.http.get(`/v1/new-constructions/districts`, {
            params: {
                'city': city,
                'state': state,
            },
        });
    }
    getPropertyDevelopers() {
        return this.http.get(`/v1/new-constructions/property-developers`);
    }
    // getPropertiesList(params: any): Observable<RequestPropertyResult>{
    //   return this.http.get<RequestPropertyResult>(`/v1/new-constructions/q`, {
    //     params: params,
    //   });
    // }
    getPropertiesList(params) {
        return this.http.get(`/v1/new-constructions/q?limit=20&offset=0`);
    }
}
MainService.ɵfac = function MainService_Factory(t) { return new (t || MainService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_core_services_api_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService)); };
MainService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MainService, factory: MainService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8346:
/*!********************************************************!*\
  !*** ./node_modules/@angular/forms/fesm2020/forms.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractControl": () => (/* binding */ AbstractControl),
/* harmony export */   "AbstractControlDirective": () => (/* binding */ AbstractControlDirective),
/* harmony export */   "AbstractFormGroupDirective": () => (/* binding */ AbstractFormGroupDirective),
/* harmony export */   "COMPOSITION_BUFFER_MODE": () => (/* binding */ COMPOSITION_BUFFER_MODE),
/* harmony export */   "CheckboxControlValueAccessor": () => (/* binding */ CheckboxControlValueAccessor),
/* harmony export */   "CheckboxRequiredValidator": () => (/* binding */ CheckboxRequiredValidator),
/* harmony export */   "ControlContainer": () => (/* binding */ ControlContainer),
/* harmony export */   "DefaultValueAccessor": () => (/* binding */ DefaultValueAccessor),
/* harmony export */   "EmailValidator": () => (/* binding */ EmailValidator),
/* harmony export */   "FormArray": () => (/* binding */ FormArray),
/* harmony export */   "FormArrayName": () => (/* binding */ FormArrayName),
/* harmony export */   "FormBuilder": () => (/* binding */ FormBuilder),
/* harmony export */   "FormControl": () => (/* binding */ FormControl),
/* harmony export */   "FormControlDirective": () => (/* binding */ FormControlDirective),
/* harmony export */   "FormControlName": () => (/* binding */ FormControlName),
/* harmony export */   "FormGroup": () => (/* binding */ FormGroup),
/* harmony export */   "FormGroupDirective": () => (/* binding */ FormGroupDirective),
/* harmony export */   "FormGroupName": () => (/* binding */ FormGroupName),
/* harmony export */   "FormsModule": () => (/* binding */ FormsModule),
/* harmony export */   "MaxLengthValidator": () => (/* binding */ MaxLengthValidator),
/* harmony export */   "MaxValidator": () => (/* binding */ MaxValidator),
/* harmony export */   "MinLengthValidator": () => (/* binding */ MinLengthValidator),
/* harmony export */   "MinValidator": () => (/* binding */ MinValidator),
/* harmony export */   "NG_ASYNC_VALIDATORS": () => (/* binding */ NG_ASYNC_VALIDATORS),
/* harmony export */   "NG_VALIDATORS": () => (/* binding */ NG_VALIDATORS),
/* harmony export */   "NG_VALUE_ACCESSOR": () => (/* binding */ NG_VALUE_ACCESSOR),
/* harmony export */   "NgControl": () => (/* binding */ NgControl),
/* harmony export */   "NgControlStatus": () => (/* binding */ NgControlStatus),
/* harmony export */   "NgControlStatusGroup": () => (/* binding */ NgControlStatusGroup),
/* harmony export */   "NgForm": () => (/* binding */ NgForm),
/* harmony export */   "NgModel": () => (/* binding */ NgModel),
/* harmony export */   "NgModelGroup": () => (/* binding */ NgModelGroup),
/* harmony export */   "NgSelectOption": () => (/* binding */ NgSelectOption),
/* harmony export */   "NumberValueAccessor": () => (/* binding */ NumberValueAccessor),
/* harmony export */   "PatternValidator": () => (/* binding */ PatternValidator),
/* harmony export */   "RadioControlValueAccessor": () => (/* binding */ RadioControlValueAccessor),
/* harmony export */   "RangeValueAccessor": () => (/* binding */ RangeValueAccessor),
/* harmony export */   "ReactiveFormsModule": () => (/* binding */ ReactiveFormsModule),
/* harmony export */   "RequiredValidator": () => (/* binding */ RequiredValidator),
/* harmony export */   "SelectControlValueAccessor": () => (/* binding */ SelectControlValueAccessor),
/* harmony export */   "SelectMultipleControlValueAccessor": () => (/* binding */ SelectMultipleControlValueAccessor),
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "Validators": () => (/* binding */ Validators),
/* harmony export */   "ɵInternalFormsSharedModule": () => (/* binding */ ɵInternalFormsSharedModule),
/* harmony export */   "ɵNgNoValidate": () => (/* binding */ ɵNgNoValidate),
/* harmony export */   "ɵNgSelectMultipleOption": () => (/* binding */ ɵNgSelectMultipleOption)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5293);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2354);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2014);
/**
 * @license Angular v13.0.3
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */





/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Base class for all ControlValueAccessor classes defined in Forms package.
 * Contains common logic and utility functions.
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */

class BaseControlValueAccessor {
  constructor(_renderer, _elementRef) {
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    /**
     * The registered callback function called when a change or input event occurs on the input
     * element.
     * @nodoc
     */

    this.onChange = _ => {};
    /**
     * The registered callback function called when a blur event occurs on the input element.
     * @nodoc
     */


    this.onTouched = () => {};
  }
  /**
   * Helper method that sets a property on a target element using the current Renderer
   * implementation.
   * @nodoc
   */


  setProperty(key, value) {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }
  /**
   * Registers a function called when the control is touched.
   * @nodoc
   */


  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */


  registerOnChange(fn) {
    this.onChange = fn;
  }
  /**
   * Sets the "disabled" property on the range input element.
   * @nodoc
   */


  setDisabledState(isDisabled) {
    this.setProperty('disabled', isDisabled);
  }

}

BaseControlValueAccessor.ɵfac = function BaseControlValueAccessor_Factory(t) {
  return new (t || BaseControlValueAccessor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};

BaseControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: BaseControlValueAccessor
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
/**
 * Base class for all built-in ControlValueAccessor classes (except DefaultValueAccessor, which is
 * used in case no other CVAs can be found). We use this class to distinguish between default CVA,
 * built-in CVAs and custom CVAs, so that Forms logic can recognize built-in CVAs and treat custom
 * ones with higher priority (when both built-in and custom CVAs are present).
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */


class BuiltInControlValueAccessor extends BaseControlValueAccessor {}

BuiltInControlValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵBuiltInControlValueAccessor_BaseFactory;
  return function BuiltInControlValueAccessor_Factory(t) {
    return (ɵBuiltInControlValueAccessor_BaseFactory || (ɵBuiltInControlValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](BuiltInControlValueAccessor)))(t || BuiltInControlValueAccessor);
  };
}();

BuiltInControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: BuiltInControlValueAccessor,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BuiltInControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], null, null);
})();
/**
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
 * @publicApi
 */


const NG_VALUE_ACCESSOR = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgValueAccessor');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CheckboxControlValueAccessor),
  multi: true
};
/**
 * @description
 * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
 * element.
 *
 * @usageNotes
 *
 * ### Using a checkbox with a reactive form.
 *
 * The following example shows how to use a checkbox with a reactive form.
 *
 * ```ts
 * const rememberLoginControl = new FormControl();
 * ```
 *
 * ```
 * <input type="checkbox" [formControl]="rememberLoginControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "checked" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    this.setProperty('checked', value);
  }

}

CheckboxControlValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵCheckboxControlValueAccessor_BaseFactory;
  return function CheckboxControlValueAccessor_Factory(t) {
    return (ɵCheckboxControlValueAccessor_BaseFactory || (ɵCheckboxControlValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](CheckboxControlValueAccessor)))(t || CheckboxControlValueAccessor);
  };
}();

CheckboxControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: CheckboxControlValueAccessor,
  selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
  hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.checked);
      })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([CHECKBOX_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CheckboxControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
      host: {
        '(change)': 'onChange($event.target.checked)',
        '(blur)': 'onTouched()'
      },
      providers: [CHECKBOX_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => DefaultValueAccessor),
  multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */

function _isAndroid() {
  const userAgent = (0,_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])() ? (0,_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])().getUserAgent() : '';
  return /android (\d+)/.test(userAgent.toLowerCase());
}
/**
 * @description
 * Provide this token to control if form directives buffer IME input until
 * the "compositionend" event occurs.
 * @publicApi
 */


const COMPOSITION_BUFFER_MODE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('CompositionEventMode');
/**
 * The default `ControlValueAccessor` for writing a value and listening to changes on input
 * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * {@searchKeywords ngDefaultControl}
 *
 * @usageNotes
 *
 * ### Using the default value accessor
 *
 * The following example shows how to use an input element that activates the default value accessor
 * (in this case, a text field).
 *
 * ```ts
 * const firstNameControl = new FormControl();
 * ```
 *
 * ```
 * <input type="text" [formControl]="firstNameControl">
 * ```
 *
 * This value accessor is used by default for `<input type="text">` and `<textarea>` elements, but
 * you could also use it for custom components that have similar behavior and do not require special
 * processing. In order to attach the default value accessor to a custom element, add the
 * `ngDefaultControl` attribute as shown below.
 *
 * ```
 * <custom-input-component ngDefaultControl [(ngModel)]="value"></custom-input-component>
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class DefaultValueAccessor extends BaseControlValueAccessor {
  constructor(renderer, elementRef, _compositionMode) {
    super(renderer, elementRef);
    this._compositionMode = _compositionMode;
    /** Whether the user is creating a composition string (IME events). */

    this._composing = false;

    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */


  writeValue(value) {
    const normalizedValue = value == null ? '' : value;
    this.setProperty('value', normalizedValue);
  }
  /** @internal */


  _handleInput(value) {
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this.onChange(value);
    }
  }
  /** @internal */


  _compositionStart() {
    this._composing = true;
  }
  /** @internal */


  _compositionEnd(value) {
    this._composing = false;
    this._compositionMode && this.onChange(value);
  }

}

DefaultValueAccessor.ɵfac = function DefaultValueAccessor_Factory(t) {
  return new (t || DefaultValueAccessor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](COMPOSITION_BUFFER_MODE, 8));
};

DefaultValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: DefaultValueAccessor,
  selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
  hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
        return ctx._handleInput($event.target.value);
      })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
        return ctx._compositionStart();
      })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
        return ctx._compositionEnd($event.target.value);
      });
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([DEFAULT_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DefaultValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      // TODO: vsavkin replace the above selector with the one below it once
      // https://github.com/angular/angular/issues/3011 is implemented
      // selector: '[ngModel],[formControl],[formControlName]',
      host: {
        '(input)': '$any(this)._handleInput($event.target.value)',
        '(blur)': 'onTouched()',
        '(compositionstart)': '$any(this)._compositionStart()',
        '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
      },
      providers: [DEFAULT_VALUE_ACCESSOR]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [COMPOSITION_BUFFER_MODE]
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function isEmptyInputValue(value) {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function hasValidLength(value) {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}
/**
 * @description
 * An `InjectionToken` for registering additional synchronous validators used with
 * `AbstractControl`s.
 *
 * @see `NG_ASYNC_VALIDATORS`
 *
 * @usageNotes
 *
 * ### Providing a custom validator
 *
 * The following example registers a custom validator directive. Adding the validator to the
 * existing collection of validators requires the `multi: true` option.
 *
 * ```typescript
 * @Directive({
 *   selector: '[customValidator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(control: AbstractControl): ValidationErrors | null {
 *     return { 'custom': true };
 *   }
 * }
 * ```
 *
 * @publicApi
 */


const NG_VALIDATORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgValidators');
/**
 * @description
 * An `InjectionToken` for registering additional asynchronous validators used with
 * `AbstractControl`s.
 *
 * @see `NG_VALIDATORS`
 *
 * @usageNotes
 *
 * ### Provide a custom async validator directive
 *
 * The following example implements the `AsyncValidator` interface to create an
 * async validator directive with a custom error key.
 *
 * ```typescript
 * @Directive({
 *   selector: '[customAsyncValidator]',
 *   providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
 * true}]
 * })
 * class CustomAsyncValidatorDirective implements AsyncValidator {
 *   validate(control: AbstractControl): Promise<ValidationErrors|null> {
 *     return Promise.resolve({'custom': true});
 *   }
 * }
 * ```
 *
 * @publicApi
 */

const NG_ASYNC_VALIDATORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgAsyncValidators');
/**
 * A regular expression that matches valid e-mail addresses.
 *
 * At a high level, this regexp matches e-mail addresses of the format `local-part@tld`, where:
 * - `local-part` consists of one or more of the allowed characters (alphanumeric and some
 *   punctuation symbols).
 * - `local-part` cannot begin or end with a period (`.`).
 * - `local-part` cannot be longer than 64 characters.
 * - `tld` consists of one or more `labels` separated by periods (`.`). For example `localhost` or
 *   `foo.com`.
 * - A `label` consists of one or more of the allowed characters (alphanumeric, dashes (`-`) and
 *   periods (`.`)).
 * - A `label` cannot begin or end with a dash (`-`) or a period (`.`).
 * - A `label` cannot be longer than 63 characters.
 * - The whole address cannot be longer than 254 characters.
 *
 * ## Implementation background
 *
 * This regexp was ported over from AngularJS (see there for git history):
 * https://github.com/angular/angular.js/blob/c133ef836/src/ng/directive/input.js#L27
 * It is based on the
 * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
 * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
 * lengths of different parts of the address). The main differences from the WHATWG version are:
 *   - Disallow `local-part` to begin or end with a period (`.`).
 *   - Disallow `local-part` length to exceed 64 characters.
 *   - Disallow total address length to exceed 254 characters.
 *
 * See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details.
 */

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
 * @description
 * Provides a set of built-in validators that can be used by form controls.
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 * @see [Form Validation](/guide/form-validation)
 *
 * @publicApi
 */

class Validators {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */
  static min(min) {
    return minValidator(min);
  }
  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static max(max) {
    return maxValidator(max);
  }
  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static required(control) {
    return requiredValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ```typescript
   * const control = new FormControl('', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * Tests the value using a [regular
   * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * pattern suitable for common usecases. The pattern is based on the definition of a valid email
   * address in the [WHATWG HTML
   * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address).
   *
   * The differences from the WHATWG version include:
   * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
   * - Disallow `local-part` to be longer than 64 characters.
   * - Disallow the whole address to be longer than 254 characters.
   *
   * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
   * validate the value against a different pattern.
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static email(control) {
    return emailValidator(control);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays. The
   * `minLength` validator logic is also not invoked for values when their `length` property is 0
   * (for example in case of an empty string or an empty array), to support optional controls. You
   * can use the standard `required` validator if empty values should not be considered valid.
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided by default if you use the HTML5 `pattern` attribute.
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * ### Pattern matching with the global or sticky flag
   *
   * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
   * can produce different results on the same input when validations are run consecutively. This is
   * due to how the behavior of `RegExp.prototype.test` is
   * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
   * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
   * Due to this behavior, it is recommended that when using
   * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
   * flag enabled.
   *
   * ```typescript
   * // Not recommended (since the `g` flag is used)
   * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
   *
   * // Good
   * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
   * ```
   *
   * @param pattern A regular expression to be used as is to test the values, or a string.
   * If a string is passed, the `^` character is prepended and the `$` character is
   * appended to the provided string (if not already present), and the resulting regular
   * expression is used to test the values.
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static pattern(pattern) {
    return patternValidator(pattern);
  }
  /**
   * @description
   * Validator that performs no operation.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static nullValidator(control) {
    return nullValidator(control);
  }

  static compose(validators) {
    return compose(validators);
  }
  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static composeAsync(validators) {
    return composeAsync(validators);
  }

}
/**
 * Validator that requires the control's value to be greater than or equal to the provided number.
 * See `Validators.min` for additional information.
 */


function minValidator(min) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min

    return !isNaN(value) && value < min ? {
      'min': {
        'min': min,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to be less than or equal to the provided number.
 * See `Validators.max` for additional information.
 */


function maxValidator(max) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
    // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max

    return !isNaN(value) && value > max ? {
      'max': {
        'max': max,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control have a non-empty value.
 * See `Validators.required` for additional information.
 */


function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    'required': true
  } : null;
}
/**
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 * See `Validators.requiredTrue` for additional information.
 */


function requiredTrueValidator(control) {
  return control.value === true ? null : {
    'required': true
  };
}
/**
 * Validator that requires the control's value pass an email validation test.
 * See `Validators.email` for additional information.
 */


function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }

  return EMAIL_REGEXP.test(control.value) ? null : {
    'email': true
  };
}
/**
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length. See `Validators.minLength` for additional information.
 */


function minLengthValidator(minLength) {
  return control => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return control.value.length < minLength ? {
      'minlength': {
        'requiredLength': minLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length. See `Validators.maxLength` for additional information.
 */


function maxLengthValidator(maxLength) {
  return control => {
    return hasValidLength(control.value) && control.value.length > maxLength ? {
      'maxlength': {
        'requiredLength': maxLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to match a regex pattern.
 * See `Validators.pattern` for additional information.
 */


function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;

  if (typeof pattern === 'string') {
    regexStr = '';
    if (pattern.charAt(0) !== '^') regexStr += '^';
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }

  return control => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = control.value;
    return regex.test(value) ? null : {
      'pattern': {
        'requiredPattern': regexStr,
        'actualValue': value
      }
    };
  };
}
/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */


function nullValidator(control) {
  return null;
}

function isPresent(o) {
  return o != null;
}

function toObservable(r) {
  const obs = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisPromise"])(r) ? (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(r) : r;

  if (!(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisObservable"])(obs) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }

  return obs;
}

function mergeErrors(arrayOfErrors) {
  let res = {}; // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  arrayOfErrors.forEach(errors => {
    res = errors != null ? { ...res,
      ...errors
    } : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}

function executeValidators(control, validators) {
  return validators.map(validator => validator(control));
}

function isValidatorFn(validator) {
  return !validator.validate;
}
/**
 * Given the list of validators that may contain both functions as well as classes, return the list
 * of validator functions (convert validator classes into validator functions). This is needed to
 * have consistent structure in validators list before composing them.
 *
 * @param validators The set of validators that may contain validators both in plain function form
 *     as well as represented as a validator class.
 */


function normalizeValidators(validators) {
  return validators.map(validator => {
    return isValidatorFn(validator) ? validator : c => validator.validate(c);
  });
}
/**
 * Merges synchronous validators into a single validator function.
 * See `Validators.compose` for additional information.
 */


function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
/**
 * Accepts a list of validators of different possible shapes (`Validator` and `ValidatorFn`),
 * normalizes the list (converts everything to `ValidatorFn`) and merges them into a single
 * validator function.
 */


function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
/**
 * Merges asynchronous validators into a single validator function.
 * See `Validators.composeAsync` for additional information.
 */


function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)(observables).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(mergeErrors));
  };
}
/**
 * Accepts a list of async validators of different possible shapes (`AsyncValidator` and
 * `AsyncValidatorFn`), normalizes the list (converts everything to `AsyncValidatorFn`) and merges
 * them into a single validator function.
 */


function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
/**
 * Merges raw control validators with a given directive validator and returns the combined list of
 * validators as an array.
 */


function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
/**
 * Retrieves the list of raw synchronous validators attached to a given control.
 */


function getControlValidators(control) {
  return control._rawValidators;
}
/**
 * Retrieves the list of raw asynchronous validators attached to a given control.
 */


function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
/**
 * Accepts a singleton validator, an array, or null, and returns an array type with the provided
 * validators.
 *
 * @param validators A validator, validators, or null.
 * @returns A validators array.
 */


function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
/**
 * Determines whether a validator or validators array has a given validator.
 *
 * @param validators The validator or validators to compare against.
 * @param validator The validator to check.
 * @returns Whether the validator is present.
 */


function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
/**
 * Combines two arrays of validators into one. If duplicates are provided, only one will be added.
 *
 * @param validators The new validators.
 * @param currentValidators The base array of currrent validators.
 * @returns An array of validators.
 */


function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach(v => {
    // Note: if there are duplicate entries in the new validators array,
    // only the first one would be added to the current list of validarors.
    // Duplicate ones would be ignored since `hasValidator` would detect
    // the presence of a validator function and we update the current list in place.
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}

function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter(v => !hasValidator(validators, v));
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * Base class for control directives.
 *
 * This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.
 *
 * @publicApi
 */


class AbstractControlDirective {
  constructor() {
    /**
     * Set of synchronous validators as they were provided while calling `setValidators` function.
     * @internal
     */
    this._rawValidators = [];
    /**
     * Set of asynchronous validators as they were provided while calling `setAsyncValidators`
     * function.
     * @internal
     */

    this._rawAsyncValidators = [];
    /*
     * The set of callbacks to be invoked when directive instance is being destroyed.
     */

    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Reports the value of the control if it is present, otherwise null.
   */


  get value() {
    return this.control ? this.control.value : null;
  }
  /**
   * @description
   * Reports whether the control is valid. A control is considered valid if no
   * validation errors exist with the current value.
   * If the control is not present, null is returned.
   */


  get valid() {
    return this.control ? this.control.valid : null;
  }
  /**
   * @description
   * Reports whether the control is invalid, meaning that an error exists in the input value.
   * If the control is not present, null is returned.
   */


  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  /**
   * @description
   * Reports whether a control is pending, meaning that that async validation is occurring and
   * errors are not yet available for the input value. If the control is not present, null is
   * returned.
   */


  get pending() {
    return this.control ? this.control.pending : null;
  }
  /**
   * @description
   * Reports whether the control is disabled, meaning that the control is disabled
   * in the UI and is exempt from validation checks and excluded from aggregate
   * values of ancestor controls. If the control is not present, null is returned.
   */


  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  /**
   * @description
   * Reports whether the control is enabled, meaning that the control is included in ancestor
   * calculations of validity or value. If the control is not present, null is returned.
   */


  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  /**
   * @description
   * Reports the control's validation errors. If the control is not present, null is returned.
   */


  get errors() {
    return this.control ? this.control.errors : null;
  }
  /**
   * @description
   * Reports whether the control is pristine, meaning that the user has not yet changed
   * the value in the UI. If the control is not present, null is returned.
   */


  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  /**
   * @description
   * Reports whether the control is dirty, meaning that the user has changed
   * the value in the UI. If the control is not present, null is returned.
   */


  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  /**
   * @description
   * Reports whether the control is touched, meaning that the user has triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */


  get touched() {
    return this.control ? this.control.touched : null;
  }
  /**
   * @description
   * Reports the validation status of the control. Possible values include:
   * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
   * If the control is not present, null is returned.
   */


  get status() {
    return this.control ? this.control.status : null;
  }
  /**
   * @description
   * Reports whether the control is untouched, meaning that the user has not yet triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */


  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  /**
   * @description
   * Returns a multicasting observable that emits a validation status whenever it is
   * calculated for the control. If the control is not present, null is returned.
   */


  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  /**
   * @description
   * Returns a multicasting observable of value changes for the control that emits every time the
   * value of the control changes in the UI or programmatically.
   * If the control is not present, null is returned.
   */


  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */


  get path() {
    return null;
  }
  /**
   * Sets synchronous validators for this directive.
   * @internal
   */


  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  /**
   * Sets asynchronous validators for this directive.
   * @internal
   */


  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  /**
   * @description
   * Synchronous validator function composed of all the synchronous validators registered with this
   * directive.
   */


  get validator() {
    return this._composedValidatorFn || null;
  }
  /**
   * @description
   * Asynchronous validator function composed of all the asynchronous validators registered with
   * this directive.
   */


  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  /**
   * Internal function to register callbacks that should be invoked
   * when directive instance is being destroyed.
   * @internal
   */


  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  /**
   * Internal function to invoke all registered "on destroy" callbacks.
   * Note: calling this function also clears the list of callbacks.
   * @internal
   */


  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach(fn => fn());

    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Resets the control with the provided value if the control is present.
   */


  reset(value = undefined) {
    if (this.control) this.control.reset(value);
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */


  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */


  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * A base class for directives that contain multiple registered instances of `NgControl`.
 * Only used by the forms module.
 *
 * @publicApi
 */


class ControlContainer extends AbstractControlDirective {
  /**
   * @description
   * The top-level form directive for the control.
   */
  get formDirective() {
    return null;
  }
  /**
   * @description
   * The path to this group.
   */


  get path() {
    return null;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
 * object to a DOM element.
 *
 * @publicApi
 */


class NgControl extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    /**
     * @description
     * The parent form for the control.
     *
     * @internal
     */

    this._parent = null;
    /**
     * @description
     * The name for the control
     */

    this.name = null;
    /**
     * @description
     * The value accessor for the control
     */

    this.valueAccessor = null;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


class AbstractControlStatus {
  constructor(cd) {
    this._cd = cd;
  }

  is(status) {
    // Currently with ViewEngine (in AOT mode) it's not possible to use private methods in host
    // bindings.
    // TODO: once ViewEngine is removed, this function should be refactored:
    //  - make the `is` method `protected`, so it's not accessible publicly
    //  - move the `submitted` status logic to the `NgControlStatusGroup` class
    //    and make it `private` or `protected` too.
    if (status === 'submitted') {
      // We check for the `submitted` field from `NgForm` and `FormGroupDirective` classes, but
      // we avoid instanceof checks to prevent non-tree-shakable references to those types.
      return !!this._cd?.submitted;
    }

    return !!this._cd?.control?.[status];
  }

}

const ngControlStatusHost = {
  '[class.ng-untouched]': 'is("untouched")',
  '[class.ng-touched]': 'is("touched")',
  '[class.ng-pristine]': 'is("pristine")',
  '[class.ng-dirty]': 'is("dirty")',
  '[class.ng-valid]': 'is("valid")',
  '[class.ng-invalid]': 'is("invalid")',
  '[class.ng-pending]': 'is("pending")'
};
const ngGroupStatusHost = {
  '[class.ng-untouched]': 'is("untouched")',
  '[class.ng-touched]': 'is("touched")',
  '[class.ng-pristine]': 'is("pristine")',
  '[class.ng-dirty]': 'is("dirty")',
  '[class.ng-valid]': 'is("valid")',
  '[class.ng-invalid]': 'is("invalid")',
  '[class.ng-pending]': 'is("pending")',
  '[class.ng-submitted]': 'is("submitted")'
};
/**
 * @description
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status.
 *
 * @usageNotes
 *
 * ### CSS classes applied
 *
 * The following classes are applied as the properties become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class NgControlStatus extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }

}

NgControlStatus.ɵfac = function NgControlStatus_Factory(t) {
  return new (t || NgControlStatus)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgControl, 2));
};

NgControlStatus.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgControlStatus,
  selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
  hostVars: 14,
  hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-untouched", ctx.is("untouched"))("ng-touched", ctx.is("touched"))("ng-pristine", ctx.is("pristine"))("ng-dirty", ctx.is("dirty"))("ng-valid", ctx.is("valid"))("ng-invalid", ctx.is("invalid"))("ng-pending", ctx.is("pending"));
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgControlStatus, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formControlName],[ngModel],[formControl]',
      host: ngControlStatusHost
    }]
  }], function () {
    return [{
      type: NgControl,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }]
    }];
  }, null);
})();
/**
 * @description
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc). On groups, this includes the additional
 * class ng-submitted.
 *
 * @see `NgControlStatus`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class NgControlStatusGroup extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }

}

NgControlStatusGroup.ɵfac = function NgControlStatusGroup_Factory(t) {
  return new (t || NgControlStatusGroup)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 10));
};

NgControlStatusGroup.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgControlStatusGroup,
  selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
  hostVars: 16,
  hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-untouched", ctx.is("untouched"))("ng-touched", ctx.is("touched"))("ng-pristine", ctx.is("pristine"))("ng-dirty", ctx.is("dirty"))("ng-valid", ctx.is("valid"))("ng-invalid", ctx.is("invalid"))("ng-pending", ctx.is("pending"))("ng-submitted", ctx.is("submitted"));
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgControlStatusGroup, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
      host: ngGroupStatusHost
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
const formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
const formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
const ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
const ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

function controlParentException() {
  return new Error(`formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formControlNameExample}`);
}

function ngModelGroupException() {
  return new Error(`formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}

function missingFormException() {
  return new Error(`formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}

function groupParentException() {
  return new Error(`formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}

function arrayParentException() {
  return new Error(`formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}

const disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });
`;

function ngModelWarning(directiveName) {
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName'}#use-with-ngmodel
  `;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function controlPath(name, parent) {
  return [...parent.path, name];
}
/**
 * Links a Form control and a Form directive by setting up callbacks (such as `onChange`) on both
 * instances. This function is typically invoked when form directive is being initialized.
 *
 * @param control Form control instance that should be linked.
 * @param dir Directive that should be linked with a given control.
 */


function setUpControl(control, dir) {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    if (!control) _throwError(dir, 'Cannot find control with');
    if (!dir.valueAccessor) _throwError(dir, 'No value accessor for form control with');
  }

  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
/**
 * Reverts configuration performed by the `setUpControl` control function.
 * Effectively disconnects form control with a given form directive.
 * This function is typically invoked when corresponding form directive is being destroyed.
 *
 * @param control Form control which should be cleaned up.
 * @param dir Directive that should be disconnected from a given control.
 * @param validateControlPresenceOnChange Flag that indicates whether onChange handler should
 *     contain asserts to verify that it's not called once directive is destroyed. We need this flag
 *     to avoid potentially breaking changes caused by better control cleanup introduced in #39235.
 */


function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      _noControlError(dir);
    }
  }; // The `valueAccessor` field is typically defined on FromControl and FormControlName directive
  // instances and there is a logic in `selectValueAccessor` function that throws if it's not the
  // case. We still check the presence of `valueAccessor` before invoking its methods to make sure
  // that cleanup works correctly if app code or tests are setup to ignore the error thrown from
  // `selectValueAccessor`. See https://github.com/angular/angular/issues/40521.


  if (dir.valueAccessor) {
    dir.valueAccessor.registerOnChange(noop);
    dir.valueAccessor.registerOnTouched(noop);
  }

  cleanUpValidators(control, dir);

  if (control) {
    dir._invokeOnDestroyCallbacks();

    control._registerOnCollectionChange(() => {});
  }
}

function registerOnValidatorChange(validators, onChange) {
  validators.forEach(validator => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
/**
 * Sets up disabled change handler function on a given form control if ControlValueAccessor
 * associated with a given directive instance supports the `setDisabledState` call.
 *
 * @param control Form control where disabled change handler should be setup.
 * @param dir Corresponding directive instance associated with this control.
 */


function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = isDisabled => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };

    control.registerOnDisabledChange(onDisabledChange); // Register a callback function to cleanup disabled change handler
    // from a control instance when a directive is destroyed.

    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
/**
 * Sets up sync and async directive validators on provided form control.
 * This function merges validators from the directive into the validators of the control.
 *
 * @param control Form control where directive validators should be setup.
 * @param dir Directive instance that contains validators to be setup.
 */


function setUpValidators(control, dir) {
  const validators = getControlValidators(control);

  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === 'function') {
    // If sync validators are represented by a single validator function, we force the
    // `Validators.compose` call to happen by executing the `setValidators` function with
    // an array that contains that function. We need this to avoid possible discrepancies in
    // validators behavior, so sync validators are always processed by the `Validators.compose`.
    // Note: we should consider moving this logic inside the `setValidators` function itself, so we
    // have consistent behavior on AbstractControl API level. The same applies to the async
    // validators logic below.
    control.setValidators([validators]);
  }

  const asyncValidators = getControlAsyncValidators(control);

  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === 'function') {
    control.setAsyncValidators([asyncValidators]);
  } // Re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4


  const onValidatorChange = () => control.updateValueAndValidity();

  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
/**
 * Cleans up sync and async directive validators on provided form control.
 * This function reverts the setup performed by the `setUpValidators` function, i.e.
 * removes directive-specific validators from a given control instance.
 *
 * @param control Form control from where directive validators should be removed.
 * @param dir Directive instance that contains validators to be removed.
 * @returns true if a control was updated as a result of this action.
 */


function cleanUpValidators(control, dir) {
  let isControlUpdated = false;

  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);

      if (Array.isArray(validators) && validators.length > 0) {
        // Filter out directive validator function.
        const updatedValidators = validators.filter(validator => validator !== dir.validator);

        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }

    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);

      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        // Filter out directive async validator function.
        const updatedAsyncValidators = asyncValidators.filter(asyncValidator => asyncValidator !== dir.asyncValidator);

        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  } // Clear onValidatorChange callbacks by providing a noop function.


  const noop = () => {};

  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}

function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange(newValue => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === 'change') updateControl(control, dir);
  });
}

function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === 'blur' && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== 'submit') control.markAsTouched();
  });
}

function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}

function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    // control -> view
    dir.valueAccessor.writeValue(newValue); // control -> ngModel

    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };

  control.registerOnChange(onChange); // Register a callback function to cleanup onChange handler
  // from a control instance when a directive is destroyed.

  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
/**
 * Links a FormGroup or FormArray instance and corresponding Form directive by setting up validators
 * present in the view.
 *
 * @param control FormGroup or FormArray instance that should be linked.
 * @param dir Directive that provides view validators.
 */


function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'Cannot find control with');
  setUpValidators(control, dir);
}
/**
 * Reverts the setup performed by the `setUpFormContainer` function.
 *
 * @param control FormGroup or FormArray instance that should be cleaned up.
 * @param dir Directive that provided view validators.
 * @returns true if a control was updated as a result of this action.
 */


function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}

function _noControlError(dir) {
  return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}

function _throwError(dir, message) {
  let messageEnd;

  if (dir.path.length > 1) {
    messageEnd = `path: '${dir.path.join(' -> ')}'`;
  } else if (dir.path[0]) {
    messageEnd = `name: '${dir.path}'`;
  } else {
    messageEnd = 'unspecified name attribute';
  }

  throw new Error(`${message} ${messageEnd}`);
}

function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty('model')) return false;
  const change = changes['model'];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}

function isBuiltInAccessor(valueAccessor) {
  // Check if a given value accessor is an instance of a class that directly extends
  // `BuiltInControlValueAccessor` one.
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}

function syncPendingControls(form, directives) {
  form._syncPendingControls();

  directives.forEach(dir => {
    const control = dir.control;

    if (control.updateOn === 'submit' && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
} // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented


function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'Value accessor was not provided as an array for form control with');
  let defaultAccessor = undefined;
  let builtinAccessor = undefined;
  let customAccessor = undefined;
  valueAccessors.forEach(v => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one built-in value accessor matches form control with');
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one custom value accessor matches form control with');
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;

  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    _throwError(dir, 'No valid value accessor for form control with');
  }

  return null;
}

function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
} // TODO(kara): remove after deprecation period


function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === 'never') return;

  if ((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce || warningConfig === 'always' && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Reports that a FormControl is valid, meaning that no errors exist in the input value.
 *
 * @see `status`
 */


const VALID = 'VALID';
/**
 * Reports that a FormControl is invalid, meaning that an error exists in the input value.
 *
 * @see `status`
 */

const INVALID = 'INVALID';
/**
 * Reports that a FormControl is pending, meaning that that async validation is occurring and
 * errors are not yet available for the input value.
 *
 * @see `markAsPending`
 * @see `status`
 */

const PENDING = 'PENDING';
/**
 * Reports that a FormControl is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 *
 * @see `markAsDisabled`
 * @see `status`
 */

const DISABLED = 'DISABLED';

function _find(control, path, delimiter) {
  if (path == null) return null;

  if (!Array.isArray(path)) {
    path = path.split(delimiter);
  }

  if (Array.isArray(path) && path.length === 0) return null; // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  let controlToFind = control;
  path.forEach(name => {
    if (controlToFind instanceof FormGroup) {
      controlToFind = controlToFind.controls.hasOwnProperty(name) ? controlToFind.controls[name] : null;
    } else if (controlToFind instanceof FormArray) {
      controlToFind = controlToFind.at(name) || null;
    } else {
      controlToFind = null;
    }
  });
  return controlToFind;
}
/**
 * Gets validators from either an options object or given validators.
 */


function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
/**
 * Creates validator function by combining provided validators.
 */


function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
/**
 * Gets async validators from either an options object or given validators.
 */


function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
/**
 * Creates async validator function by combining provided async validators.
 */


function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}

function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
}
/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * @see [Forms Guide](/guide/forms)
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 * @see [Dynamic Forms Guide](/guide/dynamic-form)
 *
 * @publicApi
 */


class AbstractControl {
  /**
   * Initialize the AbstractControl instance.
   *
   * @param validators The function or array of functions that is used to determine the validity of
   *     this control synchronously.
   * @param asyncValidators The function or array of functions that is used to determine validity of
   *     this control asynchronously.
   */
  constructor(validators, asyncValidators) {
    /** @internal */
    this._pendingDirty = false;
    /**
     * Indicates that a control has its own pending asynchronous validation in progress.
     *
     * @internal
     */

    this._hasOwnPendingAsyncValidator = false;
    /** @internal */

    this._pendingTouched = false;
    /** @internal */

    this._onCollectionChange = () => {};

    this._parent = null;
    /**
     * A control is `pristine` if the user has not yet changed
     * the value in the UI.
     *
     * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
     * Programmatic changes to a control's value do not mark it dirty.
     */

    this.pristine = true;
    /**
     * True if the control is marked as `touched`.
     *
     * A control is marked `touched` once the user has triggered
     * a `blur` event on it.
     */

    this.touched = false;
    /** @internal */

    this._onDisabledChange = [];
    this._rawValidators = validators;
    this._rawAsyncValidators = asyncValidators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
  /**
   * Returns the function that is used to determine the validity of this control synchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */


  get validator() {
    return this._composedValidatorFn;
  }

  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  /**
   * Returns the function that is used to determine the validity of this control asynchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */


  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }

  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  /**
   * The parent control.
   */


  get parent() {
    return this._parent;
  }
  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */


  get valid() {
    return this.status === VALID;
  }
  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */


  get invalid() {
    return this.status === INVALID;
  }
  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */


  get pending() {
    return this.status == PENDING;
  }
  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   */


  get disabled() {
    return this.status === DISABLED;
  }
  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * @see {@link AbstractControl.status}
   *
   */


  get enabled() {
    return this.status !== DISABLED;
  }
  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   */


  get dirty() {
    return !this.pristine;
  }
  /**
   * True if the control has not been marked as touched
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   */


  get untouched() {
    return !this.touched;
  }
  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */


  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
  }
  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing synchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addValidators()` method instead.
   */


  setValidators(validators) {
    this._rawValidators = validators;
    this._composedValidatorFn = coerceToValidator(validators);
  }
  /**
   * Sets the asynchronous validators that are active on this control. Calling this
   * overwrites any existing asynchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addAsyncValidators()` method instead.
   */


  setAsyncValidators(validators) {
    this._rawAsyncValidators = validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(validators);
  }
  /**
   * Add a synchronous validator or validators to this control, without affecting other validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect. If duplicate validator functions
   * are present in the `validators` array, only the first instance would be added to a form
   * control.
   *
   * @param validators The new validator function or functions to add to this control.
   */


  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  /**
   * Add an asynchronous validator or validators to this control, without affecting other
   * validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect.
   *
   * @param validators The new asynchronous validator function or functions to add to this control.
   */


  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Remove a synchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found,
   * it is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The validator or validators to remove.
   */


  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  /**
   * Remove an asynchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found, it
   * is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The asynchronous validator or validators to remove.
   */


  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Check whether a synchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The validator to check for presence. Compared by function reference.
   * @returns Whether the provided validator was found on this control.
   */


  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  /**
   * Check whether an asynchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The asynchronous validator to check for presence. Compared by function
   *     reference.
   * @returns Whether the provided asynchronous validator was found on this control.
   */


  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  /**
   * Empties out the synchronous validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */


  clearValidators() {
    this.validator = null;
  }
  /**
   * Empties out the async validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */


  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  /**
   * Marks the control as `touched`. A control is touched by focus and
   * blur events that do not change the value.
   *
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsTouched(opts = {}) {
    this.touched = true;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }
  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see `markAsTouched()`
   */


  markAllAsTouched() {
    this.markAsTouched({
      onlySelf: true
    });

    this._forEachChild(control => control.markAllAsTouched());
  }
  /**
   * Marks the control as `untouched`.
   *
   * If the control has any children, also marks all children as `untouched`
   * and recalculates the `touched` status of all parent controls.
   *
   * @see `markAsTouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after the marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsUntouched(opts = {}) {
    this.touched = false;
    this._pendingTouched = false;

    this._forEachChild(control => {
      control.markAsUntouched({
        onlySelf: true
      });
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /**
   * Marks the control as `dirty`. A control becomes dirty when
   * the control's value is changed through the UI; compare `markAsTouched`.
   *
   * @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsDirty(opts = {}) {
    this.pristine = false;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(opts);
    }
  }
  /**
   * Marks the control as `pristine`.
   *
   * If the control has any children, marks all children as `pristine`,
   * and recalculates the `pristine` status of all parent
   * controls.
   *
   * @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   *
   * @param opts Configuration options that determine how the control emits events after
   * marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsPristine(opts = {}) {
    this.pristine = true;
    this._pendingDirty = false;

    this._forEachChild(control => {
      control.markAsPristine({
        onlySelf: true
      });
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /**
   * Marks the control as `pending`.
   *
   * A control is pending while the control performs async validation.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates changes and
   * emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event with the latest status the control is marked pending.
   * When false, no events are emitted.
   *
   */


  markAsPending(opts = {}) {
    this.status = PENDING;

    if (opts.emitEvent !== false) {
      this.statusChanges.emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(opts);
    }
  }
  /**
   * Disables the control. This means the control is exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * If the control has children, all children are also disabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control is disabled.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is disabled.
   * When false, no events are emitted.
   */


  disable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    this.status = DISABLED;
    this.errors = null;

    this._forEachChild(control => {
      control.disable({ ...opts,
        onlySelf: true
      });
    });

    this._updateValue();

    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }

    this._updateAncestors({ ...opts,
      skipPristineCheck
    });

    this._onDisabledChange.forEach(changeFn => changeFn(true));
  }
  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * By default, if the control has children, all children are enabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   */


  enable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    this.status = VALID;

    this._forEachChild(control => {
      control.enable({ ...opts,
        onlySelf: true
      });
    });

    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });

    this._updateAncestors({ ...opts,
      skipPristineCheck
    });

    this._onDisabledChange.forEach(changeFn => changeFn(false));
  }

  _updateAncestors(opts) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);

      if (!opts.skipPristineCheck) {
        this._parent._updatePristine();
      }

      this._parent._updateTouched();
    }
  }
  /**
   * @param parent Sets the parent of the control
   */


  setParent(parent) {
    this._parent = parent;
  }
  /**
   * Recalculates the value and validation status of the control.
   *
   * By default, it also updates the value and validity of its ancestors.
   *
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   * * `onlySelf`: When true, only update this control. When false or not supplied,
   * update all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is updated.
   * When false, no events are emitted.
   */


  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();

    this._updateValue();

    if (this.enabled) {
      this._cancelExistingSubscription();

      this.errors = this._runValidator();
      this.status = this._calculateStatus();

      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }

    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
    }
  }
  /** @internal */


  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild(ctrl => ctrl._updateTreeValidity(opts));

    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }

  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }

  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }

  _runAsyncValidator(emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe(errors => {
        this._hasOwnPendingAsyncValidator = false; // This will trigger the recalculation of the validation status, which depends on
        // the state of the asynchronous validation (whether it is in progress or not). So, it is
        // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.

        this.setErrors(errors, {
          emitEvent
        });
      });
    }
  }

  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();

      this._hasOwnPendingAsyncValidator = false;
    }
  }
  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   *
   * Calling `setErrors` also updates the validity of the parent control.
   *
   * @usageNotes
   *
   * ### Manually set the errors for a control
   *
   * ```
   * const login = new FormControl('someLogin');
   * login.setErrors({
   *   notUnique: true
   * });
   *
   * expect(login.valid).toEqual(false);
   * expect(login.errors).toEqual({ notUnique: true });
   *
   * login.setValue('someOtherLogin');
   *
   * expect(login.valid).toEqual(true);
   * ```
   */


  setErrors(errors, opts = {}) {
    this.errors = errors;

    this._updateControlsErrors(opts.emitEvent !== false);
  }
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name']);`
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */


  get(path) {
    return _find(this, path, '.');
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */


  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */


  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  /**
   * Retrieves the top-level ancestor of this control.
   */


  get root() {
    let x = this;

    while (x._parent) {
      x = x._parent;
    }

    return x;
  }
  /** @internal */


  _updateControlsErrors(emitEvent) {
    this.status = this._calculateStatus();

    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }

    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent);
    }
  }
  /** @internal */


  _initObservables() {
    this.valueChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.statusChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }

  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  /** @internal */


  _anyControlsHaveStatus(status) {
    return this._anyControls(control => control.status === status);
  }
  /** @internal */


  _anyControlsDirty() {
    return this._anyControls(control => control.dirty);
  }
  /** @internal */


  _anyControlsTouched() {
    return this._anyControls(control => control.touched);
  }
  /** @internal */


  _updatePristine(opts = {}) {
    this.pristine = !this._anyControlsDirty();

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /** @internal */


  _updateTouched(opts = {}) {
    this.touched = this._anyControlsTouched();

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /** @internal */


  _isBoxedValue(formState) {
    return typeof formState === 'object' && formState !== null && Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
  }
  /** @internal */


  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  /** @internal */


  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */


  _parentMarkedDirty(onlySelf) {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
  }

}
/**
 * Tracks the value and validation status of an individual form control.
 *
 * This is one of the three fundamental building blocks of Angular forms, along with
 * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
 * implements most of the base functionality for accessing the value, validation status,
 * user interactions and events. See [usage examples below](#usage-notes).
 *
 * @see `AbstractControl`
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see [Usage Notes](#usage-notes)
 *
 * @usageNotes
 *
 * ### Initializing Form Controls
 *
 * Instantiate a `FormControl`, with an initial value.
 *
 * ```ts
 * const control = new FormControl('some value');
 * console.log(control.value);     // 'some value'
 *```
 *
 * The following example initializes the control with a form state object. The `value`
 * and `disabled` keys are required in this case.
 *
 * ```ts
 * const control = new FormControl({ value: 'n/a', disabled: true });
 * console.log(control.value);     // 'n/a'
 * console.log(control.status);    // 'DISABLED'
 * ```
 *
 * The following example initializes the control with a synchronous validator.
 *
 * ```ts
 * const control = new FormControl('', Validators.required);
 * console.log(control.value);      // ''
 * console.log(control.status);     // 'INVALID'
 * ```
 *
 * The following example initializes the control using an options object.
 *
 * ```ts
 * const control = new FormControl('', {
 *    validators: Validators.required,
 *    asyncValidators: myAsyncValidator
 * });
 * ```
 *
 * ### Configure the control to update on a blur event
 *
 * Set the `updateOn` option to `'blur'` to update on the blur `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'blur' });
 * ```
 *
 * ### Configure the control to update on a submit event
 *
 * Set the `updateOn` option to `'submit'` to update on a submit `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'submit' });
 * ```
 *
 * ### Reset the control back to an initial value
 *
 * You reset to a specific form state by passing through a standalone
 * value or a form state object that contains both a value and a disabled state
 * (these are the only two properties that cannot be calculated).
 *
 * ```ts
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 *
 * control.reset('Drew');
 *
 * console.log(control.value); // 'Drew'
 * ```
 *
 * ### Reset the control back to an initial value and disabled
 *
 * ```
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 * console.log(control.status); // 'VALID'
 *
 * control.reset({ value: 'Drew', disabled: true });
 *
 * console.log(control.value); // 'Drew'
 * console.log(control.status); // 'DISABLED'
 * ```
 *
 * @publicApi
 */


class FormControl extends AbstractControl {
  /**
   * Creates a new `FormControl` instance.
   *
   * @param formState Initializes the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    /** @internal */

    this._onChange = [];

    this._applyFormState(formState);

    this._setUpdateStrategy(validatorOrOpts);

    this._initObservables();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Sets a new value for the form control.
   *
   * @param value The new value for the control.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
   * `onChange` event to
   * update the view.
   * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
   * `ngModelChange`
   * event to update the model.
   *
   */


  setValue(value, options = {}) {
    this.value = this._pendingValue = value;

    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach(changeFn => changeFn(this.value, options.emitViewToModelChange !== false));
    }

    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of a control.
   *
   * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
   * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
   * `FormArrays`, where it does behave differently.
   *
   * @see `setValue` for options
   */


  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  /**
   * Resets the form control, marking it `pristine` and `untouched`, and setting
   * the value to null.
   *
   * @param formState Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   *
   */


  reset(formState = null, options = {}) {
    this._applyFormState(formState);

    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }
  /**
   * @internal
   */


  _updateValue() {}
  /**
   * @internal
   */


  _anyControls(condition) {
    return false;
  }
  /**
   * @internal
   */


  _allControlsDisabled() {
    return this.disabled;
  }
  /**
   * Register a listener for change events.
   *
   * @param fn The method that is called when the value changes
   */


  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  /**
   * Internal function to unregister a change events listener.
   * @internal
   */


  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  /**
   * Register a listener for disabled events.
   *
   * @param fn The method that is called when the disabled status changes.
   */


  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  /**
   * Internal function to unregister a disabled event listener.
   * @internal
   */


  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  /**
   * @internal
   */


  _forEachChild(cb) {}
  /** @internal */


  _syncPendingControls() {
    if (this.updateOn === 'submit') {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();

      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }

    return false;
  }

  _applyFormState(formState) {
    if (this._isBoxedValue(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }

}
/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormArray`.
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 *
 * @publicApi
 */


class FormGroup extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;

    this._initObservables();

    this._setUpdateStrategy(validatorOrOpts);

    this._setUpControls();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
      // so we set `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Registers a control with the group's list of controls.
   *
   * This method does not update the value or validity of the control.
   * Use {@link FormGroup#addControl addControl} instead.
   *
   * @param name The control name to register in the collection
   * @param control Provides the control for the given name
   */


  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);

    control._registerOnCollectionChange(this._onCollectionChange);

    return control;
  }
  /**
   * Add a control to this group.
   *
   * If a control with a given name already exists, it would *not* be replaced with a new one.
   * If you want to replace an existing control, use the {@link FormGroup#setControl setControl}
   * method instead. This method also updates the value and validity of the control.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   * @param options Specifies whether this FormGroup instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * added. When false, no events are emitted.
   */


  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Remove a control from this group.
   *
   * This method also updates the value and validity of the control.
   *
   * @param name The control name to remove from the collection
   * @param options Specifies whether this FormGroup instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */


  removeControl(name, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Replace an existing control.
   *
   * If a control with a given name does not exist in this `FormGroup`, it will be added.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   * @param options Specifies whether this FormGroup instance should emit events after an
   *     existing control is replaced.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */


  setControl(name, control, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Check whether there is an enabled control with the given name in the group.
   *
   * Reports false for disabled controls. If you'd like to check for existence in the group
   * only, use {@link AbstractControl#get get} instead.
   *
   * @param controlName The control name to check for existence in the collection
   *
   * @returns false for disabled controls, true otherwise.
   */


  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * @usageNotes
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */


  setValue(value, options = {}) {
    this._checkAllValuesPresent(value);

    Object.keys(value).forEach(name => {
      this._throwIfControlMissing(name);

      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */


  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values, so
    // we just ignore such cases when a field containing FormGroup instance receives `null` or
    // `undefined` as a value.
    if (value == null
    /* both `null` and `undefined` */
    ) return;
    Object.keys(value).forEach(name => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
   * the value of all descendants to null.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(form.value);  // {last: 'last'}
   * console.log(form.get('first').status);  // 'DISABLED'
   * ```
   */


  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });

    this._updatePristine(options);

    this._updateTouched(options);

    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   * The `value` property is the best way to get the value of the group, because
   * it excludes disabled controls in the `FormGroup`.
   */


  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control instanceof FormControl ? control.value : control.getRawValue();
      return acc;
    });
  }
  /** @internal */


  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });

    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */


  _throwIfControlMissing(name) {
    if (!Object.keys(this.controls).length) {
      throw new Error(`
        There are no form controls registered with this group yet. If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }

    if (!this.controls[name]) {
      throw new Error(`Cannot find form control with name: ${name}.`);
    }
  }
  /** @internal */


  _forEachChild(cb) {
    Object.keys(this.controls).forEach(key => {
      // The list of controls can change (for ex. controls might be removed) while the loop
      // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
      // have to null check before invoking the callback.
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  /** @internal */


  _setUpControls() {
    this._forEachChild(control => {
      control.setParent(this);

      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  /** @internal */


  _updateValue() {
    this.value = this._reduceValue();
  }
  /** @internal */


  _anyControls(condition) {
    for (const controlName of Object.keys(this.controls)) {
      const control = this.controls[controlName];

      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }

    return false;
  }
  /** @internal */


  _reduceValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      if (control.enabled || this.disabled) {
        acc[name] = control.value;
      }

      return acc;
    });
  }
  /** @internal */


  _reduceChildren(initValue, fn) {
    let res = initValue;

    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });

    return res;
  }
  /** @internal */


  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }

    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  /** @internal */


  _checkAllValuesPresent(value) {
    this._forEachChild((control, name) => {
      if (value[name] === undefined) {
        throw new Error(`Must supply a value for form control with name: '${name}'.`);
      }
    });
  }

}
/**
 * Tracks the value and validity state of an array of `FormControl`,
 * `FormGroup` or `FormArray` instances.
 *
 * A `FormArray` aggregates the values of each child `FormControl` into an array.
 * It calculates its status by reducing the status values of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormGroup`.
 *
 * @usageNotes
 *
 * ### Create an array of form controls
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * ### Create a form array with array-level validators
 *
 * You include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * The two types of validators are passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * ### Set the updateOn property for all controls in a form array
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const arr = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls from a form array
 *
 * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that result in strange and unexpected behavior such
 * as broken change detection.
 *
 * @publicApi
 */


class FormArray extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;

    this._initObservables();

    this._setUpdateStrategy(validatorOrOpts);

    this._setUpControls();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */


  at(index) {
    return this.controls[index];
  }
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */


  push(control, options = {}) {
    this.controls.push(control);

    this._registerControl(control);

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is inserted.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */


  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);

    this._registerControl(control);

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   * @param options Specifies whether this FormArray instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */


  removeAt(index, options = {}) {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   * @param options Specifies whether this FormArray instance should emit events after an
   *     existing control is replaced with a new one.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */


  setControl(index, control, options = {}) {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);

    if (control) {
      this.controls.splice(index, 0, control);

      this._registerControl(control);
    }

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Length of the control array.
   */


  get length() {
    return this.controls.length;
  }
  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * @usageNotes
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */


  setValue(value, options = {}) {
    this._checkAllValuesPresent(value);

    value.forEach((newValue, index) => {
      this._throwIfControlMissing(index);

      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * @usageNotes
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */


  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values, so
    // we just ignore such cases when a field containing FormArray instance receives `null` or
    // `undefined` as a value.
    if (value == null
    /* both `null` and `undefined` */
    ) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * @usageNotes
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(arr.value);  // ['last']
   * console.log(arr.at(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */


  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });

    this._updatePristine(options);

    this._updateTouched(options);

    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   * For enabled controls only, the `value` property is the best way to get the value of the array.
   */


  getRawValue() {
    return this.controls.map(control => {
      return control instanceof FormControl ? control.value : control.getRawValue();
    });
  }
  /**
   * Remove all controls in the `FormArray`.
   *
   * @param options Specifies whether this FormArray instance should emit events after all
   *     controls are removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when all controls
   * in this FormArray instance are removed. When false, no events are emitted.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */


  clear(options = {}) {
    if (this.controls.length < 1) return;

    this._forEachChild(control => control._registerOnCollectionChange(() => {}));

    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /** @internal */


  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */


  _throwIfControlMissing(index) {
    if (!this.controls.length) {
      throw new Error(`
        There are no form controls registered with this array yet. If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }

    if (!this.at(index)) {
      throw new Error(`Cannot find form control at index ${index}`);
    }
  }
  /** @internal */


  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  /** @internal */


  _updateValue() {
    this.value = this.controls.filter(control => control.enabled || this.disabled).map(control => control.value);
  }
  /** @internal */


  _anyControls(condition) {
    return this.controls.some(control => control.enabled && condition(control));
  }
  /** @internal */


  _setUpControls() {
    this._forEachChild(control => this._registerControl(control));
  }
  /** @internal */


  _checkAllValuesPresent(value) {
    this._forEachChild((control, i) => {
      if (value[i] === undefined) {
        throw new Error(`Must supply a value for form control at index: ${i}.`);
      }
    });
  }
  /** @internal */


  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }

    return this.controls.length > 0 || this.disabled;
  }

  _registerControl(control) {
    control.setParent(this);

    control._registerOnCollectionChange(this._onCollectionChange);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgForm)
};

const resolvedPromise$1 = (() => Promise.resolve(null))();
/**
 * @description
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You optionally export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * gives you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, use `NgModel` with a `name`
 * attribute. You may use `NgModelGroup` to create sub-groups within the form.
 *
 * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event emits the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * To import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * @usageNotes
 *
 * ### Listening for form submission
 *
 * The following example shows how to capture the form values from the "ngSubmit" event.
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Setting the update options
 *
 * The following example shows you how to change the "updateOn" option from its default using
 * ngFormOptions.
 *
 * ```html
 * <form [ngFormOptions]="{updateOn: 'blur'}">
 *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
 * </form>
 * ```
 *
 * ### Native DOM validation UI
 *
 * In order to prevent the native DOM form validation UI from interfering with Angular's form
 * validation, Angular automatically adds the `novalidate` attribute on any `<form>` whenever
 * `FormModule` or `ReactiveFormModule` are imported into the application.
 * If you want to explicitly enable native DOM validation UI with Angular forms, you can add the
 * `ngNativeValidate` attribute to the `<form>` element:
 *
 * ```html
 * <form ngNativeValidate>
 *   ...
 * </form>
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */


class NgForm extends ControlContainer {
  constructor(validators, asyncValidators) {
    super();
    /**
     * @description
     * Returns whether the form submission has been triggered.
     */

    this.submitted = false;
    this._directives = [];
    /**
     * @description
     * Event emitter for the "ngSubmit" event
     */

    this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
  }
  /** @nodoc */


  ngAfterViewInit() {
    this._setUpdateStrategy();
  }
  /**
   * @description
   * The directive instance.
   */


  get formDirective() {
    return this;
  }
  /**
   * @description
   * The internal `FormGroup` instance.
   */


  get control() {
    return this.form;
  }
  /**
   * @description
   * Returns an array representing the path to this group. Because this directive
   * always lives at the top level of a form, it is always an empty array.
   */


  get path() {
    return [];
  }
  /**
   * @description
   * Returns a map of the controls in this group.
   */


  get controls() {
    return this.form.controls;
  }
  /**
   * @description
   * Method that sets up the control directive in this group, re-calculates its value
   * and validity, and adds the instance to the internal list of directives.
   *
   * @param dir The `NgModel` directive instance.
   */


  addControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);

      dir.control = container.registerControl(dir.name, dir.control);
      setUpControl(dir.control, dir);
      dir.control.updateValueAndValidity({
        emitEvent: false
      });

      this._directives.push(dir);
    });
  }
  /**
   * @description
   * Retrieves the `FormControl` instance from the provided `NgModel` directive.
   *
   * @param dir The `NgModel` directive instance.
   */


  getControl(dir) {
    return this.form.get(dir.path);
  }
  /**
   * @description
   * Removes the `NgModel` instance from the internal list of directives
   *
   * @param dir The `NgModel` directive instance.
   */


  removeControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);

      if (container) {
        container.removeControl(dir.name);
      }

      removeListItem(this._directives, dir);
    });
  }
  /**
   * @description
   * Adds a new `NgModelGroup` directive instance to the form.
   *
   * @param dir The `NgModelGroup` directive instance.
   */


  addFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);

      const group = new FormGroup({});
      setUpFormContainer(group, dir);
      container.registerControl(dir.name, group);
      group.updateValueAndValidity({
        emitEvent: false
      });
    });
  }
  /**
   * @description
   * Removes the `NgModelGroup` directive instance from the form.
   *
   * @param dir The `NgModelGroup` directive instance.
   */


  removeFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);

      if (container) {
        container.removeControl(dir.name);
      }
    });
  }
  /**
   * @description
   * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
   *
   * @param dir The `NgModelGroup` directive instance.
   */


  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Sets the new value for the provided `NgControl` directive.
   *
   * @param dir The `NgControl` directive instance.
   * @param value The new value for the directive's control.
   */


  updateModel(dir, value) {
    resolvedPromise$1.then(() => {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    });
  }
  /**
   * @description
   * Sets the value for this `FormGroup`.
   *
   * @param value The new value
   */


  setValue(value) {
    this.control.setValue(value);
  }
  /**
   * @description
   * Method called when the "submit" event is triggered on the form.
   * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
   *
   * @param $event The "submit" event object
   */


  onSubmit($event) {
    this.submitted = true;
    syncPendingControls(this.form, this._directives);
    this.ngSubmit.emit($event);
    return false;
  }
  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   */


  onReset() {
    this.resetForm();
  }
  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * @param value The new value for the form.
   */


  resetForm(value = undefined) {
    this.form.reset(value);
    this.submitted = false;
  }

  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.form._updateOn = this.options.updateOn;
    }
  }
  /** @internal */


  _findContainer(path) {
    path.pop();
    return path.length ? this.form.get(path) : this.form;
  }

}

NgForm.ɵfac = function NgForm_Factory(t) {
  return new (t || NgForm)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
};

NgForm.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgForm,
  selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
  hostBindings: function NgForm_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function NgForm_submit_HostBindingHandler($event) {
        return ctx.onSubmit($event);
      })("reset", function NgForm_reset_HostBindingHandler() {
        return ctx.onReset();
      });
    }
  },
  inputs: {
    options: ["ngFormOptions", "options"]
  },
  outputs: {
    ngSubmit: "ngSubmit"
  },
  exportAs: ["ngForm"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formDirectiveProvider$1]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgForm, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]',
      providers: [formDirectiveProvider$1],
      host: {
        '(submit)': 'onSubmit($event)',
        '(reset)': 'onReset()'
      },
      outputs: ['ngSubmit'],
      exportAs: 'ngForm'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
  }, {
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngFormOptions']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
 *
 * @publicApi
 */


class AbstractFormGroupDirective extends ControlContainer {
  /** @nodoc */
  ngOnInit() {
    this._checkParentType(); // Register the group with its parent group.


    this.formDirective.addFormGroup(this);
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this.formDirective) {
      // Remove the group from its parent group.
      this.formDirective.removeFormGroup(this);
    }
  }
  /**
   * @description
   * The `FormGroup` bound to this directive.
   */


  get control() {
    return this.formDirective.getFormGroup(this);
  }
  /**
   * @description
   * The path to this group from the top-level directive.
   */


  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */


  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /** @internal */


  _checkParentType() {}

}

AbstractFormGroupDirective.ɵfac = /* @__PURE__ */function () {
  let ɵAbstractFormGroupDirective_BaseFactory;
  return function AbstractFormGroupDirective_Factory(t) {
    return (ɵAbstractFormGroupDirective_BaseFactory || (ɵAbstractFormGroupDirective_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](AbstractFormGroupDirective)))(t || AbstractFormGroupDirective);
  };
}();

AbstractFormGroupDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: AbstractFormGroupDirective,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AbstractFormGroupDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function modelParentException() {
  return new Error(`
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}

function formGroupNameException() {
  return new Error(`
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}

function missingNameException() {
  return new Error(`If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}

function modelGroupParentException() {
  return new Error(`
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const modelGroupProvider = {
  provide: ControlContainer,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgModelGroup)
};
/**
 * @description
 * Creates and binds a `FormGroup` instance to a DOM element.
 *
 * This directive can only be used as a child of `NgForm` (within `<form>` tags).
 *
 * Use this directive to validate a sub-group of your form separately from the
 * rest of your form, or if some values in your domain model make more sense
 * to consume together in a nested object.
 *
 * Provide a name for the sub-group and it will become the key
 * for the sub-group in the form's full value. If you need direct access, export the directive into
 * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
 *
 * @usageNotes
 *
 * ### Consuming controls in a grouping
 *
 * The following example shows you how to combine controls together in a sub-group
 * of the form.
 *
 * {@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
 *
 * @ngModule FormsModule
 * @publicApi
 */

class NgModelGroup extends AbstractFormGroupDirective {
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);
  }
  /** @internal */


  _checkParentType() {
    if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw modelGroupParentException();
    }
  }

}

NgModelGroup.ɵfac = function NgModelGroup_Factory(t) {
  return new (t || NgModelGroup)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 5), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
};

NgModelGroup.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgModelGroup,
  selectors: [["", "ngModelGroup", ""]],
  inputs: {
    name: ["ngModelGroup", "name"]
  },
  exportAs: ["ngModelGroup"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([modelGroupProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgModelGroup, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[ngModelGroup]',
      providers: [modelGroupProvider],
      exportAs: 'ngModelGroup'
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngModelGroup']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formControlBinding$1 = {
  provide: NgControl,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgModel)
};
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have an old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel`s have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */

const resolvedPromise = (() => Promise.resolve(null))();
/**
 * @description
 * Creates a `FormControl` instance from a domain model and binds it
 * to a form control element.
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the domain model's value in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-in-a-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * To inspect the properties of the associated `FormControl` (like the validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex:
 * `#myVar="ngModel"`). You can then access the control using the directive's `control` property.
 * However, the most commonly used properties (like `valid` and `dirty`) also exist on the control
 * for direct access. See a full list of properties directly available in
 * `AbstractControlDirective`.
 *
 * @see `RadioControlValueAccessor`
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * ### Using ngModel within a form
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel `name` attribute through options
 *
 * The following example shows you an alternate way to set the name attribute. Here,
 * an attribute identified as name is used within a custom form control component. To still be able
 * to specify the NgModel's name, you must specify it using the `ngModelOptions` input instead.
 *
 * ```html
 * <form>
 *   <my-custom-form-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-custom-form-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */


class NgModel extends NgControl {
  constructor(parent, validators, asyncValidators, valueAccessors) {
    super();
    this.control = new FormControl();
    /** @internal */

    this._registered = false;
    /**
     * @description
     * Event emitter for producing the `ngModelChange` event after
     * the view model updates.
     */

    this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._parent = parent;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);

    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /** @nodoc */


  ngOnChanges(changes) {
    this._checkForErrors();

    if (!this._registered) this._setUpControl();

    if ('isDisabled' in changes) {
      this._updateDisabled(changes);
    }

    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);

      this.viewModel = this.model;
    }
  }
  /** @nodoc */


  ngOnDestroy() {
    this.formDirective && this.formDirective.removeControl(this);
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */


  get path() {
    return this._parent ? controlPath(this.name, this._parent) : [this.name];
  }
  /**
   * @description
   * The top-level directive for this control if present, otherwise null.
   */


  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value emitted by `ngModelChange`.
   */


  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }

  _setUpControl() {
    this._setUpdateStrategy();

    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
    this._registered = true;
  }

  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.control._updateOn = this.options.updateOn;
    }
  }

  _isStandalone() {
    return !this._parent || !!(this.options && this.options.standalone);
  }

  _setUpStandalone() {
    setUpControl(this.control, this);
    this.control.updateValueAndValidity({
      emitEvent: false
    });
  }

  _checkForErrors() {
    if (!this._isStandalone()) {
      this._checkParentType();
    }

    this._checkName();
  }

  _checkParentType() {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
        throw formGroupNameException();
      } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
        throw modelParentException();
      }
    }
  }

  _checkName() {
    if (this.options && this.options.name) this.name = this.options.name;

    if (!this._isStandalone() && !this.name && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw missingNameException();
    }
  }

  _updateValue(value) {
    resolvedPromise.then(() => {
      this.control.setValue(value, {
        emitViewToModelChange: false
      });
    });
  }

  _updateDisabled(changes) {
    const disabledValue = changes['isDisabled'].currentValue;
    const isDisabled = disabledValue === '' || disabledValue && disabledValue !== 'false';
    resolvedPromise.then(() => {
      if (isDisabled && !this.control.disabled) {
        this.control.disable();
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable();
      }
    });
  }

}

NgModel.ɵfac = function NgModel_Factory(t) {
  return new (t || NgModel)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 9), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10));
};

NgModel.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgModel,
  selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
  inputs: {
    name: "name",
    isDisabled: ["disabled", "isDisabled"],
    model: ["ngModel", "model"],
    options: ["ngModelOptions", "options"]
  },
  outputs: {
    update: "ngModelChange"
  },
  exportAs: ["ngModel"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formControlBinding$1]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgModel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[ngModel]:not([formControlName]):not([formControl])',
      providers: [formControlBinding$1],
      exportAs: 'ngModel'
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    isDisabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['disabled']
    }],
    model: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngModel']
    }],
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngModelOptions']
    }],
    update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['ngModelChange']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 *
 * Adds `novalidate` attribute to all forms by default.
 *
 * `novalidate` is used to disable browser's native form validation.
 *
 * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
 *
 * ```
 * <form ngNativeValidate></form>
 * ```
 *
 * @publicApi
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 */


class ɵNgNoValidate {}

ɵNgNoValidate.ɵfac = function ɵNgNoValidate_Factory(t) {
  return new (t || ɵNgNoValidate)();
};

ɵNgNoValidate.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: ɵNgNoValidate,
  selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
  hostAttrs: ["novalidate", ""]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ɵNgNoValidate, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
      host: {
        'novalidate': ''
      }
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NumberValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a number value and listening to number input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a number input with a reactive form.
 *
 * The following example shows how to use a number input with a reactive form.
 *
 * ```ts
 * const totalCountControl = new FormControl();
 * ```
 *
 * ```
 * <input type="number" [formControl]="totalCountControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class NumberValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
    const normalizedValue = value == null ? '' : value;
    this.setProperty('value', normalizedValue);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */


  registerOnChange(fn) {
    this.onChange = value => {
      fn(value == '' ? null : parseFloat(value));
    };
  }

}

NumberValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵNumberValueAccessor_BaseFactory;
  return function NumberValueAccessor_Factory(t) {
    return (ɵNumberValueAccessor_BaseFactory || (ɵNumberValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](NumberValueAccessor)))(t || NumberValueAccessor);
  };
}();

NumberValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NumberValueAccessor,
  selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
  hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NumberValueAccessor_input_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([NUMBER_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NumberValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
      host: {
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      providers: [NUMBER_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RadioControlValueAccessor),
  multi: true
};

function throwNameError() {
  throw new Error(`
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
/**
 * Internal-only NgModule that works as a host for the `RadioControlRegistry` tree-shakable
 * provider. Note: the `InternalFormsSharedModule` can not be used here directly, since it's
 * declared *after* the `RadioControlRegistry` class and the `providedIn` doesn't support
 * `forwardRef` logic.
 */


class RadioControlRegistryModule {}

RadioControlRegistryModule.ɵfac = function RadioControlRegistryModule_Factory(t) {
  return new (t || RadioControlRegistryModule)();
};

RadioControlRegistryModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: RadioControlRegistryModule
});
RadioControlRegistryModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioControlRegistryModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule
  }], null, null);
})();
/**
 * @description
 * Class used by Angular to track radio buttons. For internal use only.
 */


class RadioControlRegistry {
  constructor() {
    this._accessors = [];
  }
  /**
   * @description
   * Adds a control to the internal registry. For internal use only.
   */


  add(control, accessor) {
    this._accessors.push([control, accessor]);
  }
  /**
   * @description
   * Removes a control from the internal registry. For internal use only.
   */


  remove(accessor) {
    for (let i = this._accessors.length - 1; i >= 0; --i) {
      if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);

        return;
      }
    }
  }
  /**
   * @description
   * Selects a radio button. For internal use only.
   */


  select(accessor) {
    this._accessors.forEach(c => {
      if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].fireUncheck(accessor.value);
      }
    });
  }

  _isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) return false;
    return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
  }

}

RadioControlRegistry.ɵfac = function RadioControlRegistry_Factory(t) {
  return new (t || RadioControlRegistry)();
};

RadioControlRegistry.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: RadioControlRegistry,
  factory: RadioControlRegistry.ɵfac,
  providedIn: RadioControlRegistryModule
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioControlRegistry, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: RadioControlRegistryModule
    }]
  }], null, null);
})();
/**
 * @description
 * The `ControlValueAccessor` for writing radio control values and listening to radio control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using radio buttons with reactive form directives
 *
 * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
 * a reactive form, radio buttons in the same group should have the same `formControlName`.
 * Providing a `name` attribute is optional.
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class RadioControlValueAccessor extends BuiltInControlValueAccessor {
  constructor(renderer, elementRef, _registry, _injector) {
    super(renderer, elementRef);
    this._registry = _registry;
    this._injector = _injector;
    /**
     * The registered callback function called when a change event occurs on the input element.
     * Note: we declare `onChange` here (also used as host listener) as a function with no arguments
     * to override the `onChange` function (which expects 1 argument) in the parent
     * `BaseControlValueAccessor` class.
     * @nodoc
     */

    this.onChange = () => {};
  }
  /** @nodoc */


  ngOnInit() {
    this._control = this._injector.get(NgControl);

    this._checkName();

    this._registry.add(this._control, this);
  }
  /** @nodoc */


  ngOnDestroy() {
    this._registry.remove(this);
  }
  /**
   * Sets the "checked" property value on the radio input element.
   * @nodoc
   */


  writeValue(value) {
    this._state = value === this.value;
    this.setProperty('checked', this._state);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */


  registerOnChange(fn) {
    this._fn = fn;

    this.onChange = () => {
      fn(this.value);

      this._registry.select(this);
    };
  }
  /**
   * Sets the "value" on the radio input element and unchecks it.
   *
   * @param value
   */


  fireUncheck(value) {
    this.writeValue(value);
  }

  _checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throwNameError();
    }

    if (!this.name && this.formControlName) this.name = this.formControlName;
  }

}

RadioControlValueAccessor.ɵfac = function RadioControlValueAccessor_Factory(t) {
  return new (t || RadioControlValueAccessor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](RadioControlRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector));
};

RadioControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: RadioControlValueAccessor,
  selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
  hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function RadioControlValueAccessor_change_HostBindingHandler() {
        return ctx.onChange();
      })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  inputs: {
    name: "name",
    formControlName: "formControlName",
    value: "value"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([RADIO_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RadioControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
      host: {
        '(change)': 'onChange()',
        '(blur)': 'onTouched()'
      },
      providers: [RADIO_VALUE_ACCESSOR]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: RadioControlRegistry
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    formControlName: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RangeValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a range value and listening to range input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a range input with a reactive form
 *
 * The following example shows how to use a range input with a reactive form.
 *
 * ```ts
 * const ageControl = new FormControl();
 * ```
 *
 * ```
 * <input type="range" [formControl]="ageControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class RangeValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    this.setProperty('value', parseFloat(value));
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */


  registerOnChange(fn) {
    this.onChange = value => {
      fn(value == '' ? null : parseFloat(value));
    };
  }

}

RangeValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵRangeValueAccessor_BaseFactory;
  return function RangeValueAccessor_Factory(t) {
    return (ɵRangeValueAccessor_BaseFactory || (ɵRangeValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](RangeValueAccessor)))(t || RangeValueAccessor);
  };
}();

RangeValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: RangeValueAccessor,
  selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
  hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function RangeValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([RANGE_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RangeValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
      host: {
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      providers: [RANGE_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */


const NG_MODEL_WITH_FORM_CONTROL_WARNING = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgModelWithFormControlWarning');
const formControlBinding = {
  provide: NgControl,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormControlDirective)
};
/**
 * @description
 * Synchronizes a standalone `FormControl` instance to a form control element.
 *
 * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives was deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * The following example shows how to register a standalone control and set its value.
 *
 * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class FormControlDirective extends NgControl {
  constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    /** @deprecated as of v6 */

    this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * @description
     * Instance property used to track whether an ngModel warning has been sent out for this
     * particular `FormControlDirective` instance. Used to support warning config of "always".
     *
     * @internal
     */

    this._ngModelWarningSent = false;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);

    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /**
   * @description
   * Triggers a warning in dev mode that this input should not be used with reactive forms.
   */


  set isDisabled(isDisabled) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  /** @nodoc */


  ngOnChanges(changes) {
    if (this._isControlChanged(changes)) {
      const previousForm = changes['form'].previousValue;

      if (previousForm) {
        cleanUpControl(previousForm, this,
        /* validateControlPresenceOnChange */
        false);
      }

      setUpControl(this.form, this);

      if (this.control.disabled && this.valueAccessor.setDisabledState) {
        this.valueAccessor.setDisabledState(true);
      }

      this.form.updateValueAndValidity({
        emitEvent: false
      });
    }

    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
      }

      this.form.setValue(this.model);
      this.viewModel = this.model;
    }
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this.form) {
      cleanUpControl(this.form, this,
      /* validateControlPresenceOnChange */
      false);
    }
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */


  get path() {
    return [];
  }
  /**
   * @description
   * The `FormControl` bound to this directive.
   */


  get control() {
    return this.form;
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value for the view model.
   */


  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }

  _isControlChanged(changes) {
    return changes.hasOwnProperty('form');
  }

}
/**
 * @description
 * Static property used to track whether any ngModel warnings have been sent across
 * all instances of FormControlDirective. Used to support warning config of "once".
 *
 * @internal
 */


FormControlDirective._ngModelWarningSentOnce = false;

FormControlDirective.ɵfac = function FormControlDirective_Factory(t) {
  return new (t || FormControlDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
};

FormControlDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: FormControlDirective,
  selectors: [["", "formControl", ""]],
  inputs: {
    form: ["formControl", "form"],
    isDisabled: ["disabled", "isDisabled"],
    model: ["ngModel", "model"]
  },
  outputs: {
    update: "ngModelChange"
  },
  exportAs: ["ngForm"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formControlBinding]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormControlDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formControl]',
      providers: [formControlBinding],
      exportAs: 'ngForm'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
      }]
    }];
  }, {
    form: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['formControl']
    }],
    isDisabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['disabled']
    }],
    model: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngModel']
    }],
    update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['ngModelChange']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormGroupDirective)
};
/**
 * @description
 *
 * Binds an existing `FormGroup` to a DOM element.
 *
 * This directive accepts an existing `FormGroup` instance. It will then use this
 * `FormGroup` instance to match any child `FormControl`, `FormGroup`,
 * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
 * and `FormArrayName` directives.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `AbstractControl`
 *
 * @usageNotes
 * ### Register Form Group
 *
 * The following example registers a `FormGroup` with first name and last name controls,
 * and listens for the *ngSubmit* event when the button is clicked.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class FormGroupDirective extends ControlContainer {
  constructor(validators, asyncValidators) {
    super();
    this.validators = validators;
    this.asyncValidators = asyncValidators;
    /**
     * @description
     * Reports whether the form submission has been triggered.
     */

    this.submitted = false;
    /**
     * Callback that should be invoked when controls in FormGroup or FormArray collection change
     * (added or removed). This callback triggers corresponding DOM updates.
     */

    this._onCollectionChange = () => this._updateDomValue();
    /**
     * @description
     * Tracks the list of added `FormControlName` instances
     */


    this.directives = [];
    /**
     * @description
     * Tracks the `FormGroup` bound to this directive.
     */

    this.form = null;
    /**
     * @description
     * Emits an event when the form submission has been triggered.
     */

    this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);
  }
  /** @nodoc */


  ngOnChanges(changes) {
    this._checkFormPresent();

    if (changes.hasOwnProperty('form')) {
      this._updateValidators();

      this._updateDomValue();

      this._updateRegistrations();

      this._oldForm = this.form;
    }
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this.form) {
      cleanUpValidators(this.form, this); // Currently the `onCollectionChange` callback is rewritten each time the
      // `_registerOnCollectionChange` function is invoked. The implication is that cleanup should
      // happen *only* when the `onCollectionChange` callback was set by this directive instance.
      // Otherwise it might cause overriding a callback of some other directive instances. We should
      // consider updating this logic later to make it similar to how `onChange` callbacks are
      // handled, see https://github.com/angular/angular/issues/39732 for additional info.

      if (this.form._onCollectionChange === this._onCollectionChange) {
        this.form._registerOnCollectionChange(() => {});
      }
    }
  }
  /**
   * @description
   * Returns this directive's instance.
   */


  get formDirective() {
    return this;
  }
  /**
   * @description
   * Returns the `FormGroup` bound to this directive.
   */


  get control() {
    return this.form;
  }
  /**
   * @description
   * Returns an array representing the path to this group. Because this directive
   * always lives at the top level of a form, it always an empty array.
   */


  get path() {
    return [];
  }
  /**
   * @description
   * Method that sets up the control directive in this group, re-calculates its value
   * and validity, and adds the instance to the internal list of directives.
   *
   * @param dir The `FormControlName` directive instance.
   */


  addControl(dir) {
    const ctrl = this.form.get(dir.path);
    setUpControl(ctrl, dir);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
    this.directives.push(dir);
    return ctrl;
  }
  /**
   * @description
   * Retrieves the `FormControl` instance from the provided `FormControlName` directive
   *
   * @param dir The `FormControlName` directive instance.
   */


  getControl(dir) {
    return this.form.get(dir.path);
  }
  /**
   * @description
   * Removes the `FormControlName` instance from the internal list of directives
   *
   * @param dir The `FormControlName` directive instance.
   */


  removeControl(dir) {
    cleanUpControl(dir.control || null, dir,
    /* validateControlPresenceOnChange */
    false);
    removeListItem(this.directives, dir);
  }
  /**
   * Adds a new `FormGroupName` directive instance to the form.
   *
   * @param dir The `FormGroupName` directive instance.
   */


  addFormGroup(dir) {
    this._setUpFormContainer(dir);
  }
  /**
   * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
   * view.
   *
   * @param dir The `FormGroupName` directive instance.
   */


  removeFormGroup(dir) {
    this._cleanUpFormContainer(dir);
  }
  /**
   * @description
   * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
   *
   * @param dir The `FormGroupName` directive instance.
   */


  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
   *
   * @param dir The `FormArrayName` directive instance.
   */


  addFormArray(dir) {
    this._setUpFormContainer(dir);
  }
  /**
   * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
   * view.
   *
   * @param dir The `FormArrayName` directive instance.
   */


  removeFormArray(dir) {
    this._cleanUpFormContainer(dir);
  }
  /**
   * @description
   * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
   *
   * @param dir The `FormArrayName` directive instance.
   */


  getFormArray(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Sets the new value for the provided `FormControlName` directive.
   *
   * @param dir The `FormControlName` directive instance.
   * @param value The new value for the directive's control.
   */


  updateModel(dir, value) {
    const ctrl = this.form.get(dir.path);
    ctrl.setValue(value);
  }
  /**
   * @description
   * Method called with the "submit" event is triggered on the form.
   * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
   *
   * @param $event The "submit" event object
   */


  onSubmit($event) {
    this.submitted = true;
    syncPendingControls(this.form, this.directives);
    this.ngSubmit.emit($event);
    return false;
  }
  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   */


  onReset() {
    this.resetForm();
  }
  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * @param value The new value for the form.
   */


  resetForm(value = undefined) {
    this.form.reset(value);
    this.submitted = false;
  }
  /** @internal */


  _updateDomValue() {
    this.directives.forEach(dir => {
      const oldCtrl = dir.control;
      const newCtrl = this.form.get(dir.path);

      if (oldCtrl !== newCtrl) {
        // Note: the value of the `dir.control` may not be defined, for example when it's a first
        // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
        cleanUpControl(oldCtrl || null, dir); // Check whether new control at the same location inside the corresponding `FormGroup` is an
        // instance of `FormControl` and perform control setup only if that's the case.
        // Note: we don't need to clear the list of directives (`this.directives`) here, it would be
        // taken care of in the `removeControl` method invoked when corresponding `formControlName`
        // directive instance is being removed (invoked from `FormControlName.ngOnDestroy`).

        if (newCtrl instanceof FormControl) {
          setUpControl(newCtrl, dir);
          dir.control = newCtrl;
        }
      }
    });

    this.form._updateTreeValidity({
      emitEvent: false
    });
  }

  _setUpFormContainer(dir) {
    const ctrl = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir); // NOTE: this operation looks unnecessary in case no new validators were added in
    // `setUpFormContainer` call. Consider updating this code to match the logic in
    // `_cleanUpFormContainer` function.

    ctrl.updateValueAndValidity({
      emitEvent: false
    });
  }

  _cleanUpFormContainer(dir) {
    if (this.form) {
      const ctrl = this.form.get(dir.path);

      if (ctrl) {
        const isControlUpdated = cleanUpFormContainer(ctrl, dir);

        if (isControlUpdated) {
          // Run validity check only in case a control was updated (i.e. view validators were
          // removed) as removing view validators might cause validity to change.
          ctrl.updateValueAndValidity({
            emitEvent: false
          });
        }
      }
    }
  }

  _updateRegistrations() {
    this.form._registerOnCollectionChange(this._onCollectionChange);

    if (this._oldForm) {
      this._oldForm._registerOnCollectionChange(() => {});
    }
  }

  _updateValidators() {
    setUpValidators(this.form, this);

    if (this._oldForm) {
      cleanUpValidators(this._oldForm, this);
    }
  }

  _checkFormPresent() {
    if (!this.form && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw missingFormException();
    }
  }

}

FormGroupDirective.ɵfac = function FormGroupDirective_Factory(t) {
  return new (t || FormGroupDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
};

FormGroupDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: FormGroupDirective,
  selectors: [["", "formGroup", ""]],
  hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
        return ctx.onSubmit($event);
      })("reset", function FormGroupDirective_reset_HostBindingHandler() {
        return ctx.onReset();
      });
    }
  },
  inputs: {
    form: ["formGroup", "form"]
  },
  outputs: {
    ngSubmit: "ngSubmit"
  },
  exportAs: ["ngForm"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formDirectiveProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormGroupDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formGroup]',
      providers: [formDirectiveProvider],
      host: {
        '(submit)': 'onSubmit($event)',
        '(reset)': 'onReset()'
      },
      exportAs: 'ngForm'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
  }, {
    form: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['formGroup']
    }],
    ngSubmit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormGroupName)
};
/**
 * @description
 *
 * Syncs a nested `FormGroup` to a DOM element.
 *
 * This directive can only be used with a parent `FormGroupDirective`.
 *
 * It accepts the string name of the nested `FormGroup` to link, and
 * looks for a `FormGroup` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * Use nested form groups to validate a sub-group of a
 * form separately from the rest or to group the values of certain
 * controls into their own nested object.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @usageNotes
 *
 * ### Access the group by name
 *
 * The following example uses the {@link AbstractControl#get get} method to access the
 * associated `FormGroup`
 *
 * ```ts
 *   this.form.get('name');
 * ```
 *
 * ### Access individual controls in the group
 *
 * The following example uses the {@link AbstractControl#get get} method to access
 * individual controls within the group using dot syntax.
 *
 * ```ts
 *   this.form.get('name.first');
 * ```
 *
 * ### Register a nested `FormGroup`.
 *
 * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
 * and provides methods to retrieve the nested `FormGroup` and individual controls.
 *
 * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class FormGroupName extends AbstractFormGroupDirective {
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);
  }
  /** @internal */


  _checkParentType() {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw groupParentException();
    }
  }

}

FormGroupName.ɵfac = function FormGroupName_Factory(t) {
  return new (t || FormGroupName)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
};

FormGroupName.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: FormGroupName,
  selectors: [["", "formGroupName", ""]],
  inputs: {
    name: ["formGroupName", "name"]
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formGroupNameProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormGroupName, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formGroupName]',
      providers: [formGroupNameProvider]
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['formGroupName']
    }]
  });
})();

const formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormArrayName)
};
/**
 * @description
 *
 * Syncs a nested `FormArray` to a DOM element.
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested `FormArray` you want to link, and
 * will look for a `FormArray` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class FormArrayName extends ControlContainer {
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);
  }
  /**
   * A lifecycle method called when the directive's inputs are initialized. For internal use only.
   * @throws If the directive does not have a valid parent.
   * @nodoc
   */


  ngOnInit() {
    this._checkParentType();

    this.formDirective.addFormArray(this);
  }
  /**
   * A lifecycle method called before the directive's instance is destroyed. For internal use only.
   * @nodoc
   */


  ngOnDestroy() {
    if (this.formDirective) {
      this.formDirective.removeFormArray(this);
    }
  }
  /**
   * @description
   * The `FormArray` bound to this directive.
   */


  get control() {
    return this.formDirective.getFormArray(this);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */


  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */


  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }

  _checkParentType() {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw arrayParentException();
    }
  }

}

FormArrayName.ɵfac = function FormArrayName_Factory(t) {
  return new (t || FormArrayName)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
};

FormArrayName.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: FormArrayName,
  selectors: [["", "formArrayName", ""]],
  inputs: {
    name: ["formArrayName", "name"]
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formArrayNameProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormArrayName, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formArrayName]',
      providers: [formArrayNameProvider]
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['formArrayName']
    }]
  });
})();

function _hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const controlNameBinding = {
  provide: NgControl,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormControlName)
};
/**
 * @description
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * ### Register `FormControl` within a group
 *
 * The following example shows how to register multiple form controls within a form group
 * and set their value.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: `RadioControlValueAccessor`
 * * Selects: `SelectControlValueAccessor`
 *
 * ### Use with ngModel is deprecated
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 *
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class FormControlName extends NgControl {
  constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this._added = false;
    /** @deprecated as of v6 */

    this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * @description
     * Instance property used to track whether an ngModel warning has been sent out for this
     * particular FormControlName instance. Used to support warning config of "always".
     *
     * @internal
     */

    this._ngModelWarningSent = false;
    this._parent = parent;

    this._setValidators(validators);

    this._setAsyncValidators(asyncValidators);

    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /**
   * @description
   * Triggers a warning in dev mode that this input should not be used with reactive forms.
   */


  set isDisabled(isDisabled) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  /** @nodoc */


  ngOnChanges(changes) {
    if (!this._added) this._setUpControl();

    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
      }

      this.viewModel = this.model;
      this.formDirective.updateModel(this, this.model);
    }
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value for the view model.
   */


  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */


  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */


  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }

  _checkParentType() {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
        throw ngModelGroupException();
      } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
        throw controlParentException();
      }
    }
  }

  _setUpControl() {
    this._checkParentType();

    this.control = this.formDirective.addControl(this);

    if (this.control.disabled && this.valueAccessor.setDisabledState) {
      this.valueAccessor.setDisabledState(true);
    }

    this._added = true;
  }

}
/**
 * @description
 * Static property used to track whether any ngModel warnings have been sent across
 * all instances of FormControlName. Used to support warning config of "once".
 *
 * @internal
 */


FormControlName._ngModelWarningSentOnce = false;

FormControlName.ɵfac = function FormControlName_Factory(t) {
  return new (t || FormControlName)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
};

FormControlName.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: FormControlName,
  selectors: [["", "formControlName", ""]],
  inputs: {
    name: ["formControlName", "name"],
    isDisabled: ["disabled", "isDisabled"],
    model: ["ngModel", "model"]
  },
  outputs: {
    update: "ngModelChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([controlNameBinding]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormControlName, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[formControlName]',
      providers: [controlNameBinding]
    }]
  }], function () {
    return [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
      }]
    }];
  }, {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['formControlName']
    }],
    isDisabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['disabled']
    }],
    model: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngModel']
    }],
    update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['ngModelChange']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => SelectControlValueAccessor),
  multi: true
};

function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}

function _extractId$1(valueString) {
  return valueString.split(':')[0];
}
/**
 * @description
 * The `ControlValueAccessor` for writing select control values and listening to select control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using select controls in a reactive form
 *
 * The following examples show how to use a select control in a reactive form.
 *
 * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Using select controls in a template-driven form
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * ### Customizing option selection
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * ```ts
 * const selectedCountriesControl = new FormControl();
 * ```
 *
 * ```
 * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * **Note:** We listen to the 'change' event because 'input' events aren't fired
 * for selects in IE, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event#browser_compatibility
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class SelectControlValueAccessor extends BuiltInControlValueAccessor {
  constructor() {
    super(...arguments);
    /** @internal */

    this._optionMap = new Map();
    /** @internal */

    this._idCounter = 0;
    this._compareWith = Object.is;
  }
  /**
   * @description
   * Tracks the option comparison algorithm for tracking identities when
   * checking for changes.
   */


  set compareWith(fn) {
    if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }

    this._compareWith = fn;
  }
  /**
   * Sets the "value" property on the input element. The "selectedIndex"
   * property is also set if an ID is provided on the option element.
   * @nodoc
   */


  writeValue(value) {
    this.value = value;

    const id = this._getOptionId(value);

    if (id == null) {
      this.setProperty('selectedIndex', -1);
    }

    const valueString = _buildValueString$1(id, value);

    this.setProperty('value', valueString);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */


  registerOnChange(fn) {
    this.onChange = valueString => {
      this.value = this._getOptionValue(valueString);
      fn(this.value);
    };
  }
  /** @internal */


  _registerOption() {
    return (this._idCounter++).toString();
  }
  /** @internal */


  _getOptionId(value) {
    for (const id of Array.from(this._optionMap.keys())) {
      if (this._compareWith(this._optionMap.get(id), value)) return id;
    }

    return null;
  }
  /** @internal */


  _getOptionValue(valueString) {
    const id = _extractId$1(valueString);

    return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
  }

}

SelectControlValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵSelectControlValueAccessor_BaseFactory;
  return function SelectControlValueAccessor_Factory(t) {
    return (ɵSelectControlValueAccessor_BaseFactory || (ɵSelectControlValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](SelectControlValueAccessor)))(t || SelectControlValueAccessor);
  };
}();

SelectControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: SelectControlValueAccessor,
  selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
  hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  inputs: {
    compareWith: "compareWith"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([SELECT_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SelectControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
      host: {
        '(change)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      providers: [SELECT_VALUE_ACCESSOR]
    }]
  }], null, {
    compareWith: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see `SelectControlValueAccessor`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class NgSelectOption {
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) this.id = this._select._registerOption();
  }
  /**
   * @description
   * Tracks the value bound to the option element. Unlike the value binding,
   * ngValue supports binding to objects.
   */


  set ngValue(value) {
    if (this._select == null) return;

    this._select._optionMap.set(this.id, value);

    this._setElementValue(_buildValueString$1(this.id, value));

    this._select.writeValue(this._select.value);
  }
  /**
   * @description
   * Tracks simple string values bound to the option element.
   * For objects, use the `ngValue` input binding.
   */


  set value(value) {
    this._setElementValue(value);

    if (this._select) this._select.writeValue(this._select.value);
  }
  /** @internal */


  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, 'value', value);
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);

      this._select.writeValue(this._select.value);
    }
  }

}

NgSelectOption.ɵfac = function NgSelectOption_Factory(t) {
  return new (t || NgSelectOption)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SelectControlValueAccessor, 9));
};

NgSelectOption.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgSelectOption,
  selectors: [["option"]],
  inputs: {
    ngValue: "ngValue",
    value: "value"
  }
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgSelectOption, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'option'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: SelectControlValueAccessor,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }]
    }];
  }, {
    ngValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngValue']
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['value']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => SelectMultipleControlValueAccessor),
  multi: true
};

function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === 'string') value = `'${value}'`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}

function _extractId(valueString) {
  return valueString.split(':')[0];
}
/** Mock interface for HTMLCollection */


class HTMLCollection {}
/**
 * @description
 * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
 * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using a multi-select control
 *
 * The follow example shows you how to use a multi-select control with a reactive form.
 *
 * ```ts
 * const countryControl = new FormControl();
 * ```
 *
 * ```
 * <select multiple name="countries" [formControl]="countryControl">
 *   <option *ngFor="let country of countries" [ngValue]="country">
 *     {{ country.name }}
 *   </option>
 * </select>
 * ```
 *
 * ### Customizing option selection
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * See the `SelectControlValueAccessor` for usage.
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
  constructor() {
    super(...arguments);
    /** @internal */

    this._optionMap = new Map();
    /** @internal */

    this._idCounter = 0;
    this._compareWith = Object.is;
  }
  /**
   * @description
   * Tracks the option comparison algorithm for tracking identities when
   * checking for changes.
   */


  set compareWith(fn) {
    if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }

    this._compareWith = fn;
  }
  /**
   * Sets the "value" property on one or of more of the select's options.
   * @nodoc
   */


  writeValue(value) {
    this.value = value;
    let optionSelectedStateSetter;

    if (Array.isArray(value)) {
      // convert values to ids
      const ids = value.map(v => this._getOptionId(v));

      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(ids.indexOf(o.toString()) > -1);
      };
    } else {
      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(false);
      };
    }

    this._optionMap.forEach(optionSelectedStateSetter);
  }
  /**
   * Registers a function called when the control value changes
   * and writes an array of the selected options.
   * @nodoc
   */


  registerOnChange(fn) {
    this.onChange = element => {
      const selected = [];
      const selectedOptions = element.selectedOptions;

      if (selectedOptions !== undefined) {
        const options = selectedOptions;

        for (let i = 0; i < options.length; i++) {
          const opt = options[i];

          const val = this._getOptionValue(opt.value);

          selected.push(val);
        }
      } // Degrade to use `options` when `selectedOptions` property is not available.
      // Note: the `selectedOptions` is available in all supported browsers, but the Domino lib
      // doesn't have it currently, see https://github.com/fgnass/domino/issues/177.
      else {
        const options = element.options;

        for (let i = 0; i < options.length; i++) {
          const opt = options[i];

          if (opt.selected) {
            const val = this._getOptionValue(opt.value);

            selected.push(val);
          }
        }
      }

      this.value = selected;
      fn(selected);
    };
  }
  /** @internal */


  _registerOption(value) {
    const id = (this._idCounter++).toString();

    this._optionMap.set(id, value);

    return id;
  }
  /** @internal */


  _getOptionId(value) {
    for (const id of Array.from(this._optionMap.keys())) {
      if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
    }

    return null;
  }
  /** @internal */


  _getOptionValue(valueString) {
    const id = _extractId(valueString);

    return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
  }

}

SelectMultipleControlValueAccessor.ɵfac = /* @__PURE__ */function () {
  let ɵSelectMultipleControlValueAccessor_BaseFactory;
  return function SelectMultipleControlValueAccessor_Factory(t) {
    return (ɵSelectMultipleControlValueAccessor_BaseFactory || (ɵSelectMultipleControlValueAccessor_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](SelectMultipleControlValueAccessor)))(t || SelectMultipleControlValueAccessor);
  };
}();

SelectMultipleControlValueAccessor.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: SelectMultipleControlValueAccessor,
  selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
  hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target);
      })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    }
  },
  inputs: {
    compareWith: "compareWith"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([SELECT_MULTIPLE_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SelectMultipleControlValueAccessor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
      host: {
        '(change)': 'onChange($event.target)',
        '(blur)': 'onTouched()'
      },
      providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
    }]
  }], null, {
    compareWith: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see `SelectMultipleControlValueAccessor`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


class ɵNgSelectMultipleOption {
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;

    if (this._select) {
      this.id = this._select._registerOption(this);
    }
  }
  /**
   * @description
   * Tracks the value bound to the option element. Unlike the value binding,
   * ngValue supports binding to objects.
   */


  set ngValue(value) {
    if (this._select == null) return;
    this._value = value;

    this._setElementValue(_buildValueString(this.id, value));

    this._select.writeValue(this._select.value);
  }
  /**
   * @description
   * Tracks simple string values bound to the option element.
   * For objects, use the `ngValue` input binding.
   */


  set value(value) {
    if (this._select) {
      this._value = value;

      this._setElementValue(_buildValueString(this.id, value));

      this._select.writeValue(this._select.value);
    } else {
      this._setElementValue(value);
    }
  }
  /** @internal */


  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, 'value', value);
  }
  /** @internal */


  _setSelected(selected) {
    this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
  }
  /** @nodoc */


  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);

      this._select.writeValue(this._select.value);
    }
  }

}

ɵNgSelectMultipleOption.ɵfac = function ɵNgSelectMultipleOption_Factory(t) {
  return new (t || ɵNgSelectMultipleOption)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SelectMultipleControlValueAccessor, 9));
};

ɵNgSelectMultipleOption.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: ɵNgSelectMultipleOption,
  selectors: [["option"]],
  inputs: {
    ngValue: "ngValue",
    value: "value"
  }
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ɵNgSelectMultipleOption, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'option'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: SelectMultipleControlValueAccessor,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Host
      }]
    }];
  }, {
    ngValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['ngValue']
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['value']
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Method that updates string to integer if not already a number
 *
 * @param value The value to convert to integer
 * @returns value of parameter in number or integer.
 */


function toInteger(value) {
  return typeof value === 'number' ? value : parseInt(value, 10);
}
/**
 * Method that ensures that provided value is a float (and converts it to float if needed).
 *
 * @param value The value to convert to float
 * @returns value of parameter in number or float.
 */


function toFloat(value) {
  return typeof value === 'number' ? value : parseFloat(value);
}
/**
 * A base class for Validator-based Directives. The class contains common logic shared across such
 * Directives.
 *
 * For internal use only, this class is not intended for use outside of the Forms package.
 */


class AbstractValidatorDirective {
  constructor() {
    this._validator = nullValidator;
  }
  /** @nodoc */


  ngOnChanges(changes) {
    if (this.inputName in changes) {
      const input = this.normalizeInput(changes[this.inputName].currentValue);
      this._validator = this.enabled() ? this.createValidator(input) : nullValidator;

      if (this._onChange) {
        this._onChange();
      }
    }
  }
  /** @nodoc */


  validate(control) {
    return this._validator(control);
  }
  /** @nodoc */


  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }
  /**
   * @description
   * Determines whether this validator is active or not. Base class implementation
   * checks whether an input is defined (if the value is different from `null` and `undefined`).
   * Validator classes that extend this base class can override this function with the logic
   * specific to a particular validator directive.
   */


  enabled() {
    const inputValue = this[this.inputName];
    return inputValue != null
    /* both `null` and `undefined` */
    ;
  }

}

AbstractValidatorDirective.ɵfac = function AbstractValidatorDirective_Factory(t) {
  return new (t || AbstractValidatorDirective)();
};

AbstractValidatorDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: AbstractValidatorDirective,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AbstractValidatorDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], null, null);
})();
/**
 * @description
 * Provider which adds `MaxValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MaxValidator),
  multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `max` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a max validator
 *
 * The following example shows how to add a max validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel max="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class MaxValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    /** @internal */

    this.inputName = 'max';
    /** @internal */

    this.normalizeInput = input => toFloat(input);
    /** @internal */


    this.createValidator = max => maxValidator(max);
  }

}

MaxValidator.ɵfac = /* @__PURE__ */function () {
  let ɵMaxValidator_BaseFactory;
  return function MaxValidator_Factory(t) {
    return (ɵMaxValidator_BaseFactory || (ɵMaxValidator_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MaxValidator)))(t || MaxValidator);
  };
}();

MaxValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MaxValidator,
  selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function MaxValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("max", ctx.enabled() ? ctx.max : null);
    }
  },
  inputs: {
    max: "max"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAX_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaxValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]',
      providers: [MAX_VALIDATOR],
      host: {
        '[attr.max]': 'enabled() ? max : null'
      }
    }]
  }], null, {
    max: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Provider which adds `MinValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MinValidator),
  multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a min validator
 *
 * The following example shows how to add a min validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel min="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class MinValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    /** @internal */

    this.inputName = 'min';
    /** @internal */

    this.normalizeInput = input => toFloat(input);
    /** @internal */


    this.createValidator = min => minValidator(min);
  }

}

MinValidator.ɵfac = /* @__PURE__ */function () {
  let ɵMinValidator_BaseFactory;
  return function MinValidator_Factory(t) {
    return (ɵMinValidator_BaseFactory || (ɵMinValidator_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MinValidator)))(t || MinValidator);
  };
}();

MinValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MinValidator,
  selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function MinValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("min", ctx.enabled() ? ctx.min : null);
    }
  },
  inputs: {
    min: "min"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MIN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MinValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]',
      providers: [MIN_VALIDATOR],
      host: {
        '[attr.min]': 'enabled() ? min : null'
      }
    }]
  }], null, {
    min: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Provider which adds `RequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RequiredValidator),
  multi: true
};
/**
 * @description
 * Provider which adds `CheckboxRequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */

const CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CheckboxRequiredValidator),
  multi: true
};
/**
 * @description
 * A directive that adds the `required` validator to any controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required validator using template-driven forms
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

class RequiredValidator {
  constructor() {
    this._required = false;
  }
  /**
   * @description
   * Tracks changes to the required attribute bound to this directive.
   */


  get required() {
    return this._required;
  }

  set required(value) {
    this._required = value != null && value !== false && `${value}` !== 'false';
    if (this._onChange) this._onChange();
  }
  /**
   * Method that validates whether the control is empty.
   * Returns the validation result if enabled, otherwise null.
   * @nodoc
   */


  validate(control) {
    return this.required ? requiredValidator(control) : null;
  }
  /**
   * Registers a callback function to call when the validator inputs change.
   * @nodoc
   */


  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }

}

RequiredValidator.ɵfac = function RequiredValidator_Factory(t) {
  return new (t || RequiredValidator)();
};

RequiredValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: RequiredValidator,
  selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
  hostVars: 1,
  hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("required", ctx.required ? "" : null);
    }
  },
  inputs: {
    required: "required"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([REQUIRED_VALIDATOR])]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequiredValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
      providers: [REQUIRED_VALIDATOR],
      host: {
        '[attr.required]': 'required ? "" : null'
      }
    }]
  }], null, {
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * A Directive that adds the `required` validator to checkbox controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required checkbox validator using template-driven forms
 *
 * The following example shows how to add a checkbox required validator to an input attached to an
 * ngModel binding.
 *
 * ```
 * <input type="checkbox" name="active" ngModel required>
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */


class CheckboxRequiredValidator extends RequiredValidator {
  /**
   * Method that validates whether or not the checkbox has been checked.
   * Returns the validation result if enabled, otherwise null.
   * @nodoc
   */
  validate(control) {
    return this.required ? requiredTrueValidator(control) : null;
  }

}

CheckboxRequiredValidator.ɵfac = /* @__PURE__ */function () {
  let ɵCheckboxRequiredValidator_BaseFactory;
  return function CheckboxRequiredValidator_Factory(t) {
    return (ɵCheckboxRequiredValidator_BaseFactory || (ɵCheckboxRequiredValidator_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](CheckboxRequiredValidator)))(t || CheckboxRequiredValidator);
  };
}();

CheckboxRequiredValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: CheckboxRequiredValidator,
  selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("required", ctx.required ? "" : null);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([CHECKBOX_REQUIRED_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CheckboxRequiredValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
      providers: [CHECKBOX_REQUIRED_VALIDATOR],
      host: {
        '[attr.required]': 'required ? "" : null'
      }
    }]
  }], null, null);
})();
/**
 * @description
 * Provider which adds `EmailValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EmailValidator),
  multi: true
};
/**
 * A directive that adds the `email` validator to controls marked with the
 * `email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding an email validator
 *
 * The following example shows how to add an email validator to an input attached to an ngModel
 * binding.
 *
 * ```
 * <input type="email" name="email" ngModel email>
 * <input type="email" name="email" ngModel email="true">
 * <input type="email" name="email" ngModel [email]="true">
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */

class EmailValidator {
  constructor() {
    this._enabled = false;
  }
  /**
   * @description
   * Tracks changes to the email attribute bound to this directive.
   */


  set email(value) {
    this._enabled = value === '' || value === true || value === 'true';
    if (this._onChange) this._onChange();
  }
  /**
   * Method that validates whether an email address is valid.
   * Returns the validation result if enabled, otherwise null.
   * @nodoc
   */


  validate(control) {
    return this._enabled ? emailValidator(control) : null;
  }
  /**
   * Registers a callback function to call when the validator inputs change.
   * @nodoc
   */


  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }

}

EmailValidator.ɵfac = function EmailValidator_Factory(t) {
  return new (t || EmailValidator)();
};

EmailValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: EmailValidator,
  selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
  inputs: {
    email: "email"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([EMAIL_VALIDATOR])]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EmailValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[email][formControlName],[email][formControl],[email][ngModel]',
      providers: [EMAIL_VALIDATOR]
    }]
  }], null, {
    email: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Provider which adds `MinLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MinLengthValidator),
  multi: true
};
/**
 * A directive that adds minimum length validation to controls marked with the
 * `minlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a minimum length validator
 *
 * The following example shows how to add a minimum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel minlength="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class MinLengthValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    /** @internal */

    this.inputName = 'minlength';
    /** @internal */

    this.normalizeInput = input => toInteger(input);
    /** @internal */


    this.createValidator = minlength => minLengthValidator(minlength);
  }

}

MinLengthValidator.ɵfac = /* @__PURE__ */function () {
  let ɵMinLengthValidator_BaseFactory;
  return function MinLengthValidator_Factory(t) {
    return (ɵMinLengthValidator_BaseFactory || (ɵMinLengthValidator_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MinLengthValidator)))(t || MinLengthValidator);
  };
}();

MinLengthValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MinLengthValidator,
  selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("minlength", ctx.enabled() ? ctx.minlength : null);
    }
  },
  inputs: {
    minlength: "minlength"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MIN_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MinLengthValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
      providers: [MIN_LENGTH_VALIDATOR],
      host: {
        '[attr.minlength]': 'enabled() ? minlength : null'
      }
    }]
  }], null, {
    minlength: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Provider which adds `MaxLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MaxLengthValidator),
  multi: true
};
/**
 * A directive that adds max length validation to controls marked with the
 * `maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a maximum length validator
 *
 * The following example shows how to add a maximum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel maxlength="25">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class MaxLengthValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    /** @internal */

    this.inputName = 'maxlength';
    /** @internal */

    this.normalizeInput = input => toInteger(input);
    /** @internal */


    this.createValidator = maxlength => maxLengthValidator(maxlength);
  }

}

MaxLengthValidator.ɵfac = /* @__PURE__ */function () {
  let ɵMaxLengthValidator_BaseFactory;
  return function MaxLengthValidator_Factory(t) {
    return (ɵMaxLengthValidator_BaseFactory || (ɵMaxLengthValidator_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MaxLengthValidator)))(t || MaxLengthValidator);
  };
}();

MaxLengthValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MaxLengthValidator,
  selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("maxlength", ctx.enabled() ? ctx.maxlength : null);
    }
  },
  inputs: {
    maxlength: "maxlength"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAX_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaxLengthValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
      providers: [MAX_LENGTH_VALIDATOR],
      host: {
        '[attr.maxlength]': 'enabled() ? maxlength : null'
      }
    }]
  }], null, {
    maxlength: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @description
 * Provider which adds `PatternValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => PatternValidator),
  multi: true
};
/**
 * @description
 * A directive that adds regex pattern validation to controls marked with the
 * `pattern` attribute. The regex must match the entire control value.
 * The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a pattern validator
 *
 * The following example shows how to add a pattern validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel pattern="[a-zA-Z ]*">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

class PatternValidator {
  constructor() {
    this._validator = nullValidator;
  }
  /** @nodoc */


  ngOnChanges(changes) {
    if ('pattern' in changes) {
      this._createValidator();

      if (this._onChange) this._onChange();
    }
  }
  /**
   * Method that validates whether the value matches the pattern requirement.
   * @nodoc
   */


  validate(control) {
    return this._validator(control);
  }
  /**
   * Registers a callback function to call when the validator inputs change.
   * @nodoc
   */


  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }

  _createValidator() {
    this._validator = patternValidator(this.pattern);
  }

}

PatternValidator.ɵfac = function PatternValidator_Factory(t) {
  return new (t || PatternValidator)();
};

PatternValidator.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: PatternValidator,
  selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function PatternValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("pattern", ctx.pattern ? ctx.pattern : null);
    }
  },
  inputs: {
    pattern: "pattern"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([PATTERN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatternValidator, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
      providers: [PATTERN_VALIDATOR],
      host: {
        '[attr.pattern]': 'pattern ? pattern : null'
      }
    }]
  }], null, {
    pattern: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SHARED_FORM_DIRECTIVES = [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
const TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
const REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */

class ɵInternalFormsSharedModule {}

ɵInternalFormsSharedModule.ɵfac = function ɵInternalFormsSharedModule_Factory(t) {
  return new (t || ɵInternalFormsSharedModule)();
};

ɵInternalFormsSharedModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: ɵInternalFormsSharedModule
});
ɵInternalFormsSharedModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [[RadioControlRegistryModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ɵInternalFormsSharedModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: SHARED_FORM_DIRECTIVES,
      imports: [RadioControlRegistryModule],
      exports: SHARED_FORM_DIRECTIVES
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Exports the required providers and directives for template-driven forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](/guide/forms-overview)
 * @see [Template-driven Forms Guide](/guide/forms)
 *
 * @publicApi
 */


class FormsModule {}

FormsModule.ɵfac = function FormsModule_Factory(t) {
  return new (t || FormsModule)();
};

FormsModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FormsModule
});
FormsModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [ɵInternalFormsSharedModule]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormsModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: TEMPLATE_DRIVEN_DIRECTIVES,
      exports: [ɵInternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();
/**
 * Exports the required infrastructure and directives for reactive forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `FormBuilder`
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](guide/forms-overview)
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @publicApi
 */


class ReactiveFormsModule {
  /**
   * @description
   * Provides options for configuring the reactive forms module.
   *
   * @param opts An object of configuration options
   * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
   * binding is used with reactive form directives.
   */
  static withConfig(opts) {
    return {
      ngModule: ReactiveFormsModule,
      providers: [{
        provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
        useValue: opts.warnOnNgModelWithFormControl
      }]
    };
  }

}

ReactiveFormsModule.ɵfac = function ReactiveFormsModule_Factory(t) {
  return new (t || ReactiveFormsModule)();
};

ReactiveFormsModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: ReactiveFormsModule
});
ReactiveFormsModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [ɵInternalFormsSharedModule]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReactiveFormsModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [REACTIVE_DRIVEN_DIRECTIVES],
      exports: [ɵInternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function isAbstractControlOptions(options) {
  return options.asyncValidators !== undefined || options.validators !== undefined || options.updateOn !== undefined;
}
/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
 * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
 * forms.
 *
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 *
 * @publicApi
 */


class FormBuilder {
  group(controlsConfig, options = null) {
    const controls = this._reduceControls(controlsConfig);

    let validators = null;
    let asyncValidators = null;
    let updateOn = undefined;

    if (options != null) {
      if (isAbstractControlOptions(options)) {
        // `options` are `AbstractControlOptions`
        validators = options.validators != null ? options.validators : null;
        asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
        updateOn = options.updateOn != null ? options.updateOn : undefined;
      } else {
        // `options` are legacy form group options
        validators = options['validator'] != null ? options['validator'] : null;
        asyncValidators = options['asyncValidator'] != null ? options['asyncValidator'] : null;
      }
    }

    return new FormGroup(controls, {
      asyncValidators,
      updateOn,
      validators
    });
  }
  /**
   * @description
   * Construct a new `FormControl` with the given state, validators and options.
   *
   * @param formState Initializes the control with an initial state value, or
   * with an object that contains both a value and a disabled status.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   *
   * @usageNotes
   *
   * ### Initialize a control as disabled
   *
   * The following example returns a control with an initial value in a disabled state.
   *
   * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
   * </code-example>
   */


  control(formState, validatorOrOpts, asyncValidator) {
    return new FormControl(formState, validatorOrOpts, asyncValidator);
  }
  /**
   * Constructs a new `FormArray` from the given array of configurations,
   * validators and options.
   *
   * @param controlsConfig An array of child controls or control configs. Each
   * child control is given an index when it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   */


  array(controlsConfig, validatorOrOpts, asyncValidator) {
    const controls = controlsConfig.map(c => this._createControl(c));
    return new FormArray(controls, validatorOrOpts, asyncValidator);
  }
  /** @internal */


  _reduceControls(controlsConfig) {
    const controls = {};
    Object.keys(controlsConfig).forEach(controlName => {
      controls[controlName] = this._createControl(controlsConfig[controlName]);
    });
    return controls;
  }
  /** @internal */


  _createControl(controlConfig) {
    if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup || controlConfig instanceof FormArray) {
      return controlConfig;
    } else if (Array.isArray(controlConfig)) {
      const value = controlConfig[0];
      const validator = controlConfig.length > 1 ? controlConfig[1] : null;
      const asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
      return this.control(value, validator, asyncValidator);
    } else {
      return this.control(controlConfig);
    }
  }

}

FormBuilder.ɵfac = function FormBuilder_Factory(t) {
  return new (t || FormBuilder)();
};

FormBuilder.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: FormBuilder,
  factory: FormBuilder.ɵfac,
  providedIn: ReactiveFormsModule
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormBuilder, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: ReactiveFormsModule
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @publicApi
 */


const VERSION = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Version('13.0.3');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_modules_main_main_module_ts.js.map