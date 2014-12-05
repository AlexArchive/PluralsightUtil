// ==UserScript==
// @name         PluralsightUtil
// @namespace    PluralsightUtil
// @version      0.1
// @author       ByteB
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js
// @include      *pluralsight.com/profile*
// ==/UserScript==

var totalDuration = moment.duration(0); 
var profilePath = "http://www.pluralsight.com/data" + window.location.pathname;

$.get(profilePath, function (profile) {
    var courses = profile.usageInfo.completedCourses;
    $.each(courses, function(index, course) {
        var coursePath = "http://www.pluralsight.com/data/course/" + course.courseName;
        $.get(coursePath, function (course) {
			var courseDuration = course.duration;
        	totalDuration.add(courseDuration); 
      		if (index === courses.length - 1) {
                console.log("Hours of Pluralsight content watched: " + totalDuration.asHours());
            }
    	});
	});
});