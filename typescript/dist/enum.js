"use strict";
var day;
(function (day) {
    day[day["monday"] = 0] = "monday";
    day[day["tuesday"] = 1] = "tuesday";
    day[day["wednesday"] = 2] = "wednesday";
    day[day["thursday"] = 3] = "thursday";
    day[day["friday"] = 4] = "friday";
    day[day["saturday"] = 5] = "saturday";
})(day || (day = {}));
console.log(day.monday); // 0
