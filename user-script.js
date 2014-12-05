// ==UserScript==
// @name         PluralsightUtil
// @namespace    PluralsightUtil
// @version      0.1
// @author       ByteB
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      *pluralsight.com/profile*
// ==/UserScript==

function tallyHoursWatched(callback) {
    var durationWatched = moment.duration(0);
    $.get("http://www.pluralsight.com/data" + window.location.pathname, function(profile) {
        var courses = profile.usageInfo.completedCourses;
        $.each(courses, function(index, course) {
            $.get("http://www.pluralsight.com/data/course/" + course.courseName, function(course) {
                durationWatched.add(course.duration);
                if (index === courses.length - 1) {
                    callback(durationWatched.asHours());
                }
            });
        });
    });
}

function onCalculateLinkClicked() {
    $(".calculate-link").text("Calculating..");
    tallyHoursWatched(function(hoursWatched) {
        alert("You have watched " + hoursWatched + " hours of Pluralsight videos");
        $(".calculate-link").text("Calculate hours-watched");
    });
}

function onHeaderRendered(element) {
    element
        .next("ul")
        .append("<li><a class=\"calculate-link\">Calculate hours-watched</a></li>");

    $(".calculate-link").click(onCalculateLinkClicked);
}

waitForKeyElements("h6:contains(\"More info\")", onHeaderRendered);