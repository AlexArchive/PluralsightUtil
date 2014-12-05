// ==UserScript==
// @name         PluralsightUtil
// @namespace    https://github.com/ByteBlast/
// @version      0.1
// @author       ByteB
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      *pluralsight.com/profile*
// ==/UserScript==

(function () {
  'use strict';
  
  function tallyHoursWatched(callback) {
      var durationWatched = moment.duration(0);
      $.get("http://www.pluralsight.com/data" + window.location.pathname, function(profile) {
          var courses = profile.usageInfo.completedCourses;
          
          if (courses.length === 0) {
              callback(0);
          } else {
              $.each(courses, function(index, course) {
                  $.get("http://www.pluralsight.com/data/course/" + course.courseName, function(course) {
                      durationWatched.add(course.duration);
                      if (index === courses.length - 1) {
                          callback(durationWatched.asHours().toFixed(2));
                      }
                  });
              });
          }
      });
  }

  function onCalculateLinkClicked() {
      $(".hours-watched .calculate-link").text("calculating..");
      tallyHoursWatched(function(hoursWatched) {
          $(".hours-watched span").text(hoursWatched);
          $(".hours-watched .calculate-link").remove();
      });
  }

  function onHeaderRendered(element) {
      element
          .next("ul")
          .append("<li class=\"hours-watched\">Hours watched: <span></span><a class=\"calculate-link\">calculate</a></li>");

      $(".calculate-link").click(onCalculateLinkClicked);
  }

  waitForKeyElements("h6:contains(\"More info\")", onHeaderRendered);
})();