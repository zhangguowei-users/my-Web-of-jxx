//>>built
(function(b,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/eo",["../moment"],a):a(b.moment)})(this,function(b){return b.defineLocale("eo",{months:"januaro februaro marto aprilo majo junio julio a\u016dgusto septembro oktobro novembro decembro".split(" "),monthsShort:"jan feb mar apr maj jun jul a\u016dg sep okt nov dec".split(" "),weekdays:"diman\u0109o lundo mardo merkredo \u0135a\u016ddo vendredo sabato".split(" "),
weekdaysShort:"dim lun mard merk \u0135a\u016d ven sab".split(" "),weekdaysMin:"di lu ma me \u0135a ve sa".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-a de] MMMM, YYYY",LLL:"D[-a de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-a de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(a){return"p"===a.charAt(0).toLowerCase()},meridiem:function(a,b,c){return 11<a?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodia\u016d je] LT",nextDay:"[Morga\u016d je] LT",
nextWeek:"dddd [je] LT",lastDay:"[Hiera\u016d je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"post %s",past:"anta\u016d %s",s:"sekundoj",ss:"%d sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},dayOfMonthOrdinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}})});