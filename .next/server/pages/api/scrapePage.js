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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next */ \"next\");\n/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst puppeteer = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((req, res) => {\n  (async () => {\n    const browser = await puppeteer.launch({\n      headless: false\n    });\n    const page = await browser.newPage();\n    await page.goto('https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns', {\n      waitUntil: 'networkidle2'\n    });\n    await page.setViewport({\n      width: 1440,\n      height: 746\n    });\n    await page.waitForSelector('.form-group:nth-child(3) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await page.click('.form-group:nth-child(3) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await page.waitForSelector('.form-group:nth-child(4) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await page.click('.form-group:nth-child(4) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await page.waitForSelector('.form-group:nth-child(5) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await page.click('.form-group:nth-child(5) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    await sleep(1000);\n    await page.waitForSelector('.imz-bg > cvs-covid-questionnaire > #content > .footer-content-wrapper > .btn-control');\n    await page.click('.imz-bg > cvs-covid-questionnaire > #content > .footer-content-wrapper > .btn-control');\n    await page.waitForSelector('.form-group > .row > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label');\n    await page.click('.form-group > .row > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label');\n    await sleep(1000);\n    await page.waitForSelector('.imz-bg > cvs-covid-dose-selection > #content > .footer-content-wrapper > .btn-control');\n    await page.click('.imz-bg > cvs-covid-dose-selection > #content > .footer-content-wrapper > .btn-control');\n    await page.waitForSelector('#generic #jurisdiction');\n    await page.click('#generic #jurisdiction');\n    await page.select('#generic #jurisdiction', '42: EID_VA');\n    await sleep(1000);\n    await page.waitForSelector('.imz-bg > cvs-eligibility-covid > #content > .footer-content-wrapper > .btn-control');\n    await page.click('.imz-bg > cvs-eligibility-covid > #content > .footer-content-wrapper > .btn-control');\n    await page.waitForSelector('fieldset #q1_0');\n    await page.click('fieldset #q1_0');\n    await page.type(req.body.age);\n\n    if (parseInt(req.body.age) < 65) {\n      await page.waitForSelector('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label');\n      await page.click('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label');\n    } else {\n      await page.waitForSelector('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label');\n      await page.click('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label');\n    }\n\n    await page.waitForSelector('fieldset #consentText');\n    await page.click('fieldset #consentText');\n    await sleep(1000);\n    await page.waitForSelector('.imz-bg > cvs-eligibility-questionnaire > #content > .footer-content-wrapper > .btn-control');\n    await page.click('.imz-bg > cvs-eligibility-questionnaire > #content > .footer-content-wrapper > .btn-control');\n    await sleep(1000);\n    await page.waitForSelector('.imz-bg > cvs-cvd-how-to-schedule > #content > .footer-content-wrapper > .btn-control');\n    await page.click('.imz-bg > cvs-cvd-how-to-schedule > #content > .footer-content-wrapper > .btn-control');\n    await page.waitForSelector('#generic #address');\n    await page.click('#generic #address');\n    await page.type(req.body.zipcode);\n    await page.waitForSelector('.form-group > .row > .flex-container > .search-icon > img');\n    await page.click('.form-group > .row > .flex-container > .search-icon > img');\n    await sleep(1000);\n    await browser.close();\n  })();\n\n  res.status(200).json({\n    info: 'scrape page',\n    name: req.body.name\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcz85YWY3Il0sIm5hbWVzIjpbInB1cHBldGVlciIsInJlcXVpcmUiLCJyZXEiLCJyZXMiLCJicm93c2VyIiwibGF1bmNoIiwiaGVhZGxlc3MiLCJwYWdlIiwibmV3UGFnZSIsImdvdG8iLCJ3YWl0VW50aWwiLCJzZXRWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0Iiwid2FpdEZvclNlbGVjdG9yIiwiY2xpY2siLCJzbGVlcCIsInNlbGVjdCIsInR5cGUiLCJib2R5IiwiYWdlIiwicGFyc2VJbnQiLCJ6aXBjb2RlIiwiY2xvc2UiLCJzdGF0dXMiLCJqc29uIiwiaW5mbyIsIm5hbWUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBLE1BQU1BLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUF6Qjs7QUFFZSxnRUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFFekIsR0FBQyxZQUFZO0FBRWIsVUFBTUMsT0FBTyxHQUFHLE1BQU1KLFNBQVMsQ0FBQ0ssTUFBVixDQUFpQjtBQUFDQyxjQUFRLEVBQUU7QUFBWCxLQUFqQixDQUF0QjtBQUNBLFVBQU1DLElBQUksR0FBRyxNQUFNSCxPQUFPLENBQUNJLE9BQVIsRUFBbkI7QUFFQSxVQUFNRCxJQUFJLENBQUNFLElBQUwsQ0FBVSxtRUFBVixFQUErRTtBQUFDQyxlQUFTLEVBQUU7QUFBWixLQUEvRSxDQUFOO0FBRUEsVUFBTUgsSUFBSSxDQUFDSSxXQUFMLENBQWlCO0FBQUVDLFdBQUssRUFBRSxJQUFUO0FBQWVDLFlBQU0sRUFBRTtBQUF2QixLQUFqQixDQUFOO0FBRUEsVUFBTU4sSUFBSSxDQUFDTyxlQUFMLENBQXFCLG1HQUFyQixDQUFOO0FBQ0EsVUFBTVAsSUFBSSxDQUFDUSxLQUFMLENBQVcsbUdBQVgsQ0FBTjtBQUdBLFVBQU1SLElBQUksQ0FBQ08sZUFBTCxDQUFxQixtR0FBckIsQ0FBTjtBQUNBLFVBQU1QLElB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QUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsUUFBSSxFQUFFLGFBQVI7QUFBdUJDLFFBQUksRUFBRXpCLEdBQUcsQ0FBQ2lCLElBQUosQ0FBU1E7QUFBdEMsR0FBckI7QUFDRCxDQXpGSCIsImZpbGUiOiIuL3BhZ2VzL2FwaS9zY3JhcGVQYWdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5leHQgZnJvbSBcIm5leHRcIjtcblxuY29uc3QgcHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlclwiKTtcblxuZXhwb3J0IGRlZmF1bHQgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICAoYXN5bmMgKCkgPT4geyBcblxuICAgIGNvbnN0IGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtoZWFkbGVzczogZmFsc2V9KVxuICAgIGNvbnN0IHBhZ2UgPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKVxuICAgIFxuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly93d3cuY3ZzLmNvbS92YWNjaW5lL2ludGFrZS9zdG9yZS9jb3ZpZC1zY3JlZW5lci9jb3ZpZC1xbnMnLCB7d2FpdFVudGlsOiAnbmV0d29ya2lkbGUyJ30pO1xuICAgIFxuICAgIGF3YWl0IHBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTQ0MCwgaGVpZ2h0OiA3NDYgfSk7XG4gIFxuICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCcuZm9ybS1ncm91cDpudGgtY2hpbGQoMykgPiBmaWVsZHNldCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgyKSA+IGxhYmVsJylcbiAgICBhd2FpdCBwYWdlLmNsaWNrKCcuZm9ybS1ncm91cDpudGgtY2hpbGQoMykgPiBmaWVsZHNldCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgyKSA+IGxhYmVsJylcblxuICAgIFxuICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCcuZm9ybS1ncm91cDpudGgtY2hpbGQoNCkgPiBmaWVsZHNldCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgyKSA+IGxhYmVsJylcbiAgICBhd2FpdCBwYWdlLmNsaWNrKCcuZm9ybS1ncm91cDpudGgtY2hpbGQoNCkgPiBmaWVsZHNldCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgyKSA+IGxhYmVsJylcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmZvcm0tZ3JvdXA6bnRoLWNoaWxkKDUpID4gZmllbGRzZXQgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW9CdG4tY29udHJvbDpudGgtY2hpbGQoMikgPiBsYWJlbCcpXG4gICAgYXdhaXQgcGFnZS5jbGljaygnLmZvcm0tZ3JvdXA6bnRoLWNoaWxkKDUpID4gZmllbGRzZXQgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW9CdG4tY29udHJvbDpudGgtY2hpbGQoMikgPiBsYWJlbCcpXG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmltei1iZyA+IGN2cy1jb3ZpZC1xdWVzdGlvbm5haXJlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG4gICAgYXdhaXQgcGFnZS5jbGljaygnLmltei1iZyA+IGN2cy1jb3ZpZC1xdWVzdGlvbm5haXJlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG4gICAgXG4gICAgYXdhaXQgcGFnZS53YWl0Rm9yU2VsZWN0b3IoJy5mb3JtLWdyb3VwID4gLnJvdyA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgxKSA+IGxhYmVsJylcbiAgICBhd2FpdCBwYWdlLmNsaWNrKCcuZm9ybS1ncm91cCA+IC5yb3cgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW9CdG4tY29udHJvbDpudGgtY2hpbGQoMSkgPiBsYWJlbCcpXG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmltei1iZyA+IGN2cy1jb3ZpZC1kb3NlLXNlbGVjdGlvbiA+ICNjb250ZW50ID4gLmZvb3Rlci1jb250ZW50LXdyYXBwZXIgPiAuYnRuLWNvbnRyb2wnKVxuICAgIGF3YWl0IHBhZ2UuY2xpY2soJy5pbXotYmcgPiBjdnMtY292aWQtZG9zZS1zZWxlY3Rpb24gPiAjY29udGVudCA+IC5mb290ZXItY29udGVudC13cmFwcGVyID4gLmJ0bi1jb250cm9sJylcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignI2dlbmVyaWMgI2p1cmlzZGljdGlvbicpXG4gICAgYXdhaXQgcGFnZS5jbGljaygnI2dlbmVyaWMgI2p1cmlzZGljdGlvbicpXG4gICAgXG4gICAgYXdhaXQgcGFnZS5zZWxlY3QoJyNnZW5lcmljICNqdXJpc2RpY3Rpb24nLCAnNDI6IEVJRF9WQScpXG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmltei1iZyA+IGN2cy1lbGlnaWJpbGl0eS1jb3ZpZCA+ICNjb250ZW50ID4gLmZvb3Rlci1jb250ZW50LXdyYXBwZXIgPiAuYnRuLWNvbnRyb2wnKVxuICAgIGF3YWl0IHBhZ2UuY2xpY2soJy5pbXotYmcgPiBjdnMtZWxpZ2liaWxpdHktY292aWQgPiAjY29udGVudCA+IC5mb290ZXItY29udGVudC13cmFwcGVyID4gLmJ0bi1jb250cm9sJylcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignZmllbGRzZXQgI3ExXzAnKVxuICAgIGF3YWl0IHBhZ2UuY2xpY2soJ2ZpZWxkc2V0ICNxMV8wJylcbiAgICBhd2FpdCBwYWdlLnR5cGUocmVxLmJvZHkuYWdlKTtcbiAgICBcblxuICAgIGlmKHBhcnNlSW50KHJlcS5ib2R5LmFnZSkgPCA2NSlcbiAgICB7XG4gICAgICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCcuZm9ybS1ncm91cCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgxKSA+IGxhYmVsJylcbiAgICAgICAgYXdhaXQgcGFnZS5jbGljaygnLmZvcm0tZ3JvdXAgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW9CdG4tY29udHJvbDpudGgtY2hpbGQoMSkgPiBsYWJlbCcpXG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCcuZm9ybS1ncm91cCA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpby1idG4td3JhcHBlciA+IC5yYWRpb0J0bi1jb250cm9sOm50aC1jaGlsZCgxKSA+IGxhYmVsJylcbiAgICAgICAgYXdhaXQgcGFnZS5jbGljaygnLmZvcm0tZ3JvdXAgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW8tYnRuLXdyYXBwZXIgPiAucmFkaW9CdG4tY29udHJvbDpudGgtY2hpbGQoMikgPiBsYWJlbCcpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCdmaWVsZHNldCAjY29uc2VudFRleHQnKVxuICAgIGF3YWl0IHBhZ2UuY2xpY2soJ2ZpZWxkc2V0ICNjb25zZW50VGV4dCcpXG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmltei1iZyA+IGN2cy1lbGlnaWJpbGl0eS1xdWVzdGlvbm5haXJlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG4gICAgYXdhaXQgcGFnZS5jbGljaygnLmltei1iZyA+IGN2cy1lbGlnaWJpbGl0eS1xdWVzdGlvbm5haXJlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmltei1iZyA+IGN2cy1jdmQtaG93LXRvLXNjaGVkdWxlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG4gICAgYXdhaXQgcGFnZS5jbGljaygnLmltei1iZyA+IGN2cy1jdmQtaG93LXRvLXNjaGVkdWxlID4gI2NvbnRlbnQgPiAuZm9vdGVyLWNvbnRlbnQtd3JhcHBlciA+IC5idG4tY29udHJvbCcpXG4gICAgXG4gICAgYXdhaXQgcGFnZS53YWl0Rm9yU2VsZWN0b3IoJyNnZW5lcmljICNhZGRyZXNzJylcbiAgICBhd2FpdCBwYWdlLmNsaWNrKCcjZ2VuZXJpYyAjYWRkcmVzcycpXG4gICAgYXdhaXQgcGFnZS50eXBlKHJlcS5ib2R5LnppcGNvZGUpXG5cbiAgICBcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignLmZvcm0tZ3JvdXAgPiAucm93ID4gLmZsZXgtY29udGFpbmVyID4gLnNlYXJjaC1pY29uID4gaW1nJylcbiAgICBhd2FpdCBwYWdlLmNsaWNrKCcuZm9ybS1ncm91cCA+IC5yb3cgPiAuZmxleC1jb250YWluZXIgPiAuc2VhcmNoLWljb24gPiBpbWcnKVxuICAgIFxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgIFxuICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKVxuICAgICAgICB9KSgpO1xuXG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGluZm86ICdzY3JhcGUgcGFnZScsIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfSlcbiAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/scrapePage.js\n");

/***/ }),

/***/ "next":
/*!***********************!*\
  !*** external "next" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0XCI/ZWQ4YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next\n");

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