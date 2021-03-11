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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);\n // This is the script\n// based on req.body, call some api to get a webpage\n// scrap page\n// return json here\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((req, res) => {\n  const puppeteer = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n\n  (async () => {\n    var browser = await puppeteer.launch({\n      headless: false\n    });\n    var page = await browser.newPage(); //gos to the facebook link\n\n    await page.goto(req.body.facebooklink, {\n      waitUntil: 'networkidle2'\n    });\n    let facebookStats = await page.evaluate(() => {\n      var name = document.querySelector('a[class=\"_64-f\"]').innerText;\n      var likes = document.querySelectorAll('div[class=\"_4-u2 _6590 _3xaf _4-u8\"] > div')[1].innerText;\n      var followers = document.querySelectorAll('div[class=\"_4-u2 _6590 _3xaf _4-u8\"] > div')[2].innerText;\n      var website = document.querySelector('#u_0_q_x4').innerText;\n      var category = document.querySelectorAll('div[class=\"_4-u2 _u9q _3xaf _4-u8\"] > div ')[3].innerText;\n      return {\n        name,\n        likes,\n        followers,\n        website,\n        category\n      };\n    });\n    console.log(facebookStats); //goes to the youtube link \n\n    const ytAboutLink = req.body.youtubelink + '/about';\n    await page.goto(ytAboutLink); //makes sure the page is loaded\n\n    await document.querySelector('#channel-name').innerText;\n    let youtubeStats = await page.evaluate(() => {\n      var name = document.querySelector('#channel-name').innerText;\n      var description = document.querySelector('#description').innerText; //var rightColumn = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;\n\n      var views = '100,000';\n      var subscribers = document.querySelector('#subscriber-count').innerText;\n      return {\n        name,\n        description,\n        views,\n        subscribers\n      };\n    });\n    console.log(youtubeStats); //go to instagram\n\n    await page.goto(req.body.instagramlink, {\n      waitUntil: 'networkidle2'\n    });\n    let instagramStats = await page.evaluate(() => {\n      const mainStats = document.querySelectorAll('span[class=\"g47SY \"]');\n      var username = document.querySelector('h2[class=\"_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     \"]').innerText;\n      var name = document.querySelector('h1[class=\"rhpdm\"]').innerText; //change title to innerText to be formatted the way instagram does. \n\n      var numPosts = mainStats[0].innerText;\n      var numFollowers = mainStats[1].title;\n      var numFollowing = mainStats[2].innerText;\n      var bio = document.querySelector('div[class=\"-vDIg\"] > span').innerText;\n      var website = document.querySelector('div[class=\"-vDIg\"] > a').innerText;\n      return {\n        name,\n        username,\n        numFollowers,\n        numPosts,\n        numFollowing,\n        bio,\n        website\n      };\n    });\n    console.log(instagramStats);\n    await browser.close();\n  })();\n\n  res.status(200).json({\n    info: 'scrape page',\n    name: req.body.name\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcz85YWY3Il0sIm5hbWVzIjpbInJlcSIsInJlcyIsInB1cHBldGVlciIsInJlcXVpcmUiLCJicm93c2VyIiwibGF1bmNoIiwiaGVhZGxlc3MiLCJwYWdlIiwibmV3UGFnZSIsImdvdG8iLCJib2R5IiwiZmFjZWJvb2tsaW5rIiwid2FpdFVudGlsIiwiZmFjZWJvb2tTdGF0cyIsImV2YWx1YXRlIiwibmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsImxpa2VzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvbGxvd2VycyIsIndlYnNpdGUiLCJjYXRlZ29yeSIsImNvbnNvbGUiLCJsb2ciLCJ5dEFib3V0TGluayIsInlvdXR1YmVsaW5rIiwieW91dHViZVN0YXRzIiwiZGVzY3JpcHRpb24iLCJ2aWV3cyIsInN1YnNjcmliZXJzIiwiaW5zdGFncmFtbGluayIsImluc3RhZ3JhbVN0YXRzIiwibWFpblN0YXRzIiwidXNlcm5hbWUiLCJudW1Qb3N0cyIsIm51bUZvbGxvd2VycyIsInRpdGxlIiwibnVtRm9sbG93aW5nIiwiYmlvIiwiY2xvc2UiLCJzdGF0dXMiLCJqc29uIiwiaW5mbyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0NBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ2UsZ0VBQUNBLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBRXpCLFFBQU1DLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUF6Qjs7QUFFQSxHQUFDLFlBQVk7QUFDYixRQUFJQyxPQUFPLEdBQUcsTUFBTUYsU0FBUyxDQUFDRyxNQUFWLENBQWlCO0FBQUNDLGNBQVEsRUFBRTtBQUFYLEtBQWpCLENBQXBCO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLE1BQU1ILE9BQU8sQ0FBQ0ksT0FBUixFQUFqQixDQUZhLENBSWI7O0FBQ0EsVUFBTUQsSUFBSSxDQUFDRSxJQUFMLENBQVVULEdBQUcsQ0FBQ1Us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USxDQUFDQyxhQUFULENBQXVCLHdCQUF2QixFQUFpREMsU0FBL0Q7QUFFQSxhQUFPO0FBQ0hILFlBREc7QUFFSG9CLGdCQUZHO0FBR0hFLG9CQUhHO0FBSUhELGdCQUpHO0FBS0hHLG9CQUxHO0FBTUhDLFdBTkc7QUFPSGxCO0FBUEcsT0FBUDtBQVNILEtBMUIwQixDQUEzQjtBQTRCQUUsV0FBTyxDQUFDQyxHQUFSLENBQVlRLGNBQVo7QUFHQSxVQUFNN0IsT0FBTyxDQUFDcUMsS0FBUixFQUFOO0FBRUMsR0F0RkQ7O0FBMkZBeEMsS0FBRyxDQUFDeUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLFFBQUksRUFBRSxhQUFSO0FBQXVCN0IsUUFBSSxFQUFFZixHQUFHLENBQUNVLElBQUosQ0FBU0s7QUFBdEMsR0FBckI7QUFDRCxDQWhHSCIsImZpbGUiOiIuL3BhZ2VzL2FwaS9zY3JhcGVQYWdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVwcGV0ZWVyIH0gZnJvbSBcInB1cHBldGVlclwiXG5cblxuLy8gVGhpcyBpcyB0aGUgc2NyaXB0XG4vLyBiYXNlZCBvbiByZXEuYm9keSwgY2FsbCBzb21lIGFwaSB0byBnZXQgYSB3ZWJwYWdlXG4vLyBzY3JhcCBwYWdlXG4vLyByZXR1cm4ganNvbiBoZXJlXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMpID0+IHtcblxuICAgIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5cbiAgICAoYXN5bmMgKCkgPT4geyBcbiAgICB2YXIgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goe2hlYWRsZXNzOiBmYWxzZX0pO1xuICAgIHZhciBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7IFxuXG4gICAgLy9nb3MgdG8gdGhlIGZhY2Vib29rIGxpbmtcbiAgICBhd2FpdCBwYWdlLmdvdG8ocmVxLmJvZHkuZmFjZWJvb2tsaW5rLCB7d2FpdFVudGlsOiAnbmV0d29ya2lkbGUyJ30pO1xuXG4gICAgbGV0IGZhY2Vib29rU3RhdHMgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2NsYXNzPVwiXzY0LWZcIl0nKS5pbm5lclRleHQ7XG4gICAgICAgIHZhciBsaWtlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltjbGFzcz1cIl80LXUyIF82NTkwIF8zeGFmIF80LXU4XCJdID4gZGl2JylbMV0uaW5uZXJUZXh0O1xuICAgICAgICB2YXIgZm9sbG93ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2NsYXNzPVwiXzQtdTIgXzY1OTAgXzN4YWYgXzQtdThcIl0gPiBkaXYnKVsyXS5pbm5lclRleHQ7XG4gICAgICAgIHZhciB3ZWJzaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VfMF9xX3g0JykuaW5uZXJUZXh0O1xuICAgICAgICB2YXIgY2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbY2xhc3M9XCJfNC11MiBfdTlxIF8zeGFmIF80LXU4XCJdID4gZGl2ICcpWzNdLmlubmVyVGV4dDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGxpa2VzLFxuICAgICAgICAgICAgZm9sbG93ZXJzLFxuICAgICAgICAgICAgd2Vic2l0ZSxcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKGZhY2Vib29rU3RhdHMpO1xuXG4gICAgLy9nb2VzIHRvIHRoZSB5b3V0dWJlIGxpbmsgXG4gICAgY29uc3QgeXRBYm91dExpbmsgPSByZXEuYm9keS55b3V0dWJlbGluayArICcvYWJvdXQnO1xuICAgIGF3YWl0IHBhZ2UuZ290byh5dEFib3V0TGluayk7XG4gICAgLy9tYWtlcyBzdXJlIHRoZSBwYWdlIGlzIGxvYWRlZFxuICAgIGF3YWl0IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsLW5hbWUnKS5pbm5lclRleHQ7XG5cbiAgICBsZXQgeW91dHViZVN0YXRzID0gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG5cbiAgICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbm5lbC1uYW1lJykuaW5uZXJUZXh0O1xuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS5pbm5lclRleHQ7XG4gICAgICAgIC8vdmFyIHJpZ2h0Q29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3JpZ2h0LWNvbHVtbiA+IHl0LWZvcm1hdHRlZC1zdHJpbmcnKVsyXS5pbm5lclRleHQ7XG4gICAgICAgIHZhciB2aWV3cyA9ICcxMDAsMDAwJztcbiAgICAgICAgdmFyIHN1YnNjcmliZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1YnNjcmliZXItY291bnQnKS5pbm5lclRleHQ7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdmlld3MsXG4gICAgICAgICAgICBzdWJzY3JpYmVycyxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZyh5b3V0dWJlU3RhdHMpO1xuXG4gICAgLy9nbyB0byBpbnN0YWdyYW1cbiAgICBhd2FpdCBwYWdlLmdvdG8ocmVxLmJvZHkuaW5zdGFncmFtbGluaywge3dhaXRVbnRpbDogJ25ldHdvcmtpZGxlMid9KTtcblxuICAgIGxldCBpbnN0YWdyYW1TdGF0cyA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1haW5TdGF0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW5bY2xhc3M9XCJnNDdTWSBcIl0nKTtcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciB1c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyW2NsYXNzPVwiXzdVaFc5ICAgICAgIGZLRmJsIHlVRUVYICAgS1YtRDQgICAgICAgICAgICAgIGZEeFlsICAgICBcIl0nKS5pbm5lclRleHQ7XG4gICAgICAgIHZhciBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDFbY2xhc3M9XCJyaHBkbVwiXScpLmlubmVyVGV4dDtcblxuICAgICAgICAvL2NoYW5nZSB0aXRsZSB0byBpbm5lclRleHQgdG8gYmUgZm9ybWF0dGVkIHRoZSB3YXkgaW5zdGFncmFtIGRvZXMuIFxuICAgICAgICB2YXIgbnVtUG9zdHMgPSBtYWluU3RhdHNbMF0uaW5uZXJUZXh0OyBcbiAgICAgICAgdmFyIG51bUZvbGxvd2VycyA9IG1haW5TdGF0c1sxXS50aXRsZTtcbiAgICAgICAgdmFyIG51bUZvbGxvd2luZyA9IG1haW5TdGF0c1syXS5pbm5lclRleHQ7XG5cbiAgICAgICAgdmFyIGJpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcz1cIi12RElnXCJdID4gc3BhbicpLmlubmVyVGV4dDtcbiAgICAgICAgdmFyIHdlYnNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3M9XCItdkRJZ1wiXSA+IGEnKS5pbm5lclRleHQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIG51bUZvbGxvd2VycyxcbiAgICAgICAgICAgIG51bVBvc3RzLFxuICAgICAgICAgICAgbnVtRm9sbG93aW5nLFxuICAgICAgICAgICAgYmlvLCBcbiAgICAgICAgICAgIHdlYnNpdGUsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coaW5zdGFncmFtU3RhdHMpO1xuXG5cbiAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG5cbiAgICB9KSgpO1xuXG5cbiAgICBcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgaW5mbzogJ3NjcmFwZSBwYWdlJywgbmFtZTogcmVxLmJvZHkubmFtZSB9KVxuICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/scrapePage.js\n");

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