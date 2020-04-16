// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterLib/tile/nls/RasterWorker_sl",{"dojo/cldr/nls/number":{scientificFormat:"#E0","currencySpacing-afterCurrency-currencyMatch":"[:^S:]",infinity:"\u221e",superscriptingExponent:"\u00d7",list:";",percentSign:"%",minusSign:"-","currencySpacing-beforeCurrency-surroundingMatch":"[:digit:]","decimalFormat-short":"000\u00a0bil'.'","currencySpacing-afterCurrency-insertBetween":"\u00a0",nan:"NaN",plusSign:"+","currencySpacing-afterCurrency-surroundingMatch":"[:digit:]","currencySpacing-beforeCurrency-currencyMatch":"[:^S:]",
currencyFormat:"#,##0.00\u00a0\u00a4;(#,##0.00\u00a0\u00a4)",perMille:"\u2030",group:".",percentFormat:"#,##0%","decimalFormat-long":"000 bilijonov",decimalFormat:"#,##0.###",decimal:",","currencySpacing-beforeCurrency-insertBetween":"\u00a0",exponential:"e",_localized:{}},"dojo/cldr/nls/gregorian":{"dateFormatItem-Ehm":"E h:mm a","days-standAlone-short":"ned. pon. tor. sre. \u010det. pet. sob.".split(" "),"months-format-narrow":"jfmamjjasond".split(""),"field-second-relative+0":"zdaj","quarters-standAlone-narrow":["1",
"2","3","4"],"field-weekday":"Dan v tednu","dateFormatItem-yQQQ":"QQQ y","dateFormatItem-yMEd":"E, d. M. y","field-wed-relative+0":"To sredo","field-wed-relative+1":"Naslednjo sredo","dateFormatItem-GyMMMEd":"E, d. MMM y G","dateFormatItem-MMMEd":"E, d. MMM",eraNarrow:["pr. n. \u0161t.","po Kr.","po n. \u0161t."],"field-tue-relative+-1":"Prej\u0161nji torek","days-format-short":"ned. pon. tor. sre. \u010det. pet. sob.".split(" "),"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"dd. MMMM y",
"field-fri-relative+-1":"Prej\u0161nji petek","field-wed-relative+-1":"Prej\u0161njo sredo","months-format-wide":"januar februar marec april maj junij julij avgust september oktober november december".split(" "),"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"pop.","dateFormat-full":"EEEE, dd. MMMM y","field-thu-relative+-1":"Prej\u0161nji \u010detrtek","dateFormatItem-Md":"d. M.","dayPeriods-format-abbr-am":"AM","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dayPeriods-format-wide-noon":"noon",
"dateFormatItem-yMd":"d. M. y","field-era":"Doba","dateFormatItem-yM":"M/y","months-standAlone-wide":"januar februar marec april maj junij julij avgust september oktober november december".split(" "),"timeFormat-short":"HH:mm","quarters-format-wide":["1. \u010detrtletje","2. \u010detrtletje","3. \u010detrtletje","4. \u010detrtletje"],"dateFormatItem-yQQQQ":"QQQQ y","timeFormat-long":"HH:mm:ss z","field-year":"Leto","dateFormatItem-yMMM":"MMM y","dateTimeFormats-appendItem-Era":"{1} {0}","field-hour":"Ura",
"months-format-abbr":"jan. feb. mar. apr. maj jun. jul. avg. sep. okt. nov. dec.".split(" "),"field-sat-relative+0":"To soboto","field-sat-relative+1":"Naslednjo soboto","timeFormat-full":"HH:mm:ss zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"danes","field-thu-relative+0":"Ta \u010detrtek","field-day-relative+1":"jutri","field-thu-relative+1":"Naslednji \u010detrtek","dateFormatItem-GyMMMd":"d. MMM y G","dateFormatItem-H":"HH","months-standAlone-abbr":"jan feb mar apr maj jun jul avg sep okt nov dec".split(" "),
"quarters-format-abbr":["Q1","Q2","Q3","Q4"],"quarters-standAlone-wide":["1. \u010detrtletje","2. \u010detrtletje","3. \u010detrtletje","4. \u010detrtletje"],"dateFormatItem-Gy":"y G","dateFormatItem-M":"L","days-standAlone-wide":"nedelja ponedeljek torek sreda \u010detrtek petek sobota".split(" "),"dayPeriods-format-abbr-noon":"noon","timeFormat-medium":"HH:mm:ss","field-sun-relative+0":"to nedeljo","dateFormatItem-Hm":"HH:mm","field-sun-relative+1":"naslednjo nedeljo","quarters-standAlone-abbr":["Q1",
"Q2","Q3","Q4"],eraAbbr:["pr. n. \u0161t.","po Kr.","po n. \u0161t."],"field-minute":"Minuta","field-dayperiod":"\u010cas dneva","days-standAlone-abbr":"ned pon tor sre \u010det pet sob".split(" "),"dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"v\u010deraj","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","dateFormatItem-h":"h a","dateFormatItem-MMMd":"d. MMM","dateFormatItem-MEd":"E, d. MM.","dateTimeFormat-full":"{1} {0}",
"field-fri-relative+0":"Ta petek","field-fri-relative+1":"Naslednji petek","field-day":"Dan","days-format-wide":"nedelja ponedeljek torek sreda \u010detrtek petek sobota".split(" "),"field-zone":"\u010casovni pas","months-standAlone-narrow":"jfmamjjasond".split(""),"dateFormatItem-y":"y","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","field-year-relative+-1":"lani","field-month-relative+-1":"prej\u0161nji mesec","dateTimeFormats-appendItem-Year":"{1} {0}","dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})",
"dayPeriods-format-abbr-pm":"PM","days-format-abbr":"ned. pon. tor. sre. \u010det. pet. sob.".split(" "),eraNames:["pred na\u0161im \u0161tetjem","na\u0161e \u0161tetje","po n. \u0161t."],"dateFormatItem-yMMMd":"d. MMM y","days-format-narrow":"npts\u010dps".split(""),"field-month":"Mesec","days-standAlone-narrow":"npts\u010dps".split(""),"dateFormatItem-MMM":"LLL","field-tue-relative+0":"Ta torek","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","field-tue-relative+1":"Naslednji torek","dayPeriods-format-wide-am":"dop.",
"dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormatItem-EHm":"E HH:mm","field-mon-relative+0":"ta ponedeljek","field-mon-relative+1":"naslednji ponedeljek","dateFormat-short":"d. MM. yy","dateFormatItem-EHms":"E HH:mm:ss","dateFormatItem-Ehms":"E h:mm:ss a","dayPeriods-format-narrow-noon":"n","field-second":"Sekunda","field-sat-relative+-1":"Prej\u0161njo soboto","dateFormatItem-yMMMEd":"E, d. MMM y","field-sun-relative+-1":"prej\u0161njo nedeljo",
"field-month-relative+0":"ta mesec","field-month-relative+1":"naslednji mesec","dateTimeFormats-appendItem-Timezone":"{0} {1}","dateFormatItem-Ed":"E, d.","field-week":"Teden","dateFormat-medium":"d. MMM y","field-week-relative+-1":"prej\u0161nji teden","field-year-relative+0":"letos","field-year-relative+1":"naslednje leto","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM y G","field-mon-relative+-1":"prej\u0161nji ponedeljek",
"field-week-relative+0":"ta teden","field-week-relative+1":"naslednji teden","field-day-relative+2":"pojutri\u0161njem","field-day-relative+-2":"predv\u010deraj\u0161njim","dateFormatItem-yMMMM":"MMMM y","dateFormatItem-GyM":"M/y G",_localized:{}}});