module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/scrapePage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/scrapePage.js":
/*!*********************************!*\
  !*** ./pages/api/scrapePage.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);\n // This is the script\n// based on req.body, call some api to get a webpage\n// scrap page\n// return json here\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((req, res) => {\n  const puppeteer = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n\n  (async () => {\n    var browser = await puppeteer.launch({\n      headless: true\n    });\n    var page = await browser.newPage(); //gos to the facebook link\n\n    await page.goto(req.body.facebooklink, {\n      waitUntil: 'networkidle2'\n    });\n    let facebookStats = await page.evaluate(() => {\n      var followers = document.querySelector('span[class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m\"]').innerText;\n      var name = document.querySelector('h1[class=\"gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl bp9cbjyn j83agx80\"]').innerText;\n      var website = document.querySelector('span[class=\"d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m\"] > a').innerText; //must be in the ' ....facebook.com..../about' page\n      //var category = document.querySelector('div[class=\"ii04i59q a3bd9o3v jq4qci2q oo9gr5id\"]').innerText;\n\n      return {\n        name,\n        followers,\n        website\n      };\n    });\n    console.log(facebookStats);\n  })();\n\n  res.status(200).json({\n    info: 'scrape page',\n    name: req.body.name\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcz85YWY3Il0sIm5hbWVzIjpbInJlcSIsInJlcyIsInB1cHBldGVlciIsInJlcXVpcmUiLCJicm93c2VyIiwibGF1bmNoIiwiaGVhZGxlc3MiLCJwYWdlIiwibmV3UGFnZSIsImdvdG8iLCJib2R5IiwiZmFjZWJvb2tsaW5rIiwid2FpdFVudGlsIiwiZmFjZWJvb2tTdGF0cyIsImV2YWx1YXRlIiwiZm9sbG93ZXJzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJUZXh0IiwibmFtZSIsIndlYnNpdGUiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwianNvbiIsImluZm8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtDQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNlLGdFQUFDQSxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUV6QixRQUFNQyxTQUFTLEdBQUdDLG1CQUFPLENBQUMsNEJBQUQsQ0FBekI7O0FBRUEsR0FBQyxZQUFZO0FBQ2IsUUFBSUMsT0FBTyxHQUFHLE1BQU1GLFNBQVMsQ0FBQ0csTUFBVixDQUFpQjtBQUFDQyxjQUFRLEVBQUU7QUFBWCxLQUFqQixDQUFwQjtBQUNBLFFBQUlDLElBQUksR0FBRyxNQUFNSCxPQUFPLENBQUNJLE9BQVIsRUFBakIsQ0FGYSxDQUdiOztBQUNBLFVBQU1ELElBQUksQ0FBQ0UsSUFBTCxDQUFVVCxHQUFHLENBQUNVLElBQUosQ0FBU0MsWUFBbkIsRUFBaUM7QUFBQ0MsZUFBUyxFQUFFO0FBQVosS0FBakMsQ0FBTjtBQUVBLFFBQUlDLGFBQWEsR0FBRyxNQUFNTixJQUFJLENBQUNPLFFBQUwsQ0FBYyxNQUFNO0FBQzFDLFVBQUlDLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLDRNQUF2QixFQUFxT0MsU0FBclA7QUFDQSxVQUFJQyxJQUFJLEdBQUdILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixtRUFBdkIsRUFBNEZDLFNBQXZHO0FBQ0EsVUFBSUUsT0FBTyxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ05BQXZCLEVBQXlPQyxTQUF2UCxDQUgwQyxDQUkxQztBQUNBOztBQUVBLGFBQU87QUFDSEMsWUFERztBQUVISixpQkFGRztBQUdISztBQUhHLE9BQVA7QUFLSCxLQVp5QixDQUExQjtBQWNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWVQsYUFBWjtBQUVDLEdBdEJEOztBQTJCQVosS0FBRyxDQUFDc0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLFFBQUksRUFBRSxhQUFSO0FBQXVCTixRQUFJLEVBQUVuQixHQUFHLENBQUNVLElBQUosQ0FBU1M7QUFBdEMsR0FBckI7QUFDRCxDQWhDSCIsImZpbGUiOiIuL3BhZ2VzL2FwaS9zY3JhcGVQYWdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVwcGV0ZWVyIH0gZnJvbSBcInB1cHBldGVlclwiXG5cblxuLy8gVGhpcyBpcyB0aGUgc2NyaXB0XG4vLyBiYXNlZCBvbiByZXEuYm9keSwgY2FsbCBzb21lIGFwaSB0byBnZXQgYSB3ZWJwYWdlXG4vLyBzY3JhcCBwYWdlXG4vLyByZXR1cm4ganNvbiBoZXJlXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMpID0+IHtcblxuICAgIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5cbiAgICAoYXN5bmMgKCkgPT4geyBcbiAgICB2YXIgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goe2hlYWRsZXNzOiB0cnVlfSk7XG4gICAgdmFyIHBhZ2UgPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKTsgXG4gICAgLy9nb3MgdG8gdGhlIGZhY2Vib29rIGxpbmtcbiAgICBhd2FpdCBwYWdlLmdvdG8ocmVxLmJvZHkuZmFjZWJvb2tsaW5rLCB7d2FpdFVudGlsOiAnbmV0d29ya2lkbGUyJ30pO1xuXG4gICAgbGV0IGZhY2Vib29rU3RhdHMgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgdmFyIGZvbGxvd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW5bY2xhc3M9XCJkMmVkY3VnMCBocGZ2bXJneiBxdjY2c3cxYiBjMWV0NXVxbCBvaTczMmQ2ZCBpazdkaDNwYSBmZ3h3Y2x6dSBhOGMzN3gxaiBrZW9kNWd3MCBueGhvYWZubSBhaWdzaDlzOSBkOXd3cHBrbiBmZTZrZGQwciBtYXU1NWc5dyBjOGIyODJ5YiBpdjNubzZkYiBqcTRxY2kycSBhM2JkOW8zdiBrbmo1cXluaCBvbzlncjVpZCBoemF3YmM4bVwiXScpLmlubmVyVGV4dDtcbiAgICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMVtjbGFzcz1cImdtcWwwbngwIGw5NG1yYnhkIHAxcmk5YTExIGx6Y2ljNHdsIGJwOWNianluIGo4M2FneDgwXCJdJykuaW5uZXJUZXh0O1xuICAgICAgICB2YXIgd2Vic2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW5bY2xhc3M9XCJkMmVkY3VnMCBocGZ2bXJneiBxdjY2c3cxYiBjMWV0NXVxbCBvaTczMmQ2ZCBpazdkaDNwYSBmZ3h3Y2x6dSBhOGMzN3gxaiBrZW9kNWd3MCBueGhvYWZubSBhaWdzaDlzOSBkOXd3cHBrbiBmZTZrZGQwciBtYXU1NWc5dyBjOGIyODJ5YiBpdjNubzZkYiBqcTRxY2kycSBhM2JkOW8zdiBrbmo1cXluaCBvbzlncjVpZCBoemF3YmM4bVwiXSA+IGEnKS5pbm5lclRleHQ7XG4gICAgICAgIC8vbXVzdCBiZSBpbiB0aGUgJyAuLi4uZmFjZWJvb2suY29tLi4uLi9hYm91dCcgcGFnZVxuICAgICAgICAvL3ZhciBjYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcz1cImlpMDRpNTlxIGEzYmQ5bzN2IGpxNHFjaTJxIG9vOWdyNWlkXCJdJykuaW5uZXJUZXh0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgZm9sbG93ZXJzLFxuICAgICAgICAgICAgd2Vic2l0ZSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZyhmYWNlYm9va1N0YXRzKTtcblxuICAgIH0pKCk7XG5cblxuICAgIFxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBpbmZvOiAnc2NyYXBlIHBhZ2UnLCBuYW1lOiByZXEuYm9keS5uYW1lIH0pXG4gIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/scrapePage.js\n");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"puppeteer\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwdXBwZXRlZXJcIj8wNmZkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InB1cHBldGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///puppeteer\n");

/***/ })

/******/ });