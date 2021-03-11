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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);\n // This is the script\n// based on req.body, call some api to get a webpage\n// scrap page\n// return json here\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((req, res) => {\n  const puppeteer = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n\n  (async () => {\n    var browser = await puppeteer.launch({\n      headless: false\n    });\n    var page = await browser.newPage(); //gos to the facebook link\n\n    await page.goto(req.body.facebooklink, {\n      waitUntil: 'networkidle2'\n    });\n    let facebookStats = await page.evaluate(() => {\n      var name = document.querySelector('a[class=\"_64-f\"]').innerText;\n      var likes = document.querySelectorAll('div[class=\"_4-u2 _6590 _3xaf _4-u8\"] > div > div > div > div')[1].innerText; //var followers = document.querySelectorAll('div[class=\"_4-u2 _6590 _3xaf _4-u8\"] > div')[2].innerText;\n\n      var website = document.querySelector('#u_0_q_x4').innerText; //var category = document.querySelectorAll('div[class=\"_4-u2 _u9q _3xaf _4-u8\"] > div ')[3].innerText;\n\n      var type = 'facebook';\n      var url = req.body.facebooklink;\n      return {\n        type,\n        url,\n        name,\n        likes,\n        //followers,\n        website //category,\n\n      };\n    });\n    console.log(facebookStats); //goes to the youtube link \n\n    const ytAboutLink = req.body.youtubelink + '/about';\n    await page.goto(ytAboutLink); //makes sure the page is loaded\n\n    await document.querySelector('#channel-name').innerText;\n    let youtubeStats = await page.evaluate(() => {\n      var name = document.querySelector('#channel-name').innerText;\n      var description = document.querySelector('#description').innerText; //var rightColumn = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;\n\n      var views = '100,000';\n      var subscribers = document.querySelector('#subscriber-count').innerText;\n      var type = 'youtube';\n      var url = req.body.youtubelink;\n      return {\n        type,\n        url,\n        name,\n        description,\n        views,\n        subscribers\n      };\n    });\n    console.log(youtubeStats); //go to instagram\n\n    await page.goto(req.body.instagramlink, {\n      waitUntil: 'networkidle2'\n    });\n    let instagramStats = await page.evaluate(() => {\n      const mainStats = document.querySelectorAll('span[class=\"g47SY \"]');\n      var username = document.querySelector('h2[class=\"_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     \"]').innerText;\n      var name = document.querySelector('h1[class=\"rhpdm\"]').innerText; //change title to innerText to be formatted the way instagram does. \n\n      var numPosts = mainStats[0].innerText;\n      var numFollowers = mainStats[1].title;\n      var numFollowing = mainStats[2].innerText;\n      var bio = document.querySelector('div[class=\"-vDIg\"] > span').innerText;\n      var website = document.querySelector('div[class=\"-vDIg\"] > a').innerText;\n      var type = 'instagram';\n      var url = req.body.instagramlink;\n      return {\n        type,\n        url,\n        username,\n        name,\n        bio,\n        website,\n        numFollowers,\n        numPosts,\n        numFollowing\n      };\n    });\n    console.log(instagramStats);\n    await browser.close();\n  })();\n\n  res.status(200).json({\n    info: 'scrape page',\n    name: req.body.name\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcz85YWY3Il0sIm5hbWVzIjpbInJlcSIsInJlcyIsInB1cHBldGVlciIsInJlcXVpcmUiLCJicm93c2VyIiwibGF1bmNoIiwiaGVhZGxlc3MiLCJwYWdlIiwibmV3UGFnZSIsImdvdG8iLCJib2R5IiwiZmFjZWJvb2tsaW5rIiwid2FpdFVudGlsIiwiZmFjZWJvb2tTdGF0cyIsImV2YWx1YXRlIiwibmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsImxpa2VzIiwicXVlcnlTZWxlY3RvckFsbCIsIndlYnNpdGUiLCJ0eXBlIiwidXJsIiwiY29uc29sZSIsImxvZyIsInl0QWJvdXRMaW5rIiwieW91dHViZWxpbmsiLCJ5b3V0dWJlU3RhdHMiLCJkZXNjcmlwdGlvbiIsInZpZXdzIiwic3Vic2NyaWJlcnMiLCJpbnN0YWdyYW1saW5rIiwiaW5zdGFncmFtU3RhdHMiLCJtYWluU3RhdHMiLCJ1c2VybmFtZSIsIm51bVBvc3RzIiwibnVtRm9sbG93ZXJzIiwidGl0bGUiLCJudW1Gb2xsb3dpbmciLCJiaW8iLCJjbG9zZSIsInN0YXR1cyIsImpzb24iLCJpbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7Q0FHQTtBQUNBO0FBQ0E7QUFDQTs7QUFDZSxnRUFBQ0EsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFFekIsUUFBTUMsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXpCOztBQUVBLEdBQUMsWUFBWTtBQUNiLFFBQUlDLE9BQU8sR0FBRyxNQUFNRixTQUFTLENBQUNHLE1BQVYsQ0FBaUI7QUFBQ0MsY0FBUSxFQUFFO0FBQVgsS0FBakIsQ0FBcEI7QUFDQSxRQUFJQyxJQUFJLEdBQUcsTUFBTUgsT0FBTyxDQUFDSSxPQUFSLEVBQWpCLENBRmEsQ0FJYjs7QUFDQSxVQUFNRCxJQUFJLENBQUNFLElBQUwsQ0FBVVQsR0FBRyxDQUFDVSxJQUFKLENBQVND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YUFBVCxDQUF1QiwyQkFBdkIsRUFBb0RDLFNBQTlEO0FBQ0EsVUFBSUcsT0FBTyxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsd0JBQXZCLEVBQWlEQyxTQUEvRDtBQUVBLFVBQUlJLElBQUksR0FBRyxXQUFYO0FBQ0EsVUFBSUMsR0FBRyxHQUFHdkIsR0FBRyxDQUFDVSxJQUFKLENBQVNzQixhQUFuQjtBQUVBLGFBQU87QUFDSFYsWUFERztBQUVIQyxXQUZHO0FBR0hZLGdCQUhHO0FBSUhwQixZQUpHO0FBS0h5QixXQUxHO0FBTUhuQixlQU5HO0FBT0hnQixvQkFQRztBQVFIRCxnQkFSRztBQVNIRztBQVRHLE9BQVA7QUFXSCxLQTdCMEIsQ0FBM0I7QUErQkFmLFdBQU8sQ0FBQ0MsR0FBUixDQUFZUSxjQUFaO0FBR0EsVUFBTTdCLE9BQU8sQ0FBQ3FDLEtBQVIsRUFBTjtBQUVDLEdBbkdEOztBQXdHQXhDLEtBQUcsQ0FBQ3lDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxRQUFJLEVBQUUsYUFBUjtBQUF1QjdCLFFBQUksRUFBRWYsR0FBRyxDQUFDVSxJQUFKLENBQVNLO0FBQXRDLEdBQXJCO0FBQ0QsQ0E3R0giLCJmaWxlIjoiLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1cHBldGVlciB9IGZyb20gXCJwdXBwZXRlZXJcIlxuXG5cbi8vIFRoaXMgaXMgdGhlIHNjcmlwdFxuLy8gYmFzZWQgb24gcmVxLmJvZHksIGNhbGwgc29tZSBhcGkgdG8gZ2V0IGEgd2VicGFnZVxuLy8gc2NyYXAgcGFnZVxuLy8gcmV0dXJuIGpzb24gaGVyZVxuZXhwb3J0IGRlZmF1bHQgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCBwdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpO1xuXG4gICAgKGFzeW5jICgpID0+IHsgXG4gICAgdmFyIGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtoZWFkbGVzczogZmFsc2V9KTtcbiAgICB2YXIgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpOyBcblxuICAgIC8vZ29zIHRvIHRoZSBmYWNlYm9vayBsaW5rXG4gICAgYXdhaXQgcGFnZS5nb3RvKHJlcS5ib2R5LmZhY2Vib29rbGluaywge3dhaXRVbnRpbDogJ25ldHdvcmtpZGxlMid9KTtcblxuICAgIGxldCBmYWNlYm9va1N0YXRzID0gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgIHZhciBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtjbGFzcz1cIl82NC1mXCJdJykuaW5uZXJUZXh0O1xuICAgICAgICB2YXIgbGlrZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbY2xhc3M9XCJfNC11MiBfNjU5MCBfM3hhZiBfNC11OFwiXSA+IGRpdiA+IGRpdiA+IGRpdiA+IGRpdicpWzFdLmlubmVyVGV4dDtcbiAgICAgICAgLy92YXIgZm9sbG93ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2NsYXNzPVwiXzQtdTIgXzY1OTAgXzN4YWYgXzQtdThcIl0gPiBkaXYnKVsyXS5pbm5lclRleHQ7XG4gICAgICAgIHZhciB3ZWJzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VfMF9xX3g0JykuaW5uZXJUZXh0O1xuICAgICAgICAvL3ZhciBjYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltjbGFzcz1cIl80LXUyIF91OXEgXzN4YWYgXzQtdThcIl0gPiBkaXYgJylbM10uaW5uZXJUZXh0O1xuXG4gICAgICAgIHZhciB0eXBlID0gJ2ZhY2Vib29rJztcbiAgICAgICAgdmFyIHVybCA9IHJlcS5ib2R5LmZhY2Vib29rbGluaztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBsaWtlcyxcbiAgICAgICAgICAgIC8vZm9sbG93ZXJzLFxuICAgICAgICAgICAgd2Vic2l0ZSxcbiAgICAgICAgICAgIC8vY2F0ZWdvcnksXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coZmFjZWJvb2tTdGF0cyk7XG5cbiAgICAvL2dvZXMgdG8gdGhlIHlvdXR1YmUgbGluayBcbiAgICBjb25zdCB5dEFib3V0TGluayA9IHJlcS5ib2R5LnlvdXR1YmVsaW5rICsgJy9hYm91dCc7XG4gICAgYXdhaXQgcGFnZS5nb3RvKHl0QWJvdXRMaW5rKTtcbiAgICAvL21ha2VzIHN1cmUgdGhlIHBhZ2UgaXMgbG9hZGVkXG4gICAgYXdhaXQgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5uZWwtbmFtZScpLmlubmVyVGV4dDtcblxuICAgIGxldCB5b3V0dWJlU3RhdHMgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcblxuICAgICAgICB2YXIgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsLW5hbWUnKS5pbm5lclRleHQ7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLmlubmVyVGV4dDtcbiAgICAgICAgLy92YXIgcmlnaHRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcmlnaHQtY29sdW1uID4geXQtZm9ybWF0dGVkLXN0cmluZycpWzJdLmlubmVyVGV4dDtcbiAgICAgICAgdmFyIHZpZXdzID0gJzEwMCwwMDAnO1xuICAgICAgICB2YXIgc3Vic2NyaWJlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3Vic2NyaWJlci1jb3VudCcpLmlubmVyVGV4dDtcblxuXG4gICAgICAgIHZhciB0eXBlID0gJ3lvdXR1YmUnO1xuICAgICAgICB2YXIgdXJsID0gcmVxLmJvZHkueW91dHViZWxpbms7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB2aWV3cyxcbiAgICAgICAgICAgIHN1YnNjcmliZXJzLFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKHlvdXR1YmVTdGF0cyk7XG5cbiAgICAvL2dvIHRvIGluc3RhZ3JhbVxuICAgIGF3YWl0IHBhZ2UuZ290byhyZXEuYm9keS5pbnN0YWdyYW1saW5rLCB7d2FpdFVudGlsOiAnbmV0d29ya2lkbGUyJ30pO1xuXG4gICAgbGV0IGluc3RhZ3JhbVN0YXRzID0gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbWFpblN0YXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbltjbGFzcz1cImc0N1NZIFwiXScpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDJbY2xhc3M9XCJfN1VoVzkgICAgICAgZktGYmwgeVVFRVggICBLVi1ENCAgICAgICAgICAgICAgZkR4WWwgICAgIFwiXScpLmlubmVyVGV4dDtcbiAgICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMVtjbGFzcz1cInJocGRtXCJdJykuaW5uZXJUZXh0O1xuXG4gICAgICAgIC8vY2hhbmdlIHRpdGxlIHRvIGlubmVyVGV4dCB0byBiZSBmb3JtYXR0ZWQgdGhlIHdheSBpbnN0YWdyYW0gZG9lcy4gXG4gICAgICAgIHZhciBudW1Qb3N0cyA9IG1haW5TdGF0c1swXS5pbm5lclRleHQ7IFxuICAgICAgICB2YXIgbnVtRm9sbG93ZXJzID0gbWFpblN0YXRzWzFdLnRpdGxlO1xuICAgICAgICB2YXIgbnVtRm9sbG93aW5nID0gbWFpblN0YXRzWzJdLmlubmVyVGV4dDtcblxuICAgICAgICB2YXIgYmlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzPVwiLXZESWdcIl0gPiBzcGFuJykuaW5uZXJUZXh0O1xuICAgICAgICB2YXIgd2Vic2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcz1cIi12RElnXCJdID4gYScpLmlubmVyVGV4dDtcblxuICAgICAgICB2YXIgdHlwZSA9ICdpbnN0YWdyYW0nO1xuICAgICAgICB2YXIgdXJsID0gcmVxLmJvZHkuaW5zdGFncmFtbGluaztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGJpbywgXG4gICAgICAgICAgICB3ZWJzaXRlLFxuICAgICAgICAgICAgbnVtRm9sbG93ZXJzLFxuICAgICAgICAgICAgbnVtUG9zdHMsXG4gICAgICAgICAgICBudW1Gb2xsb3dpbmcsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coaW5zdGFncmFtU3RhdHMpO1xuXG5cbiAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG5cbiAgICB9KSgpO1xuXG5cbiAgICBcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgaW5mbzogJ3NjcmFwZSBwYWdlJywgbmFtZTogcmVxLmJvZHkubmFtZSB9KVxuICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/scrapePage.js\n");

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