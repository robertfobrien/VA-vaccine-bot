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
eval("__webpack_require__.r(__webpack_exports__);\nconst puppeteer = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n\nconst ig = __webpack_require__(/*! instagram-scraping */ \"instagram-scraping\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((req, res) => {\n  (async () => {\n    let browser = await puppeteer.launch({\n      headless: true\n    }); //turn to FALSE to debug\n\n    console.log('SCRAPING...');\n    let page = await browser.newPage();\n\n    if (req.body.youtubelink != \"\") {\n      await page.goto(req.body.youtubelink + '/about', {\n        waitUntil: 'networkidle2'\n      });\n      let youtubeStats = await page.evaluate(() => {\n        var name = document.querySelector('#channel-name > div > div').innerText;\n        var description = document.querySelector('#description').innerText;\n        var subscriberString = document.querySelector('#subscriber-count').innerText;\n        subscriberString = subscriberString.slice(0, subscriberString.length - 12);\n        var endLetter = document.querySelector('#subscriber-count').innerText.slice(0, document.querySelector('#subscriber-count').innerText.length - 12);\n        endLetter = endLetter.slice(endLetter.length - 1);\n        var subscriberPrefix = subscriberString.slice(0, subscriberString.length - 1);\n        if (endLetter == \"K\") var subscriberNum = parseInt(parseFloat(subscriberPrefix) * 1000);else if (endLetter == \"M\") var subscriberNum = parseInt(parseFloat(subscriberPrefix) * 1000000);else var subscriberNum = parseInt(subscriberString);\n        var viewsString = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;\n        viewsString = viewsString.slice(0, viewsString.length - 6);\n        viewsString = viewsString.replace(',', '');\n        viewsString = viewsString.replace(',', '');\n        viewsString = viewsString.replace(',', '');\n        var type = 'youtube';\n        var viewsNum = parseInt(viewsString);\n        return {\n          type,\n          name,\n          description,\n          //viewsString,\n          viewsNum,\n          subscriberString,\n          subscriberNum\n        };\n      });\n      await page.goto(req.body.youtubelink + \"/featured\", {\n        waitUntil: 'networkidle2'\n      });\n      let videoStats = await page.evaluate(() => {\n        var videos = [];\n\n        for (i = 0; i < 10; i++) {\n          videos[i] = document.querySelectorAll('#items > ytd-grid-video-renderer')[i].innerText;\n        }\n\n        var type = 'youtube-videos';\n        return {\n          type,\n          videos\n        };\n      });\n      console.log(youtubeStats);\n      console.log(videoStats);\n    }\n\n    if (req.body.instagramlink != \"\") {\n      // using username for scraping\n      const positionOfUser = req.body.instagramlink.search('.com/');\n      let instaUser = req.body.instagramlink.slice(positionOfUser + 5); //26\n\n      const positionOfSlash = instaUser.search('/');\n      instaUser = instaUser.slice(0, positionOfSlash);\n      var username, numFollowers, numFollowing, bio, website, numPosts, posts, fullName;\n      let instagramStats = ig.scrapeUserPage(instaUser).then(result => {\n        username = instaUser;\n        numFollowers = result.user.edge_followed_by.count;\n        numFollowing = result.user.edge_follow.count;\n        bio = result.user.biography;\n        website = result.user.external_url;\n        posts = [];\n        numPosts = result.total;\n        console.log(\"username: '\" + username + \"',\");\n        console.log(\"numFollowers: '\" + numFollowers + \"',\");\n        console.log(\"numFollowing: '\" + numFollowing + \"',\");\n        console.log(\"bio: '\" + bio + \"',\");\n        console.log(\"website: '\" + website + \"',\");\n        console.log(\"posts: \" + posts + \",\");\n        console.log(\"numPosts: \" + numPosts + \",\");\n\n        for (var i = 0; i < result.total; i++) {\n          var numLikes = result.medias[i].like_count;\n          var numComments = result.medias[i].comment_count;\n          posts[i] = {\n            numLikes,\n            numComments\n          };\n        }\n\n        fullName = user.full_name;\n        return {\n          fullName,\n          username,\n          numPosts,\n          numFollowers,\n          numFollowing,\n          bio,\n          website,\n          posts\n        };\n      });\n      console.log(instagramStats);\n    }\n\n    await browser.close();\n  })();\n\n  res.status(200).json({\n    info: 'scrape page',\n    name: req.body.name\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcz85YWY3Il0sIm5hbWVzIjpbInB1cHBldGVlciIsInJlcXVpcmUiLCJpZyIsInJlcSIsInJlcyIsImJyb3dzZXIiLCJsYXVuY2giLCJoZWFkbGVzcyIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIiwibmV3UGFnZSIsImJvZHkiLCJ5b3V0dWJlbGluayIsImdvdG8iLCJ3YWl0VW50aWwiLCJ5b3V0dWJlU3RhdHMiLCJldmFsdWF0ZSIsIm5hbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lclRleHQiLCJkZXNjcmlwdGlvbiIsInN1YnNjcmliZXJTdHJpbmciLCJzbGljZSIsImxlbmd0aCIsImVuZExldHRlciIsInN1YnNjcmliZXJQcmVmaXgiLCJzdWJzY3JpYmVyTnVtIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0Iiwidmlld3NTdHJpbmciLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVwbGFjZSIsInR5cGUiLCJ2aWV3c051bSIsInZpZGVvU3RhdHMiLCJ2aWRlb3MiLCJpIiwiaW5zdGFncmFtbGluayIsInBvc2l0aW9uT2ZVc2VyIiwic2VhcmNoIiwiaW5zdGFVc2VyIiwicG9zaXRpb25PZlNsYXNoIiwidXNlcm5hbWUiLCJudW1Gb2xsb3dlcnMiLCJudW1Gb2xsb3dpbmciLCJiaW8iLCJ3ZWJzaXRlIiwibnVtUG9zdHMiLCJwb3N0cyIsImZ1bGxOYW1lIiwiaW5zdGFncmFtU3RhdHMiLCJzY3JhcGVVc2VyUGFnZSIsInRoZW4iLCJyZXN1bHQiLCJ1c2VyIiwiZWRnZV9mb2xsb3dlZF9ieSIsImNvdW50IiwiZWRnZV9mb2xsb3ciLCJiaW9ncmFwaHkiLCJleHRlcm5hbF91cmwiLCJ0b3RhbCIsIm51bUxpa2VzIiwibWVkaWFzIiwibGlrZV9jb3VudCIsIm51bUNvbW1lbnRzIiwiY29tbWVudF9jb3VudCIsImZ1bGxfbmFtZSIsImNsb3NlIiwic3RhdHVzIiwianNvbiIsImluZm8iXSwi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QXJDO0FBQ0F4QyxlQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFZeUMsS0FBWixHQUFvQixHQUFoQztBQUNBMUMsZUFBTyxDQUFDQyxHQUFSLENBQVksZUFBZXdDLFFBQWYsR0FBMEIsR0FBdEM7O0FBRUEsYUFBSSxJQUFJWCxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdpQixNQUFNLENBQUNPLEtBQTFCLEVBQWlDeEIsQ0FBQyxFQUFsQyxFQUNBO0FBQ0ksY0FBSXlCLFFBQVEsR0FBR1IsTUFBTSxDQUFDUyxNQUFQLENBQWMxQixDQUFkLEVBQWlCMkIsVUFBaEM7QUFDQSxjQUFJQyxXQUFXLEdBQUdYLE1BQU0sQ0FBQ1MsTUFBUCxDQUFjMUIsQ0FBZCxFQUFpQjZCLGFBQW5DO0FBQ0FqQixlQUFLLENBQUNaLENBQUQsQ0FBTCxHQUFXO0FBQ1B5QixvQkFETztBQUVQRztBQUZPLFdBQVg7QUFJSDs7QUFDRGYsZ0JBQVEsR0FBR0ssSUFBSSxDQUFDWSxTQUFoQjtBQUVBLGVBQU87QUFDSGpCLGtCQURHO0FBRUhQLGtCQUZHO0FBR0hLLGtCQUhHO0FBSUhKLHNCQUpHO0FBS0hDLHNCQUxHO0FBTUhDLGFBTkc7QUFPSEMsaUJBUEc7QUFRSEU7QUFSRyxTQUFQO0FBVUgsT0F0Q29CLENBQXJCO0FBd0NBMUMsYUFBTyxDQUFDQyxHQUFSLENBQVkyQyxjQUFaO0FBUUg7O0FBRUcsVUFBTS9DLE9BQU8sQ0FBQ2dFLEtBQVIsRUFBTjtBQUVDLEdBbklMOztBQXNJQWpFLEtBQUcsQ0FBQ2tFLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxRQUFJLEVBQUUsYUFBUjtBQUF1QnRELFFBQUksRUFBRWYsR0FBRyxDQUFDUyxJQUFKLENBQVNNO0FBQXRDLEdBQXJCO0FBQ0QsQ0F6SUgiLCJmaWxlIjoiLi9wYWdlcy9hcGkvc2NyYXBlUGFnZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCBpZyA9IHJlcXVpcmUoJ2luc3RhZ3JhbS1zY3JhcGluZycpO1xuXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMpID0+IHtcblxuICAgIChhc3luYyAoKSA9PiB7IFxuICAgICAgICBsZXQgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goe2hlYWRsZXNzOiB0cnVlfSk7IC8vdHVybiB0byBGQUxTRSB0byBkZWJ1Z1xuICAgICAgICBjb25zb2xlLmxvZygnU0NSQVBJTkcuLi4nKVxuICAgICAgICBsZXQgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpOyBcblxuICAgICAgICBpZihyZXEuYm9keS55b3V0dWJlbGluayAhPSBcIlwiKVxuICAgICAgICB7XG4gICAgICAgIGF3YWl0IHBhZ2UuZ290byhyZXEuYm9keS55b3V0dWJlbGluayArICcvYWJvdXQnLCB7d2FpdFVudGlsOiAnbmV0d29ya2lkbGUyJ30pO1xuICAgICAgICBcbiAgICAgICAgbGV0IHlvdXR1YmVTdGF0cyA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFubmVsLW5hbWUgPiBkaXYgPiBkaXYnKS5pbm5lclRleHQ7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS5pbm5lclRleHQ7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlclN0cmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJzY3JpYmVyLWNvdW50JykuaW5uZXJUZXh0O1xuICAgICAgICAgICAgc3Vic2NyaWJlclN0cmluZyA9IHN1YnNjcmliZXJTdHJpbmcuc2xpY2UoMCwgc3Vic2NyaWJlclN0cmluZy5sZW5ndGgtMTIpO1xuXG4gICAgICAgICAgICB2YXIgZW5kTGV0dGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1YnNjcmliZXItY291bnQnKS5pbm5lclRleHQuc2xpY2UoMCxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3Vic2NyaWJlci1jb3VudCcpLmlubmVyVGV4dC5sZW5ndGgtMTIpO1xuICAgICAgICAgICAgZW5kTGV0dGVyID0gZW5kTGV0dGVyLnNsaWNlKGVuZExldHRlci5sZW5ndGgtMSk7XG5cbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyUHJlZml4ID0gc3Vic2NyaWJlclN0cmluZy5zbGljZSgwLHN1YnNjcmliZXJTdHJpbmcubGVuZ3RoLTEpO1xuXG4gICAgICAgICAgICBpZiAoZW5kTGV0dGVyID09IFwiS1wiKVxuICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyTnVtID0gcGFyc2VJbnQocGFyc2VGbG9hdChzdWJzY3JpYmVyUHJlZml4KSoxMDAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGVuZExldHRlciA9PSBcIk1cIilcbiAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaWJlck51bSA9IHBhcnNlSW50KHBhcnNlRmxvYXQoc3Vic2NyaWJlclByZWZpeCkqMTAwMDAwMCk7XG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyTnVtID0gcGFyc2VJbnQoc3Vic2NyaWJlclN0cmluZyk7XG5cblxuICAgICAgICAgICAgdmFyIHZpZXdzU3RyaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3JpZ2h0LWNvbHVtbiA+IHl0LWZvcm1hdHRlZC1zdHJpbmcnKVsyXS5pbm5lclRleHQ7XG4gICAgICAgICAgICB2aWV3c1N0cmluZyA9IHZpZXdzU3RyaW5nLnNsaWNlKDAsdmlld3NTdHJpbmcubGVuZ3RoLTYpO1xuICAgICAgICAgICAgdmlld3NTdHJpbmcgPSB2aWV3c1N0cmluZy5yZXBsYWNlKCcsJywgJycpO1xuICAgICAgICAgICAgdmlld3NTdHJpbmcgPSB2aWV3c1N0cmluZy5yZXBsYWNlKCcsJywgJycpO1xuICAgICAgICAgICAgdmlld3NTdHJpbmcgPSB2aWV3c1N0cmluZy5yZXBsYWNlKCcsJywgJycpO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSAneW91dHViZSc7XG5cbiAgICAgICAgICAgIHZhciB2aWV3c051bSA9IHBhcnNlSW50KHZpZXdzU3RyaW5nKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgLy92aWV3c1N0cmluZyxcbiAgICAgICAgICAgICAgICB2aWV3c051bSxcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyU3RyaW5nLFxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJOdW0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgYXdhaXQgcGFnZS5nb3RvKHJlcS5ib2R5LnlvdXR1YmVsaW5rICsgXCIvZmVhdHVyZWRcIiwge3dhaXRVbnRpbDogJ25ldHdvcmtpZGxlMid9KTtcblxuICAgICAgICBsZXQgdmlkZW9TdGF0cyA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHZpZGVvcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgMTA7IGkrKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlkZW9zW2ldID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2l0ZW1zID4geXRkLWdyaWQtdmlkZW8tcmVuZGVyZXInKVtpXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHR5cGUgPSAneW91dHViZS12aWRlb3MnO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHZpZGVvcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zb2xlLmxvZyh5b3V0dWJlU3RhdHMpO1xuICAgICAgICBjb25zb2xlLmxvZyh2aWRlb1N0YXRzKTtcbiAgICAgICAgfVxuXG4gICAgaWYocmVxLmJvZHkuaW5zdGFncmFtbGluayAhPSBcIlwiKVxuICAgIHsgICAgXG4gICAgICAgIFxuICAgICAgICAvLyB1c2luZyB1c2VybmFtZSBmb3Igc2NyYXBpbmdcbiAgICAgICAgY29uc3QgcG9zaXRpb25PZlVzZXIgPSByZXEuYm9keS5pbnN0YWdyYW1saW5rLnNlYXJjaCgnLmNvbS8nKTtcbiAgICAgICAgbGV0IGluc3RhVXNlciA9IHJlcS5ib2R5Lmluc3RhZ3JhbWxpbmsuc2xpY2UocG9zaXRpb25PZlVzZXIrNSk7IC8vMjZcbiAgICAgICAgY29uc3QgcG9zaXRpb25PZlNsYXNoID0gaW5zdGFVc2VyLnNlYXJjaCgnLycpO1xuICAgICAgICBpbnN0YVVzZXIgPSBpbnN0YVVzZXIuc2xpY2UoMCxwb3NpdGlvbk9mU2xhc2gpO1xuXG4gICAgICAgIHZhciB1c2VybmFtZSwgbnVtRm9sbG93ZXJzLCBudW1Gb2xsb3dpbmcsIGJpbywgd2Vic2l0ZSwgbnVtUG9zdHMsIHBvc3RzLCBmdWxsTmFtZTsgXG5cbiAgICAgICAgbGV0IGluc3RhZ3JhbVN0YXRzID0gaWcuc2NyYXBlVXNlclBhZ2UoaW5zdGFVc2VyKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB1c2VybmFtZSA9IGluc3RhVXNlcjtcbiAgICAgICAgICAgIG51bUZvbGxvd2VycyA9IHJlc3VsdC51c2VyLmVkZ2VfZm9sbG93ZWRfYnkuY291bnQ7XG4gICAgICAgICAgICBudW1Gb2xsb3dpbmcgPSAgcmVzdWx0LnVzZXIuZWRnZV9mb2xsb3cuY291bnQ7XG4gICAgICAgICAgICBiaW8gPSByZXN1bHQudXNlci5iaW9ncmFwaHk7XG4gICAgICAgICAgICB3ZWJzaXRlID0gcmVzdWx0LnVzZXIuZXh0ZXJuYWxfdXJsO1xuICAgICAgICAgICAgcG9zdHMgPSBbXTtcbiAgICAgICAgICAgIG51bVBvc3RzID0gcmVzdWx0LnRvdGFsOyBcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VybmFtZTogJ1wiICsgdXNlcm5hbWUgKyBcIicsXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJudW1Gb2xsb3dlcnM6ICdcIiArIG51bUZvbGxvd2VycysgXCInLFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibnVtRm9sbG93aW5nOiAnXCIgKyBudW1Gb2xsb3dpbmcrIFwiJyxcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJpbzogJ1wiICsgYmlvICsgXCInLFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2Vic2l0ZTogJ1wiICsgd2Vic2l0ZSArIFwiJyxcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvc3RzOiBcIiArIHBvc3RzICsgXCIsXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJudW1Qb3N0czogXCIgKyBudW1Qb3N0cyArIFwiLFwiKTtcblxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHJlc3VsdC50b3RhbDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBudW1MaWtlcyA9IHJlc3VsdC5tZWRpYXNbaV0ubGlrZV9jb3VudDtcbiAgICAgICAgICAgICAgICB2YXIgbnVtQ29tbWVudHMgPSByZXN1bHQubWVkaWFzW2ldLmNvbW1lbnRfY291bnQ7XG4gICAgICAgICAgICAgICAgcG9zdHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG51bUxpa2VzLFxuICAgICAgICAgICAgICAgICAgICBudW1Db21tZW50cyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdWxsTmFtZSA9IHVzZXIuZnVsbF9uYW1lO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZ1bGxOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lLCBcbiAgICAgICAgICAgICAgICBudW1Qb3N0cyxcbiAgICAgICAgICAgICAgICBudW1Gb2xsb3dlcnMsXG4gICAgICAgICAgICAgICAgbnVtRm9sbG93aW5nLFxuICAgICAgICAgICAgICAgIGJpbyxcbiAgICAgICAgICAgICAgICB3ZWJzaXRlLFxuICAgICAgICAgICAgICAgIHBvc3RzLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGluc3RhZ3JhbVN0YXRzKTtcblxuXG5cblxuICAgICAgICBcblxuICAgICAgICBcbiAgICB9XG4gXG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcblxuICAgICAgICB9KSgpO1xuXG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGluZm86ICdzY3JhcGUgcGFnZScsIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfSlcbiAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/scrapePage.js\n");

/***/ }),

/***/ "instagram-scraping":
/*!*************************************!*\
  !*** external "instagram-scraping" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"instagram-scraping\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbnN0YWdyYW0tc2NyYXBpbmdcIj83YTJlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Imluc3RhZ3JhbS1zY3JhcGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImluc3RhZ3JhbS1zY3JhcGluZ1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///instagram-scraping\n");

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